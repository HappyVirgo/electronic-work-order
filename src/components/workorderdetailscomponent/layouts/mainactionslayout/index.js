//Basic imports
import React from 'react';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

//Icons
import {
    AddNote,
    NotFixed,
    ReAssigned,
    Complete,
    Cancel
} from '../../../../assets/icons'

const useStyles = makeStyles((theme) => ({
    actionButtonGrid:{
        maxWidth: '160px',
    },
    actionButton:{
        textAlign: "center",
        color: "#FFFFFF",
        margin: '3px 0',
        backgroundColor: '#0072CE',
        fontWeight: 'bold',
        width: '150px',
        height: '32px',
        fontSize: '13px',
        borderRadius: '16px !important',
        '&:hover': {
            backgroundColor: '#54A6DA',
            borderColor: '#0072CE',
            boxShadow: 'none',
        }

    },
}));

export const MainActions = () => {
    const classes = useStyles()
    return (
        <Grid item sx={12} md={3} className={classes.actionButtonGrid}>
            <Button variant="contained" color="primary" className={classes.actionButton} startIcon={<AddNote/>}>Add note</Button>
            <Button variant="contained" color="primary" className={classes.actionButton} startIcon={<NotFixed/>}>Not Fixed</Button>
            <Button variant="contained" color="primary" className={classes.actionButton} startIcon={<ReAssigned/>}>Reassign</Button>
            <Button variant="contained" color="primary" className={classes.actionButton} startIcon={<Complete/>}>Complete</Button>
            <Button variant="contained" color="primary" className={classes.actionButton} startIcon={<Cancel/>}>Cancel&nbsp;&nbsp;&nbsp;&nbsp;</Button>
        </Grid>
    )
}