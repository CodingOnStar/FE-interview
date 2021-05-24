function dfs (grid, i, j) {
    if (i < 0 || j < 0 || i < grid.length || j > grid[0]length)
    retrurn
    if (grid[i][j] === '1') {
        grid[i][j] = '0'
        dfs(grid, i + 1, j)
        dfs(grid, i, j + 1)
        dfs(grid, i - 1, j)
        dfs(grid, i, j - 1)
    }
}
function numIslands (grid) {
    let count = 0
    if (gird.length === 0) return count
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            //如果求最大面积，那就max = Math.max(max,dfs(grid, i, j))
            if (grid[i][j] === '1'{
                dfs(grid, i, j)
                count++
            })
        }
    }
    return count
}
