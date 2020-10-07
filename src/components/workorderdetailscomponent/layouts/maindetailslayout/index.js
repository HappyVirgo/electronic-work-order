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

export const MainDetails = ({assetName, woType, manufacturer, model, serial, assetType, warranty, nullVal}) => {
    const classes = useStyles()
    let warrantyBadge
    let warrantyText
    if(warranty===true) {
        warrantyBadge = "warranty_available"
        warrantyText = "Available"
    } else {
        warrantyBadge = "warranty_not_available"
        warrantyText = "Not Available"
    }
    return (
        <Grid item xs={12} md={6} className="main_details">
            <Typography variant="h1" className={classes.Typography}>{assetName!==null?assetName:nullVal} <br/><small>{woType!==null?woType:nullVal}</small></Typography>
            <Typography >Manufacturer: {manufacturer!==null?manufacturer:nullVal}</Typography>
            <Typography>Model #: {model!==null?model:nullVal}</Typography>
            <Typography>Serial #: {serial!==null?serial:nullVal}</Typography>
            <Typography>Asset Type: {assetType!==null?assetType:nullVal}</Typography>
            <Typography className={warrantyBadge}>Warranty: <span/><strong>{warrantyText}</strong></Typography>
        </Grid>
    )
}