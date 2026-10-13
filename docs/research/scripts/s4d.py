import itertools, sys, time, random
sys.setrecursionlimit(10000)
N=4; M=2; D=4
cells=list(itertools.product(range(N),repeat=D))
idx={c:i for i,c in enumerate(cells)}
def units(box_pairs):
    U=[]
    for a in range(D):                                   # lines along axis a
        for rest in itertools.product(range(N),repeat=D-1):
            u=[]
            for v in range(N):
                c=list(rest); c.insert(a,v); u.append(idx[tuple(c)])
            U.append(u)
    for (a,b) in box_pairs:                              # 2x2 boxes in every a-b slice
        others=[k for k in range(D) if k not in (a,b)]
        for fixed in itertools.product(range(N),repeat=D-2):
            for ba in range(M):
                for bb in range(M):
                    u=[]
                    for da in range(M):
                        for db in range(M):
                            c=[0]*D
                            for k,val in zip(others,fixed): c[k]=val
                            c[a]=ba*M+da; c[b]=bb*M+db
                            u.append(idx[tuple(c)])
                    U.append(u)
    return U
def build(box_pairs):
    U=units(box_pairs)
    peers=[set() for _ in cells]
    for u in U:
        for i in u:
            peers[i].update(u)
    for i in range(len(cells)): peers[i].discard(i)
    return U,[tuple(p) for p in peers]
FULL=(1<<N)-1
def count(peers,given,limit,deadline=None):
    cand=[FULL]*len(cells)
    def assign(cand,i,v):
        stack=[(i,v)]
        while stack:
            i,v=stack.pop()
            bit=1<<v
            if not cand[i]&bit: return False
            cand[i]=bit
            for p in peers[i]:
                if cand[p]&bit:
                    if cand[p]==bit: return False
                    cand[p]&=~bit
                    if cand[p]==0: return False
                    if cand[p]&(cand[p]-1)==0:
                        stack.append((p,cand[p].bit_length()-1))
        return True
    for i,v in given.items():
        if not assign(cand,i,v): return 0,None
    res=[0]; first=[None]
    def rec(cand):
        if deadline and time.time()>deadline: raise TimeoutError
        best=-1;bc=9
        for i,c in enumerate(cand):
            n=bin(c).count('1')
            if n>1 and n<bc: bc=n;best=i
        if best<0:
            res[0]+=1
            if first[0] is None: first[0]=[c.bit_length()-1 for c in cand]
            return res[0]>=limit
        c=cand[best]
        for v in range(N):
            if c>>v&1:
                c2=cand[:]
                if assign(c2,best,v):
                    if rec(c2): return True
        return False
    try: rec(cand)
    except TimeoutError: return ('>=%d (timed out)'%res[0]),first[0]
    return res[0],first[0]
pairs_all=[(a,b) for a in range(D) for b in range(a+1,D)]
pairs_space=[(1,2),(1,3),(2,3)]          # axis 0 = time
t=time.time()
U,P=build(pairs_all)
n,sol=count(P,{},10**7,time.time()+120)
print("A) 4x4x4x4, lines on all 4 axes + boxes in ALL six slice directions: solutions =",n,"| units",len(U),"| %.1fs"%(time.time()-t))
t=time.time()
U2,P2=build(pairs_space)
n2,sol2=count(P2,{},2*10**6,time.time()+150)
print("B) 4 frames of a 4x4x4 cube, every frame a valid 3D sudoku + no cell repeats over time (no boxes in time slices): solutions =",n2,"| %.1fs"%(time.time()-t))
import pickle; pickle.dump((sol,sol2),open('sols.pkl','wb'))
