//Basic imports
import React from 'react';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    title: {
        fontSize: "21px",
        fontWeight: "600"
    },
    description: {
        fontSize: "16px"
    },
    workOrderDescriptionContainer: {
        marginBottom: "25px"
    }
}));

export const WorkOrderDescription = ({id, description, nullVal}) => {
    const classes = useStyles()
    return (
        <Grid item xs={12} className={classes.workOrderDescriptionContainer}>
            <Typography variant={'h1'} className={classes.title}>Work Order: {id!==null?id:nullVal}</Typography>
            <Typography variant={'body1'} className={classes.description}>{description!==null?description:nullVal}</Typography>                    
        </Grid>
    )
}
