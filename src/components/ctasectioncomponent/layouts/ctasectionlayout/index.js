//Basic Imports
import React, {useContext} from 'react';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {Typography} from "@material-ui/core";

//Context
import { GlobalContext } from "../../../../context/globalcontext";

const useStyles = makeStyles((theme) => ({
    cta_description_text:{
        fontSize: '12px',
        fontWeight: 'bold'
    },
    cta_assigned_value: {
        color: '#49b900;',
        // fontSize: '64px',
        fontSize: '48px',
        fontWeight: 400,
        // margin: '10px'
    },
    cta_pending_value: {
        color: '#FF9022;',
        // fontSize: '64px',
        fontSize: '48px',
        fontWeight: 400,
        // margin: '10px'
    },
    cta_unassigned_value: {
        color: '#F20050;',
        // fontSize: '64px',
        fontSize: '48px',
        fontWeight: 400,
        // margin: '10px'
    }
}));

export const CTASectionLayout = ({assignedToMeWorkOrders, pendingWorkOrders, unassignedWorkOrders}) => {
    let change = useContext(GlobalContext)
    change = change.dynamicData
    //Loading custom styles Material UI
    const classes = useStyles();
    return(
        <Grid item xs={8} md={8} lg={8} className="common-cta-wo">
            <Grid item xs={4} md={4} lg={4} className="assign-to-me-wo" id="assignedWO" onClick={change}>
                <Typography className={classes.cta_assigned_value} variant="h2">{assignedToMeWorkOrders}</Typography>
                <Typography className={classes.cta_description_text} variant="body1">Assign to me</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={4} className="pending-acceptance-wo" id="pendingWO" onClick={change}>
                <Typography className={classes.cta_pending_value} variant="h2">{pendingWorkOrders}</Typography>
                <Typography className={classes.cta_description_text} variant="body1">Pending acceptance</Typography>
            </Grid>
            <Grid item xs={4} md={4} lg={4} className="unassigned-wo" id="unassignedWO" onClick={change}>
                <Typography className={classes.cta_unassigned_value} variant="h2">{unassignedWorkOrders}</Typography>
                <Typography className={classes.cta_description_text} variant="body1">Unassigned</Typography>
            </Grid>
        </Grid>
    )
}

