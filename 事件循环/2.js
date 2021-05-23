console.log('start')
setTimeout(() => {
    console.log('children2')
    Promise.resolve().then(() => {
        console.log('children3')
    })
}, 0);
new Promise(function (resolve, reject) {
    console.log('children4')
    setTimeout(() => {
        console.log('children5')
        resolve('children6')
    }, 0);
}).then((result) => {
    console.log('children7')
    setTimeout(() => {
        console.log(result)
    }, 0);
})