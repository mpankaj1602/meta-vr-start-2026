# verify the linear construction of a full 9x9x9x9 four-dimensional sudoku (all lines, 3x3 boxes in all six slice directions)
import itertools
Ms=[((0,1),(1,0)),((1,0),(0,1)),((1,1),(0,1)),((1,1),(0,2))]   # rows of 2x2 matrices over Z3; second columns (1,0),(0,1),(1,1),(1,2)
def val(c):
    u=v=0
    for (x,Mx) in zip(c,Ms):
        a,b=divmod(x,3)
        u+=Mx[0][0]*a+Mx[0][1]*b; v+=Mx[1][0]*a+Mx[1][1]*b
    return (u%3)*3+(v%3)
ok=True
for a in range(4):
    for rest in itertools.product(range(9),repeat=3):
        s=set()
        for x in range(9):
            c=list(rest); c.insert(a,x); s.add(val(c))
        ok&=len(s)==9
for a in range(4):
    for b in range(a+1,4):
        others=[k for k in range(4) if k not in (a,b)]
        for fixed in itertools.product(range(9),repeat=2):
            for ba in range(3):
                for bb in range(3):
                    s=set()
                    for da in range(3):
                        for db in range(3):
                            c=[0]*4
                            for k,vv in zip(others,fixed): c[k]=vv
                            c[a]=ba*3+da; c[b]=bb*3+db
                            s.add(val(c))
                    ok&=len(s)==9
print("9x9x9x9 with every line and every 3x3 box in all six slice directions valid:",ok,"| cells",9**4)
