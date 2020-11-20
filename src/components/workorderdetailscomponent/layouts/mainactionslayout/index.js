//Basic imports
import React, {useContext} from 'react';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'

import { GlobalContext } from "../../../../context/globalcontext";
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
    },
}));

export const MainActions = () => {
    const noteFunc = useContext(GlobalContext)
    const addNote = noteFunc.createNoteWOData
    const chageInputNote = noteFunc.handleNoteInput
    const classes = useStyles()
    const addNoteContent = <div>
                                <InputLabel>Please input the note description.</InputLabel>
                                <TextField onChange={chageInputNote} fullWidth={true} multiline={true} />
                            </div>
    return (
        <Grid item xs={12} md={4} className="action-button-grid">
            <PopupComponent buttonLabel="ADD NOTE" modalTitle="ADD NOTE" btnClasses={`${classes.actionButton} action-button`} btnStartIcon={<AddNote/>} btn1Label="Add" btn1Func={addNote} btn2Label="Cancel" MuiDialogTitle={classes.MuiDialogTitle} content={addNoteContent} />
            <PopupComponent buttonLabel="NOT FIXED" modalTitle="Not Fixed" btnClasses={`${classes.actionButton} action-button`} btnStartIcon={<NotFixed/>} MuiDialogTitle={classes.MuiDialogTitle} content="Not fixed?" />
            <Button variant="contained" color="primary" className={`${classes.actionButton} action-button`} startIcon={<ReAssigned/>}>Reassign</Button>
            <PopupComponent buttonLabel="Complete" modalTitle="Complete" btnClasses={`${classes.actionButton} action-button`} btnStartIcon={<Complete/>} content="Complete?" />
            <PopupComponent buttonLabel="Cancel" modalTitle="Cancel" btnClasses={`${classes.actionButton} action-button`} btnStartIcon={<Cancel/>} content="Cancel?" />
        </Grid>
    )
}