function findString (data, s, t) {
    for (let i = 0; i < s.length - 1; i++) {
        for (let j = 0; j < t.length; j++) {
            if (s[i] === t[j]) {
                break;
            } else {
                t = t.splice(j, 1)
                s = s.splice(i, 1)
                break;
            }
        }
    }
    let sum;
    sum += s.map(function () {
        data.indexOf(item)
    })
}