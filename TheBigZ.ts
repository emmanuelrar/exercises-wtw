function zigzagAway(): void {

    let board: Array<number[]> = [
        [1, 3, 6, 10],
        [2, 5, 9, 13],
        [4, 8, 12, 15],
        [7, 11, 14, 16],
    ];
    let zigzaggedBoard: number[] = [];

    let nextPosition = [0, 0];
    let initialPosition = [0, 0];

    board.forEach((y, yIndex) => {
        y.forEach((x, xIndex) => {

            if (typeof board[nextPosition[0]][nextPosition[1]] !== undefined) {
                zigzaggedBoard.push(board[nextPosition[0]][nextPosition[1]]);
            }

            nextPosition[0] -= 1;
            nextPosition[1] += 1;

            if (nextPosition[0] < 0 || nextPosition[1] < 0) {
                initialPosition = [initialPosition[0] + 1, initialPosition[1]];
                nextPosition = [...initialPosition];
            }

            if (initialPosition[0] >= board.length || nextPosition[1] >= y.length) {
                initialPosition = [board.length - 1, initialPosition[1] + 1];

                nextPosition = [...initialPosition];
            }
        });
    });

    zigzaggedBoard = zigzaggedBoard;

    console.log(zigzaggedBoard);
}

zigzagAway();
