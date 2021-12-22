function a (n){
    let a0= 2;
    let a1=3;
    let an ;
    if(n ==0) return a0;
    if(n==1) return a1;
    for(let i =2;i<=n;i++){
        an =2*a1+a0;
        a0 = a1;
        a1 = an;
    }
    return an;
}
console.log(a(2));