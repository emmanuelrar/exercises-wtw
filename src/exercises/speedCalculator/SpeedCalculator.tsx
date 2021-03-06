import React, { useEffect } from 'react';
import { useState } from 'react';
import './SpeedCalculator.css';
import { Button, Checkbox, Collapse, FormControlLabel, Grid, IconButton, TextField, Typography } from '@material-ui/core';
import { CloseOutlined, DirectionsBike, FunctionsOutlined, PlusOneOutlined, RemoveCircleOutlineOutlined, SpeedOutlined } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';

const SpeedCalculator = () => {

    const BLUE_BIKER: number = 0;
    const RED_BIKER: number = 1;

    const [labelMessage, setLabelMessage] = useState<string>("");
    const [fastest, setFastest] = useState<boolean>(true);
    const [blueBikers, setBlueBikers] = useState<number[]>([]);
    const [redBikers, setRedBikers] = useState<number[]>([]);
    const [maxSpeed, setMaxSpeed] = useState<number>(0);
    const [tandemBikeTeam, setTandemBikeTeam] = useState<Array<number[]>>([]);
    const [showAlert, setShowAlert] = useState(false);

    const addBikersTeam = () => {
        blueBikers.push(0);
        redBikers.push(0);
        setBlueBikers([...blueBikers]);
        setRedBikers([...redBikers]);
    }

    const handleChangeInput = (key: number, event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, bikerColor: number) => {
        // VALIDATE NAN
        const value = Number.parseInt(event.currentTarget.value);
        if (bikerColor === BLUE_BIKER) {
            if (isNaN(value) || value < 0) {
                blueBikers[key] = 0;
            } else {
                blueBikers[key] = value;
            }
            setBlueBikers([...blueBikers])
        } else if (bikerColor === RED_BIKER) {
            if (isNaN(value) || value < 0) {
                redBikers[key] = 0;
            } else {
                redBikers[key] = value;
            }
            setRedBikers([...redBikers])
        }
    }

    const removeBikerTeam = (index: number) => {
        blueBikers.splice(index, 1);
        redBikers.splice(index, 1);
        setBlueBikers([...blueBikers]);
        setRedBikers([...redBikers]);
    }

    useEffect(() => {
        let speed: number = 0;
        tandemBikeTeam.forEach(team => {
            if (fastest) {
                speed += Math.max(...team);
                setLabelMessage("Best speed outcome is");
            } else {
                setLabelMessage("Slowest speed outcome is");
                speed += Math.min(...team);
            }
        });
        if (speed > 0) {
            setMaxSpeed(speed);
        }
    }, [tandemBikeTeam])

    useEffect(() => {
        if (maxSpeed > 0) {
            setTandemBikeTeam([]);
        }
    }, [maxSpeed])

    const calculateBestOutcome = () => {
        if (blueBikers.length <= 0) {
            setShowAlert(true)
            return;
        }

        const blueBikersSorted = blueBikers.sort((a, b) => { return b - a; });
        const redBikersSorted = redBikers.sort((a, b) => { return a - b; });

        for (let index = 0; index < blueBikersSorted.length; index++) {
            tandemBikeTeam.push([blueBikersSorted[index], redBikersSorted[index]]);
        }
        setTandemBikeTeam([...tandemBikeTeam]);
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFastest(event.target.checked);
    };

    return (
        <div className="content">
            <Grid container justifyContent="center" spacing={3}>
                <Grid item xs={5}>
                    <DirectionsBike color="primary" />
                    <p><b color="primary">Blue</b> Team </p>
                    <form noValidate autoComplete="off">
                        <Grid container justifyContent="center" spacing={3}>
                            {
                                blueBikers.map((blueBiker, index) => (
                                    <Grid item xs={12} key={`grid-item-${index}-${blueBiker}-blue`}>
                                        <TextField id={`outlined-basic-${index}`} key={`outlined-basic-${index}`} label="Biker Speed" value={blueBiker} variant="outlined" onChange={(e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => handleChangeInput(index, e, BLUE_BIKER)} />
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </form>
                </Grid>
                <Grid item xs={2}>
                    <Button variant="outlined" onClick={addBikersTeam}>
                        <p>Add Team</p>
                        <PlusOneOutlined />
                    </Button>
                    <div className="result">
                        <p>{labelMessage}</p>
                        {maxSpeed}
                    </div>
                </Grid>
                <Grid item xs={5}>
                    <DirectionsBike color="secondary" />
                    <p><b color="secondary">Red</b> Team </p>
                    <form noValidate autoComplete="off">
                        <Grid container justifyContent="center" spacing={3}>
                            {
                                redBikers.map((redBiker, indx) => (
                                    <Grid item xs={12} key={`grid-item-${indx}-${redBiker}-red`} alignContent="space-between">
                                        <TextField id={`outlined-basic-${indx}`} key={`outlined-basic-${indx}`} value={redBiker} label="Biker Speed" variant="outlined" onChange={(e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => handleChangeInput(indx, e, RED_BIKER)} />
                                        <IconButton color="secondary" onClick={() => { removeBikerTeam(indx) }}>
                                            <RemoveCircleOutlineOutlined />
                                        </IconButton>
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </form>
                </Grid>
            </Grid>
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
                        You must add some bikers.
                    </Alert>
                </Collapse>
            </div>
            <Grid container className="footer">
                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox color="primary" checked={fastest} onChange={handleChange} name="fastest" />}
                        label="Fastest?"
                        className="label"
                    />
                    <br />
                    <Button variant="outlined" onClick={calculateBestOutcome}>
                        Do Math!
                        <FunctionsOutlined />
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
}

export default SpeedCalculator;
