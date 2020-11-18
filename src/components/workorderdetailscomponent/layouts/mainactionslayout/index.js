//Basic imports
import React from 'react';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import PopupComponent from '../../../popupcomponent'
//Icons
import {
    AddNote,
    NotFixed,
    ReAssigned,
    Complete,
    Cancel
} from '../../../../assets/icons'

const useStyles = makeStyles((theme) => ({
    actionButton:{
        color: "#FFFFFF",
        backgroundColor: '#0072CE',
        fontWeight: 'bold',
        width: '150px',
        maxWidth: '150px',
        minWidth: '150px',
        height: '32px',
        float: 'right',
        fontSize: '13px',
        margin: '5px',
        borderRadius: '16px !important',
        '&:hover': {
            backgroundColor: '#54A6DA',
            borderColor: '#0072CE',
            boxShadow: 'none',
        }

    },
    MuiDialogTitle: {
        root: {
            color: 'blue'
        }
    }
}));

export const MainActions = () => {
    const classes = useStyles()
    return (
        <Grid item xs={12} md={4} className="action-button-grid">
            <Button variant="contained" color="primary" className={`${classes.actionButton} action-button`} startIcon={<AddNote/>}>Add note</Button>
            <PopupComponent buttonLabel="NOT FIXED" modalTitle="Not Fixed" btnClasses={`${classes.actionButton} action-button`} btnStartIcon={<NotFixed/>} MuiDialogTitle={classes.MuiDialogTitle} />
            {/* <Button variant="contained" color="primary" className={`${classes.actionButton} action-button`} startIcon={<NotFixed/>}>Not Fixed</Button> */}
            <Button variant="contained" color="primary" className={`${classes.actionButton} action-button`} startIcon={<ReAssigned/>}>Reassign</Button>
            <PopupComponent buttonLabel="Complete" modalTitle="Complete" btnClasses={`${classes.actionButton} action-button`} btnStartIcon={<Complete/>} />
            <PopupComponent buttonLabel="Cancel" modalTitle="Cancel" btnClasses={`${classes.actionButton} action-button`} btnStartIcon={<Cancel/>} />
            {/* <Button variant="contained" color="primary" className={`${classes.actionButton} action-button`} startIcon={<Complete/>}>Complete</Button>
            <Button variant="contained" color="primary" className={`${classes.actionButton} action-button`} startIcon={<Cancel/>}>Cancel&nbsp;&nbsp;&nbsp;&nbsp;</Button> */}
        </Grid>
    )
}