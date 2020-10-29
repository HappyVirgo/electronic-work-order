//Basic Imports
import React, {useContext} from 'react';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {Typography} from "@material-ui/core";

//Context
import { GlobalContext } from "../../../../context/globalcontext";

const useStyles = makeStyles((theme) => ({
    cta_emergency_text: {
        color: '#FFFFFF;',
        fontSize: '12px',
        fontWeight: 400
    },
    cta_emergency_value: {
        color: '#FFFFFF;',
        fontSize: '32px',
        float: 'left',
        fontWeight: 400
    }
}));

export const FeaturedCTALayout = ({emergencyWorkOrders}) => {
    //Setting function from context
    let change = useContext(GlobalContext)
    change = change.dynamicData
    //Loading custom styles Material UI
    const classes = useStyles();
    return(
        <Grid item xs={12} md={4} lg={4} className="featured-cta-wo">
            <Grid item className="emergency-wo" id="emergencyWO" onClick={change}>
                <Typography className={classes.cta_emergency_value} variant="body1" component="div">{emergencyWorkOrders}</Typography>
                <Typography className={classes.cta_emergency_text} variant="body1">Emergency<br/> Work Orders</Typography>
            </Grid>
        </Grid>
    )
}

