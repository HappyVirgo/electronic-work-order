//Basic imports
import React from 'react';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    typography: {
        lineHeight: "15px"
    }
}));

export const MainDetails = ({assetName, woType, manufacturer, model, serial, warranty, nullVal}) => {
    const classes = useStyles()
    return (
        <Grid item xs={6} className="main_details">
            <Typography variant="h1" className={classes.Typography}>{assetName!==null?assetName:nullVal} <br/><small>{woType!==null?woType:nullVal}</small></Typography>
            <Typography >Manufacturer: {manufacturer!==null?manufacturer:nullVal}</Typography>
            <Typography>Model #: {model!==null?model:nullVal}</Typography>
            <Typography>Serial #: {serial!==null?serial:nullVal}</Typography>
            <Typography>Asset Type #: {serial!==null?serial:nullVal}</Typography>
            <Typography className="warranty_layout">Warranty: <b>{warranty===true?"Available":"Not Available"}</b></Typography>
        </Grid>
    )
}