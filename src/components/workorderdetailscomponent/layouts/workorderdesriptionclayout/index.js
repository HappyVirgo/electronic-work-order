//Basic imports
import React from 'react';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Typography, Button } from '@material-ui/core';

import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
    title: {
        fontSize: "21px",
        fontWeight: "600",
        backgroundColor: "#e2f9ff",
        padding: "10px",
        borderRadius: "5px",
        marginBottom: "10px"
    },
    description: {
        fontSize: "16px"
    },
    workOrderDescriptionContainer: {
        marginTop: "25px",
        marginBottom: "25px"
    },
    buttonEdit: {
        borderRadius: "20px",
        float: "right"
    }
}));

export const WorkOrderDescription = ({id, description, nullVal}) => {
    const classes = useStyles()
    return (
        <Grid item xs={12} className={classes.workOrderDescriptionContainer}>
            <Button variant="contained" className={classes.buttonEdit} color="secondary" startIcon={<EditIcon/>} href={`/workorder/edit/${id!==null?id:nullVal}`} >Edit</Button>        
            <Typography variant={'h1'} className={`${classes.title} details-title`}>Work Order: {id!==null?id:nullVal}</Typography>
            <Typography variant={'body1'} className={classes.description}>{description!==null?description:nullVal}</Typography> 
        </Grid>
    )
}
