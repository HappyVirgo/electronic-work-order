//Basic imports
import React from 'react';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    text: {
        fontSize: "14px",
    },
    locationDetails: {
        width: "100%",
        textAlign: "left",
        marginTop: "25px",
        marginBottom: "25px"
    }
}));

export const LocationDetails = ({locationAddress, location, locationPhone, nullVal}) => {
    const classes = useStyles()
    return (
        <Grid container className={classes.locationDetails}>
            <Grid item xs={5}>
            </Grid>        
            <Grid item xs={3}>
                <Typography className={classes.text} variant={'body1'}><strong>Location Details: </strong></Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography className={classes.text} variant={'body1'}>
                    {locationAddress!==null?locationAddress:nullVal}<br/>
                    {location!==null?location:nullVal}<br/>
                    {locationPhone!==null?locationPhone:nullVal}
                </Typography>
            </Grid>               
        </Grid>
    )
}

