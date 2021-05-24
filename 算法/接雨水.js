/*给定n个非负整数表示每个宽度为1的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水
示例1：
输入：height=[0，1，0，2，1，0，1，3，2，1，2，1]
输出：6
解释：上面由数组表示的高度图，在这种情况下，可以接6个单位的雨水
示例2：
输入：height:[4，2，0，3，2，5]
输出：9


##思路
仅仅对于位置i，能装多少水
与左边最高的柱子和右边最高的柱子相关

left_max
right_max
那么i能装最多的水是：Math.min(left_max, right_max)
value[i]=Math.min(left_max, right_max)-height[i]
*/
//暴力法
//O(n^2) O(1)
function trap (height) {
    if (height.length === 0) {
        return 0
    }
    const n = height.length
    let res = 0
    for (let i = 1; i < n; i++) {
        let left_max = 0
        let right_max = 0
        for (let j = i; j < n; j++) {
            //用来找右边最高的柱子
            right_max = Math.max(right_max, height[j])
        }
        for (let j = i; j >= 0; j++) {
            //找左边最高的柱子
            left_max = Math.max(left_max, height[j])
        }
        res += Math.min(left_max, right_max) - height[i]
    }
    return res
}
//改进
//O(n) O(n)
function trap2 (height) {
    if (height.length === 0) {
        return 0
    }
    const n = height.length
    let res = 0
    let left_max = new Array(n)
    let right_max = new Array(n)
    left_max[0] = height[0]
    right_max[n - 1] = height[n - 1]
    for (let j = n - 2; j >= 0; j--) {
        //用来找右边最高的柱子
        right_max[j] = Math.max(right_max[j + 1], height[j])
    }
    for (let j = 1; j < n; j++) {
        //找左边最高的柱子
        left_max[j] = Math.max(left_max[j - 1], height[j])
    }
    for (let i = 1; i < n - 1; i++) {
        res += Math.min(left_max[i], right_max[i]) - height[i]
    }
    return res
}
//双指针
function trap3 (height) {
    if (height.length === 0) {
        return 0
    }
    const n = height.length
    let res = 0
    let left = 0
    let right = n - 1
    let left_max = height[0]
    let right_max = height[n - 1]
    while (left <= right) {
        left_max = Math.max(left_max, height[left])
        right_max = Math.max(right_max, height[right])
        if (left_max < right_max) {
            res += left_max - height[left]
            left++
        } else {
            res += right_max - height[right]
            right--
        }
    }
}
