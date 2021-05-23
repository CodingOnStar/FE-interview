/*1、有t个格子，每个格子上有一个蘑菇，蘑菇分为好蘑菇和毒蘑菇，好蘑菇增加体力值n，n是一个变量，比如：n=5；毒蘑菇消耗体力值n，比如：n=-3
人的初始体力值为m
跳的格子的距离与消耗的体力值成正比，正比关系是1:1
达到最后一格或者跳过最后一格则视为到达终点
人的出发位置是格子之外的，比如：人  t1 t2 t3
问题：输入一个人的初始体力值m和格子初始化序列list，求问：写一个函数，判断该人是否能否跳到终点？如果不能，函数返回-1，如果可以，返回剩余的最大体力值。


function maxValue (m, list) {
    let t = list.length;
    if (t < 1 && m > 0) {
        return m;
    } else {
        if (m + list[0] > 0) {
            m = m + list[0];
            list = list.slice(1,);
            maxValue(m, list)
        } else {
            return -1;
        }
    }
    return m
}
console.log(maxValue(3, [1, -1, -1, -2, 3, -3, 2])) 
function findNum (list) {
    let result = {}
    let ret = []
    for (let i = 0; i <= list.length - 1; i++) {
        if (result[list[i]]) {
            result[list[i]]++
            if (result[list[i]] > (list.length / 2)) {
                ret.push(list[i])
            }
        } else {
            result[list[i]] = 1;
        }
    }
    return ret
}
let list = [2, 2, 1, 1, 1, 2, 2, 1, 1]
console.log(findNum(list))
//line=readline()
//print(line)*/
let arr = [[1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10]
function deepConvert (list) {
    if (list.length === 0) {
        return
    }
    let result = []
    for (item of list) {
        if (item instanceof Array) {
            deepConvert(item)
        } else {
            result.push(item)
        }
    }
    return result
}
console.log(deepConvert(arr))
