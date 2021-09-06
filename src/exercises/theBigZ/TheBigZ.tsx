import { Button, Grid, TextField } from '@material-ui/core';
import { useEffect, useState } from 'react';
import './TheBigZ.css';
import '../speedCalculator/SpeedCalculator.css';
import { ShowChartOutlined } from '@material-ui/icons';
import Alert from '@material-ui/lab/Alert';

const TheBigZ = () => {

    const X_AXIS = 0;
    const Y_AXIS = 1;

    const [xSize, setXSize] = useState(0);
    const [ySize, setYSize] = useState(0);
    const [board, setBoard] = useState<Array<number[]>>([]);
    const [zigzaggedBoard, setZigzaggedBoard] = useState<number[]>([]);

    useEffect(() => {
        setBoard(Array(ySize).fill(2).map(row => new Array(xSize).fill(1)));
    }, [xSize, ySize])

    const handleInput = (axis: number, event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = Number.parseInt(event.currentTarget.value);
        if (axis === X_AXIS) {
            if (isNaN(value) || value === 0) {
                setXSize(1)
            } else {
                setXSize(value)
            }
        } else if (axis === Y_AXIS) {
            if (isNaN(value) || value === 0) {
                setYSize(1)
            } else {
                setYSize(value)
            }
        }
    }

    const handleInputBoard = (xIndex: number, yIndex: number, event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = Number.parseInt(event.currentTarget.value);

        if (isNaN(value) || value === 0) {
            board[yIndex][xIndex] = 0;
        } else {
            board[yIndex][xIndex] = value;
        }

        board[yIndex][xIndex] = value;
        setBoard([...board])
    }

    const zigzagAway = () => {
        let nextPosition = [0, 0];
        let initialPosition = [0, 0];

        let zigzaggedBoard: number[] = [];

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

        setZigzaggedBoard(zigzaggedBoard);
    }


    return (
        <div className="content">
            <h2>The Big Z</h2>
            <form noValidate autoComplete="off" className="form">
                <Grid container justifyContent="center" spacing={3}>
                    <Grid item xs={2} key={`grid-item-x-size`}>
                        <TextField className="input" id={`outlined-basic-x-size`} key={`outlined-basic-x-size`} label="X Size" variant="outlined" onChange={(e) => { handleInput(X_AXIS, e) }} />
                    </Grid>
                    <Grid item xs={2} key={`grid-item-y-size`}>
                        <TextField className="input" id={`outlined-basic-y-size`} key={`outlined-basic-y-size`} label="Y Size" variant="outlined" onChange={(e) => { handleInput(Y_AXIS, e) }} />
                    </Grid>
                </Grid>
            </form>

            <div className="grid-space">
                {board.map((y, index) => {
                    return (
                        <div>
                            {y.map((x, idx) => (
                                <TextField id={`key-x-${idx}`} key={`key-x-${idx}`} label="" size="small" variant="outlined" onChange={(e) => { handleInputBoard(idx, index, e) }} />
                            ))}
                            <br />
                        </div>
                    );
                })}
            </div>

            <Grid container className="footer">
                <div className="result">
                    {zigzaggedBoard.map((x, idx) => (
                        <TextField id={`key-board-${idx}`} key={`key-board-${idx}`} label="" size="small" value={x} variant="outlined" />
                    ))}
                </div>
                <Grid item xs={12}>
                    <Button variant="outlined" onClick={zigzagAway}>
                        ZigZag Away!
                        <ShowChartOutlined />
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
}

export default TheBigZ;
