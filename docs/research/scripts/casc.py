import random, time, sys
sys.setrecursionlimit(20000)
def build(N, boxes):
    cells=[(x,y,z) for x in range(N) for y in range(N) for z in range(N)]
    U=[]
    for a in range(N):
        for b in range(N):
            U.append([(i,a,b) for i in range(N)]); U.append([(a,i,b) for i in range(N)]); U.append([(a,b,i) for i in range(N)])
    for o,(h,w) in boxes.items():
        for s in range(N):
            for bi in range(0,N,h):
                for bj in range(0,N,w):
                    blk=[(bi+i,bj+j) for i in range(h) for j in range(w)]
                    if o=='xy': U.append([(i,j,s) for i,j in blk])
                    if o=='xz': U.append([(i,s,j) for i,j in blk])
                    if o=='yz': U.append([(s,i,j) for i,j in blk])
    peers={c:set() for c in cells}
    for u in U:
        for c in u: peers[c]|=set(u)-{c}
    return cells,U,peers
def solve(N,cells,peers,given,limit,rand=False,tmax=20):
    full=(1<<N)-1; cand={c:full for c in cells}
    for c,v in given.items():
        cand[c]=1<<v
    for c,v in given.items():
        for p in peers[c]:
            if p not in given:
                cand[p]&=~(1<<v)
                if cand[p]==0: return 0,None
    cnt=0; first=[None]; t0=time.time()
    def rec(cand,left):
        nonlocal cnt
        if time.time()-t0>tmax: cnt=-1; return
        if not left:
            cnt+=1
            if first[0] is None: first[0]={c:cand[c].bit_length()-1 for c in cand}
            return
        c=min(left,key=lambda k:bin(cand[k]).count('1'))
        vs=[v for v in range(N) if cand[c]>>v&1]
        if rand: random.shuffle(vs)
        for v in vs:
            bit=1<<v; c2=dict(cand); c2[c]=bit; ok=True
            for p in peers[c]:
                if p in left and p!=c:
                    nm=c2[p]&~bit
                    if nm==0: ok=False;break
                    c2[p]=nm
            if ok:
                rec(c2,left-{c})
                if cnt>=limit or cnt<0: return
    rec(cand,frozenset(c for c in cells if c not in given))
    return cnt,first[0]
def dig(N,cells,peers,sol,target):
    g=dict(sol); order=cells[:]; random.shuffle(order)
    for c in order:
        if len(g)<=target: break
        v=g.pop(c)
        n,_=solve(N,cells,peers,g,2,tmax=5)
        if n!=1: g[c]=v
    return g
def play(N,cells,U,peers,given,sol,auto):
    g=dict(given); placed=0; autos=0; hidden_needed=0; stuck=False
    def cands(c): return set(range(N))-{g[p] for p in peers[c] if p in g}
    while len(g)<len(cells):
        # cascade
        prog=True
        while prog and auto:
            prog=False
            for u in U:
                e=[c for c in u if c not in g]
                if len(e)==1:
                    g[e[0]]=sol[e[0]]; autos+=1; prog=True
        if len(g)==len(cells): break
        naked=[c for c in cells if c not in g and len(cands(c))==1]
        if naked:
            c=random.choice(naked); g[c]=sol[c]; placed+=1; continue
        hid=[]
        for u in U:
            for v in range(N):
                if any(g.get(c)==v for c in u): continue
                pos=[c for c in u if c not in g and v in cands(c)]
                if len(pos)==1: hid.append(pos[0])
        if hid:
            c=random.choice(hid); g[c]=sol[c]; placed+=1; hidden_needed+=1; continue
        stuck=True; break
    return placed,autos,hidden_needed,stuck
random.seed(11)
for N,boxes,targets,reps in [(4,{'xy':(2,2),'xz':(2,2),'yz':(2,2)},[0,8,12],8),(6,{'xy':(2,3),'xz':(2,3),'yz':(2,3)},[40,70,110],2)]:
    cells,U,peers=build(N,boxes)
    for tg in targets:
        rows=[]
        for r in range(reps):
            n,sol=solve(N,cells,peers,{},1,rand=True)
            g=dig(N,cells,peers,sol,tg)
            a=play(N,cells,U,peers,g,sol,True); b=play(N,cells,U,peers,g,sol,False)
            rows.append((len(g),a[0],a[1],a[2],a[3],b[0],b[3]))
        print(N,"target givens",tg,"-> (givens, placed_with_cascade, autofilled, hidden_steps, stuck, placed_no_cascade, stuck):",rows,flush=True)
