function angkaTerbaik(int, k){
    let a
    if(k){
        a = String(int).repeat(k).split('')
    }else{
        a = String(int).split('')
    }
    if(a.length === 1) return int
    let be = 0
    a.forEach((b) => {
        be += Number(b)
    })
    return angkaTerbaik(be)
}

console.log(angkaTerbaik(148,3))
