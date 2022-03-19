for i in range(3):
    for j in range(3):
        print(i,j)
        for s in range(3*i,3*i+3):
            for e in range(3*j,3*j+3):
                print("cell" + str(s) + str(e), end=" ")
            print(" ")
