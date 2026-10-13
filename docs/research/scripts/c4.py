import itertools, random, sys
N=4
# peers: 3 lines + 3 in-slice 2x2 boxes
cells=[(x,y,z) for x in range(4) for y in range(4) for z in range(4)]
def units():
    U=[]
    for a in range(4):
        for b in range(4):
            U.append([(i,a,b) for i in range(4)])
            U.append([(a,i,b) for i in range(4)])
            U.append([(a,b,i) for i in range(4)])
    for s in range(4):
        for bx in (0,2):
            for by in (0,2):
                U.append([(bx+i,by+j,s) for i in range(2) for j in range(2)])
                U.append([(bx+i,s,by+j) for i in range(2) for j in range(2)])
                U.append([(s,bx+i,by+j) for i in range(2) for j in range(2)])
    return U
U=units()
peers={c:set() for c in cells}
for u in U:
    for c in u:
        peers[c]|=set(u)-{c}
print("units",len(U),"peers per cell",len(peers[(0,0,0)]))
# constructed solution over GF(2)^2
def val(x,y,z):
    x1,x0=x>>1,x&1; y1,y0=y>>1,y&1; z1,z0=z>>1,z&1
    # A e0=(1,0), A e1=(0,1); B e0=(0,1), B e1=(1,0); C e0=(1,1), C e1=(1,0)
    a=(x0, x1); b=(y1, y0); c=(z0^z1, z0)
    v=(a[0]^b[0]^c[0], a[1]^b[1]^c[1])
    return v[0]*2+v[1]
sol={c:val(*c) for c in cells}
ok=all(len({sol[c] for c in u})==4 for u in U)
print("construction valid:",ok)
# solver counting solutions up to limit
def count(grid,limit=2):
    cand={}
    for c in cells:
        if grid.get(c) is None:
            cand[c]={0,1,2,3}-{grid[p] for p in peers[c] if grid.get(p) is not None}
    cnt=0
    def rec(g,cand):
        nonlocal cnt
        if cnt>=limit: return
        if not cand:
            cnt+=1; return
        c=min(cand,key=lambda k:len(cand[k]))
        if not cand[c]: return
        for v in list(cand[c]):
            g2=dict(g); g2[c]=v
            c2={k:(s-{v} if k in peers[c] else s) for k,s in cand.items() if k!=c}
            if any(len(s)==0 for s in c2.values()): continue
            rec(g2,c2)
            if cnt>=limit: return
    rec(dict(grid),cand)
    return cnt
print("total solutions (cap 5000):",count({},5000))
# random full solution then dig to minimal unique puzzle
def randsol():
    g={}
    res=None
    def rec(g):
        nonlocal res
        if res: return
        empt=[c for c in cells if c not in g]
        if not empt: res=dict(g); return
        c=min(empt,key=lambda k:len({0,1,2,3}-{g[p] for p in peers[k] if p in g}))
        vs=list({0,1,2,3}-{g[p] for p in peers[c] if p in g}); random.shuffle(vs)
        for v in vs:
            g[c]=v; rec(g)
            if res: return
            del g[c]
    rec(g); return res
# singles-only solvability and givens
def singles_only(grid):
    g=dict(grid); steps=0
    while len(g)<64:
        prog=False
        for c in cells:
            if c in g: continue
            cand={0,1,2,3}-{g[p] for p in peers[c] if p in g}
            if len(cand)==1:
                g[c]=cand.pop(); prog=True
        if not prog:
            # hidden singles
            for u in U:
                for v in range(4):
                    pos=[c for c in u if c not in g and v not in {g[p] for p in peers[c] if p in g}]
                    if any(g.get(c)==v for c in u): continue
                    if len(pos)==1: g[pos[0]]=v; prog=True
        if not prog: return False
    return True
random.seed(7)
res=[]
for t in range(12):
    s=randsol(); g=dict(s); order=cells[:]; random.shuffle(order)
    for c in order:
        v=g.pop(c)
        if count(g,2)!=1: g[c]=v
    res.append((len(g),singles_only(g)))
print("minimal givens, singles-solvable:",res)
