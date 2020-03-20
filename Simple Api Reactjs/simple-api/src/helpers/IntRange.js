const IntRange=(from,to,step=1)=>{
    let i=from
    const range=[]
    while(i<=to){
        range.push(i)
        i++
    }
    return range
}

export default IntRange