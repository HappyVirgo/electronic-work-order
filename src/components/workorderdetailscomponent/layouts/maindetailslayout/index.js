//Basic imports
import React from 'react';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {Typography} from "@material-ui/core";

//Modal
import {ModalComponent} from '../../../../components'

const useStyles = makeStyles((theme) => ({
    typography: {
        lineHeight: "15px"
    }
}));

export const MainDetails = ({assetName, workOrderId, woType, manufacturer, model, serial, assetType, warrantyLabel, nullVal}) => {
    const classes = useStyles()
    let warrantyBadge
    let warrantyText
    if(warrantyLabel===true) {
        warrantyBadge = "warranty_available"
        warrantyText = "Available"
    } else {
        warrantyBadge = "warranty_not_available"
        warrantyText = "Not Available"
    }
    return (
        <Grid item xs={6} md={5} className="main_details">
            <Typography variant="h1" className={classes.Typography}>{assetName!==undefined?(assetName!==null?assetName:workOrderId):workOrderId} <br/><small>{woType!==null?woType:nullVal}</small></Typography>
            <Typography >Manufacturer: {manufacturer!==null?manufacturer:nullVal}</Typography>
            <Typography>Model #: {model!==null?model:nullVal}</Typography>
            <Typography>Serial #: {serial!==null?serial:nullVal}</Typography>
            <Typography>Asset Type: {assetType!==null?assetType:nullVal}</Typography>
            <Typography className={warrantyBadge}>Warranty: </Typography><ModalComponent  title={warrantyText} data={[]} type="warranty" />
        </Grid>
    )
}