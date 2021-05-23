const p = function () {
    return new Promise((resolve, reject) => {
        const p1 = new Promise((resolve, reject) => {
            setTimeout(() => {
                //console.log('11')
                resolve(1)
            }, 0);
            //resolve(2)
        })
        p1.then((result) => {
            console.log(result)
        })
        console.log(3)
        /*setTimeout(() => {
            console.log(1)
        }, 0);*/
        resolve(4)
    })
}
p().then((result) => {
    console.log(result)
})
console.log('end')