//Basic imports
import React from 'react';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import Link from '@material-ui/core/Link';


const useStyles = makeStyles((theme) => ({
    titleWrapper: {
        display: "flex",
        alignItems: "center",
        marginBottom: "10px",
        justifyContent: "space-between"
    },
    title: {
        fontSize: "21px",
        fontWeight: "600",
        backgroundColor: "#e2f9ff",
        padding: "10px",
        borderRadius: "5px",
    },
    description: {
        fontSize: "16px"
    },
    workOrderDescriptionContainer: {
        marginTop: "25px",
        marginBottom: "25px"
    }
}));

export const WorkOrderDescription = ({id, description, nullVal}) => {
    const classes = useStyles()
    return (
        <Grid item xs={12} className={classes.workOrderDescriptionContainer}>
            <div className={`${classes.titleWrapper}`}>
                <Typography variant={'h1'} className={`${classes.title} details-title`}>Work Order: {id!==null?id:nullVal}</Typography>
                <Link href="https://radstuff.ecotrak.com/admin/WorkOrders" target="_blank" rel="noopener"><i>Missing Something? Go to the Old Version</i></Link>
            </div>
            <Typography variant={'body1'} className={classes.description}>{description!==null?description:nullVal}</Typography>                    
        </Grid>
    )
}
