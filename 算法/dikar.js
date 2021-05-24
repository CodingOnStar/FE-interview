function maxArea (...args) {
    let listY = []
    for (let i = 0; i < args.length; i++) {
        listY.push(arguments[i])
    }
    //console.log(listY.length)
    let max = 0
    for (let i = 0; i < listY.length; i++) {
        for (let j = i + 1; j < listY.length; j++)
            for (let k = j + 1; k < listY.length; k++) {
                if (listY[j] < listY[k] && listY[j] < listY[i]) {
                    if (listY[i] > listY[k]) {
                        let areaRec = (k - i) * (listY[k] - listY[j])
                        max = Math.max(max, areaRec)
                    } else if (listY[i] < listY[k]) {
                        let areaRec = (k - i) * (listY[i] - listY[j])
                        max = Math.max(max, areaRec)
                    } else {
                        continue
                    }
                } else {
                    continue
                }
            }
    }
    return max
}
console.log(maxArea(1, 8, 1, 2, 5, 8, 8, 7, 3))