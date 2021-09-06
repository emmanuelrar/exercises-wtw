var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
function zigzagAway() {
    var X_AXIS = 0;
    var Y_AXIS = 1;
    var board = [
        [1, 3, 6, 10],
        [2, 5, 9, 13],
        [4, 8, 12, 15],
        [7, 11, 14, 16],
    ];
    var zigzaggedBoard = [];
    var nextPosition = [0, 0];
    var initialPosition = [0, 0];
    board.forEach(function (y, yIndex) {
        y.forEach(function (x, xIndex) {
            if (typeof board[nextPosition[0]][nextPosition[1]] !== undefined) {
                zigzaggedBoard.push(board[nextPosition[0]][nextPosition[1]]);
            }
            nextPosition[0] -= 1;
            nextPosition[1] += 1;
            if (nextPosition[0] < 0 || nextPosition[1] < 0) {
                initialPosition = [initialPosition[0] + 1, initialPosition[1]];
                nextPosition = __spreadArray([], initialPosition, true);
            }
            if (initialPosition[0] >= board.length || nextPosition[1] >= y.length) {
                initialPosition = [board.length - 1, initialPosition[1] + 1];
                nextPosition = __spreadArray([], initialPosition, true);
            }
        });
    });
    zigzaggedBoard = zigzaggedBoard;
    console.log(zigzaggedBoard);
}
zigzagAway();
