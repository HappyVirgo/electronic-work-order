//Basic imports
import React from 'react';
import Moment from 'react-moment';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    text: {
        fontSize: "14px",
        lineHeight: "25px"
    },
    etaSection: {
        border: "1px solid #cccccc",
        borderRadius: "5px",
        padding: "10px"
    },    
}));

export const BoxedDetails = ({currentEta, serviceProvider, proposalStatus, nullVal}) => {
    const classes = useStyles()
    return (
        <Grid item xs={7} className={classes.etaSection}>
            <Typography className={classes.text}><strong>Current ETA: </strong><Moment format="MMMM D, YYYY hh:mm a">{currentEta!==null?currentEta:nullVal}</Moment></Typography>
            <Typography className={classes.text}><strong>Service Provider: </strong>{serviceProvider!==null?serviceProvider:nullVal}</Typography>
            <Typography className={classes.text}><strong>Assigned To: </strong>N/A</Typography>
            <Typography className={classes.text}><strong>Proposal Status: </strong>{proposalStatus!==null?proposalStatus:nullVal}</Typography>
            <Typography className={classes.text}><strong>Invoice Status: </strong>{proposalStatus!==null?proposalStatus:nullVal}</Typography>                    
        </Grid>
    )
}



