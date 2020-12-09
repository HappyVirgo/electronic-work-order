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
    date: {
        fontWeight: 600,
        color: "#F20050",
    }  
}));

export const BoxedDetails = ({currentEta, serviceProvider, serviceProviderLast, proposalStatus, invoiceStatus, nullVal}) => {
    const classes = useStyles()
    const smallSize = 12
    const mediumSize = 6
    const unixtest = currentEta!==null?currentEta:nullVal
    const testing = Date.parse(unixtest)
    //console.log(testing)
    return (
        <Grid item xs={smallSize} md={7} className={classes.etaSection}>
            <Grid container>
                <Grid item xs={smallSize} md={mediumSize}>
                    <Typography className={classes.text}><strong>Current ETA: </strong></Typography>
                </Grid>
                <Grid item xs={smallSize} md={mediumSize}>
                    <Typography className={classes.text}><span className={classes.date}><Moment format="MMMM D, YYYY hh:mm a">{currentEta!==null?currentEta:nullVal}</Moment></span></Typography>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={smallSize} md={mediumSize}>
                    <Typography className={classes.text}><strong>Service Provider: </strong></Typography>
                </Grid>
                <Grid item xs={smallSize} md={mediumSize}>
                    <Typography className={classes.text}>{serviceProvider!==null?serviceProvider:nullVal} {serviceProviderLast!==null?serviceProviderLast:nullVal}</Typography>
                </Grid>
            </Grid>            
            <Grid container>
                <Grid item xs={smallSize} md={mediumSize}>
                    <Typography className={classes.text}><strong>Assigned To: </strong></Typography>
                </Grid>
                <Grid item xs={smallSize} md={mediumSize}>
                    <Typography className={classes.text}>N/A</Typography>
                </Grid>
            </Grid>     
            <Grid container>
                <Grid item xs={smallSize} md={mediumSize}>
                    <Typography className={classes.text}><strong>Proposal Status: </strong></Typography>                    
                </Grid>
                <Grid item xs={smallSize} md={mediumSize}>
                        <Typography className={classes.text}>{proposalStatus!==null?proposalStatus:nullVal}</Typography>
                </Grid>               
            </Grid>                    
            <Grid container>
                <Grid item xs={smallSize} md={mediumSize}>
                    <Typography className={classes.text}><strong>Invoice Status: </strong></Typography>                    
                </Grid>
                <Grid item xs={smallSize} md={mediumSize}>
                    <Typography className={classes.text}>{invoiceStatus!==null?invoiceStatus:nullVal}</Typography>
                </Grid>                              
            </Grid>             
        </Grid>
    )
}



