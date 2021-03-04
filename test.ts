class NumMatrix {
    matrix: number[][] = [];
    constructor(matrix: number[][]) {
        const width = matrix[0].length;
        const height = matrix.length;
        this.matrix = new Array<Array<number>>(new Array<number>(width).fill(0))
            .concat(matrix)
            .map(each => [0].concat(each));
        for (let i = 1; i < height + 1; i++) {
            for (let j = 1; j < width + 1; j++) {
                this.matrix[i][j] +=
                    this.matrix[i - 1][j] +
                    this.matrix[i][j - 1] -
                    this.matrix[i - 1][j - 1];
            }
        }
    }

    sumRegion(row1: number, col1: number, row2: number, col2: number): number {
        return this.matrix[row2][col2] - this.matrix[row1 - 1][col1 - 1];
    }
}

const X = new NumMatrix([
    [3, 0, 1, 4, 2],
    [5, 6, 3, 2, 1],
    [1, 2, 0, 1, 5],
    [4, 1, 0, 1, 7],
    [1, 0, 3, 0, 5],
]);
console.log(X.matrix);
console.log(X.sumRegion(2, 1, 4, 3));
