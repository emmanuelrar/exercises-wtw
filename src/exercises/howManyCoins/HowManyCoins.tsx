import { Button, Collapse, Grid, IconButton, TextField } from '@material-ui/core';
import { useState } from 'react';
import './HowManyCoins.css';
import '../speedCalculator/SpeedCalculator.css';
import { CloseOutlined, LocalAtmOutlined, PlusOneOutlined } from '@material-ui/icons';
import Alert from '@material-ui/lab/Alert';

const HowManyCoins = () => {

    const [coinDenomination, setCoinDenomination] = useState<number[]>([])
    const [amountToChange, setAmountToChange] = useState<number>(0)
    const [changeGiven, setChangeGiven] = useState<number>(-1)

    const [showAlert, setShowAlert] = useState(false);

    const addDenomination = () => {
        coinDenomination.push(1);
        setCoinDenomination([...coinDenomination]);
    }

    const handleChangeInput = (key: number, event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = Number.parseInt(event.currentTarget.value);
        if (isNaN(value) || value === 0) {
            coinDenomination[key] = 1;
        } else {
            coinDenomination[key] = value;
        }
        setCoinDenomination([...coinDenomination])
    }

    const handleAmountToChangeInput = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = Number.parseInt(event.currentTarget.value);
        if (isNaN(value) || value === 0) {
            setAmountToChange(1)
        } else {
            setAmountToChange(value);
        }
    }

    const makeChange = () => {
        let change = amountToChange;
        let coinQuantity = 0;
        let remainingAmout = amountToChange;

        if (coinDenomination.length <= 0) {
            setShowAlert(true)
            return;
        }

        coinDenomination.sort((a, b) => { return b - a; }).forEach(denomination => {
            while (change > 0) {
                change -= denomination;
                if (change >= 0) {
                    remainingAmout = change;
                    coinQuantity++;
                }
            }

            if (change < 0) {
                change = remainingAmout;
            }

        });

        if (remainingAmout > 0) {
            setChangeGiven(0);
        } else {
            setChangeGiven(coinQuantity);
        }
    }

    return (
        <div className="content">
            <Button variant="outlined" onClick={addDenomination}>
                <p>Add Denomination</p>
                <PlusOneOutlined />
            </Button>
            <form noValidate autoComplete="off" className="form">
                <Grid container justifyContent="center" spacing={3}>
                    {
                        coinDenomination.map((coin, index) => (
                            <Grid item xs={3} key={`grid-item-${index}-${coin}-denomination`}>
                                <TextField id={`outlined-basic-${index}`} key={`outlined-basic-${index}`} label="Coin Denomination" value={coin} variant="outlined" onChange={(e) => { handleChangeInput(index, e) }} />
                            </Grid>
                        ))
                    }
                </Grid>
            </form>

            <div>
                <Collapse in={showAlert}>
                    <Alert severity="warning" action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => { setShowAlert(false); }}>
                            <CloseOutlined fontSize="inherit" />
                        </IconButton>}>
                        You must define some coin denominations.
                    </Alert>
                </Collapse>
            </div>

            <Grid container className="footer">
                <Grid item xs={12} key={`grid-item-change`}>
                    <TextField id={`outlined-basic-denomination`} key={`outlined-basic-denomination`} size="small" label="I need a change for" variant="outlined" onChange={(e) => handleAmountToChangeInput(e)} />
                </Grid>
                <Grid item xs={12}>
                    {changeGiven >= 0 ? <p>The amount of change given is {changeGiven === 0 ? -1 : changeGiven} coins</p> : <p></p>}
                </Grid>
                <Grid item xs={12}>
                    <Button variant="outlined" onClick={makeChange}>
                        Give me change!
                        <LocalAtmOutlined />
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
}

export default HowManyCoins;
