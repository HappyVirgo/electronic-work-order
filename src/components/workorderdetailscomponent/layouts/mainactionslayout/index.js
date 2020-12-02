//Basic imports
import React, {useContext} from 'react';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';

import { GlobalContext } from "../../../../context/globalcontext";
import PopupComponent from '../../../popupcomponent'
//Icons
import {
    AddNote,
    NotFixed,
    ReAssigned,
    // Complete,
    Cancel
} from '../../../../assets/icons';

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
    actionButtonOutlned:{
        color: "#0072CE",
        border: '2px solid #0072CE',
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
            backgroundColor: '#0072CE',
            color: "#FFFFFF",
            borderColor: '#0072CE',
            boxShadow: 'none',
        }

    },
    MuiDialogTitle: {
        root: {
            color: 'blue'
        }
    },
    inputLabel: {
        margin: '20px'
    },
    textField: {
        minHeight: 200 
    }
}));

export const MainActions = () => {
    const noteFunc = useContext(GlobalContext)
    const addNote = noteFunc.createNoteWOData
    const chageInputNote = noteFunc.handleNoteInput
    let noteDescription = noteFunc.noteDescription
    const error = noteDescription === '' || noteDescription.length > 1000;
    const updateWOStatus = noteFunc.updateWOStatus
    const classes = useStyles()
    const addNoteContent = <div>
                                <FormControl required error={error} component="fieldset" style={{width:'100%'}}>
                                    <FormLabel className={classes.inputLabel} component="legend">Note(1,000 character max)</FormLabel>
                                    <TextField onChange={chageInputNote} fullWidth={true} multiline={true} variant="outlined" InputProps={{ classes: { input: classes.textField } }}/>
                                </FormControl>
                                <FormControl required>
                                <FormControlLabel
                                    control={
                                    <Checkbox
                                        // checked={state.checkedB}
                                        // onChange={handleChange}
                                        name="checkedB"
                                        color="primary"
                                    />
                                    }
                                    label="Mark as important note"
                                />
                                </FormControl>
                            </div>
    return (
        <Grid item xs={12} md={4} className="action-button-grid">
            <PopupComponent buttonLabel="ADD NOTE" modalTitle="Add Notes" btn2Classes={`${classes.actionButton} action-button`} btnClasses={`${classes.actionButton} action-button`} btn1Classes={`${classes.actionButtonOutlned} action-button`} btnStartIcon={<AddNote/>} btn1Label="Cancel" btn2Func={addNote} btn2Label="Submit" MuiDialogTitle={classes.MuiDialogTitle} content={addNoteContent} />
            <PopupComponent buttonLabel="Not Fixed" modalTitle="Not Fixed" btnClasses={`${classes.actionButton} action-button`} btn2Classes={`${classes.actionButton} action-button`} btn1Classes={`${classes.actionButton} action-button`} btnStartIcon={<NotFixed/>} btn1Func={updateWOStatus} MuiDialogTitle={classes.MuiDialogTitle} content="Not fixed?" />
            <Button variant="contained" color="primary" className={`${classes.actionButton} action-button`} startIcon={<ReAssigned/>}>Reassign</Button>
            {/* <PopupComponent buttonLabel="Complete" modalTitle="Complete" btnClasses={`${classes.actionButton} action-button`} btn2Classes={`${classes.actionButton} action-button`} btn1Classes={`${classes.actionButton} action-button`} btnStartIcon={<Complete/>} btn1Func={updateWOStatus} MuiDialogTitle={classes.MuiDialogTitle} content="Complete?" /> */}
            <PopupComponent buttonLabel="Cancel" modalTitle="Cancel" btnClasses={`${classes.actionButton} action-button`} btn2Classes={`${classes.actionButton} action-button`} btn1Classes={`${classes.actionButton} action-button`} btnStartIcon={<Cancel/>} btn1Func={updateWOStatus} MuiDialogTitle={classes.MuiDialogTitle} content="Cancel?" />
        </Grid>
    )
}