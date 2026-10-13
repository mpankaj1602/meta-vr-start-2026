import itertools, time, random, sys
exec(open('s4d.py').read().split("pairs_all=")[0])   # reuse definitions
space=[(1,2),(1,3),(2,3)]; timep=[(0,1),(0,2),(0,3)]
for k in (1,2,3):
    for extra in itertools.combinations(timep,k):
        U,P=build(space+list(extra))
        n,_=count(P,{},10**6,time.time()+60)
        print("spatial boxes + boxes in time-slices",extra,"-> solutions",n)
# which box-family subsets of size 5 and 4 (any) work
for k in (5,4):
    res={}
    allp=[(a,b) for a in range(4) for b in range(a+1,4)]
    for sub in itertools.combinations(allp,k):
        U,P=build(list(sub)); n,_=count(P,{},10**6,time.time()+30); res[sub]=n
    print("box families of size",k,":",sorted(set(res.values())), "| nonzero cases:",sum(1 for v in res.values() if v))
# variant B puzzles: givens needed and singles-only solvability
U,P=build(space)
random.seed(7)
def random_solution():
    # randomised search
    order=list(range(256)); 
    given={}
    for _ in range(40):
        i=random.randrange(256); v=random.randrange(4)
        g=dict(given); g[i]=v
        n,_=count(P,g,1,time.time()+5)
        if n: given=g
    n,sol=count(P,given,1,time.time()+20)
    return sol
def singles_solve(given):
    cand=[15]*256
    for i,v in given.items(): cand[i]=1<<v
    changed=True
    while changed:
        changed=False
        for i in range(256):
            if cand[i]&(cand[i]-1)==0:
                for p in P[i]:
                    if cand[p]&cand[i] and cand[p]!=cand[i]:
                        cand[p]&=~cand[i]; changed=True
        for u in U:                          # hidden singles
            for v in range(4):
                where=[i for i in u if cand[i]>>v&1]
                if len(where)==1 and cand[where[0]]!=1<<v:
                    cand[where[0]]=1<<v; changed=True
    return all(c&(c-1)==0 and c for c in cand)
stats=[]
for s in range(6):
    sol=random_solution()
    given={i:sol[i] for i in range(256)}
    order=list(range(256)); random.shuffle(order)
    for i in order:
        g=dict(given); del g[i]
        n,_=count(P,g,2,time.time()+10)
        if n==1: given=g
    stats.append((len(given),singles_solve(given)))
print("variant B puzzles (256 cells): givens after greedy removal, singles-only solvable?",stats)
