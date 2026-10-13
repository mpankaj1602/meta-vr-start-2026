import random, time, sys
sys.setrecursionlimit(10000)
def build(N, boxes):
    # boxes: dict orientation-> (h,w) or None ; orientation 'xy','xz','yz'
    cells=[(x,y,z) for x in range(N) for y in range(N) for z in range(N)]
    U=[]
    for a in range(N):
        for b in range(N):
            U.append([(i,a,b) for i in range(N)]); U.append([(a,i,b) for i in range(N)]); U.append([(a,b,i) for i in range(N)])
    for o,hw in boxes.items():
        if not hw: continue
        h,w=hw
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
def search(N,cells,peers,limit,tmax,rand=True):
    full=(1<<N)-1
    cand={c:full for c in cells}
    cnt=0; t0=time.time(); timed=[False]
    def rec(cand,left):
        nonlocal cnt
        if time.time()-t0>tmax: timed[0]=True; return
        if not left: cnt+=1; return
        c=min(left,key=lambda k:bin(cand[k]).count('1'))
        m=cand[c]
        vs=[v for v in range(N) if m>>v&1]
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
                if cnt>=limit or timed[0]: return
    rec(cand,frozenset(cells))
    return cnt,timed[0]
random.seed(3)
# 4x4x4 variants: count
for name,bx in [("4 latin only",{}),("4 boxes xy only",{'xy':(2,2)}),("4 boxes xy+xz",{'xy':(2,2),'xz':(2,2)}),("4 all three",{'xy':(2,2),'xz':(2,2),'yz':(2,2)})]:
    cells,U,peers=build(4,bx)
    print(name, search(4,cells,peers,200000,25,rand=False))
# 6x6x6 existence, all box-shape combos
for sxy in [(2,3),(3,2)]:
  for sxz in [(2,3),(3,2)]:
    for syz in [(2,3),(3,2)]:
        cells,U,peers=build(6,{'xy':sxy,'xz':sxz,'yz':syz})
        best=(0,True)
        t=time.time()
        for attempt in range(6):
            r=search(6,cells,peers,1,4)
            if r[0]: best=r;break
        print("6x6x6",sxy,sxz,syz,"found" if best[0] else "none found in time",round(time.time()-t,1))
