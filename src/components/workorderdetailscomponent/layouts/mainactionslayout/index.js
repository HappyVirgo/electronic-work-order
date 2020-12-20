//Basic imports
import React, {useContext} from 'react';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import { Select, MenuItem } from '@material-ui/core'

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
        width: '140px',
        maxWidth: '150px',
        // minWidth: '150px',
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
        width: '140px',
        maxWidth: '150px',
        // minWidth: '150px',
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
    },
    reassignForm: {
        width: '100%',
        flexDirection: 'row',
        margin: '20px 0px',
        alignItems: 'center'
    },
    reassignSelect: {
        flex: '1',
        marginTop: 'unset !important',
    }
}));

const serviceProviders = [
    "NUCO2 Beer Blast System, call direct@ 800-472-2855 ext. 3028",
    "General Parts Corporate Dispatch",
    "Reddi Industries"
]

export const MainActions = () => {
    const noteFunc = useContext(GlobalContext)
    const addNote = noteFunc.createNoteWOData
    const chageInputNote = noteFunc.handleNoteInput
    let noteDescription = noteFunc.noteDescription
    const error = noteDescription === '' || noteDescription.length > 1000;
    const updateWOStatus = noteFunc.updateWOStatus
    const reassignedTo = noteFunc.handleReassignToSelect
    const reassignToVal = noteFunc.reassignToVal
    console.log('reassignToVal', reassignToVal)

    const classes = useStyles()
    const addNoteContent = <div>
                                <FormControl required error={error} component="fieldset" style={{width:'100%'}}>
                                    <FormLabel className={classes.inputLabel} component="legend">Note(1,000 character max)</FormLabel>
                                    <TextField onChange={chageInputNote} fullWidth={true} multiline={true} variant="outlined" InputProps={{ classes: { input: classes.textField } }}/>
                                </FormControl>
                                <FormControl required>
                                </FormControl>
                            </div>
    const reassignContent = <div>
                        <FormControl component="fieldset" className={classes.reassignForm} style={{width: '100%', display:'flex'}}>
                            <FormLabel className={classes.inputLabel}>Select Service Provider:</FormLabel>
                            <Select
                                labelId="assigned-to-label"
                                id="assigned-to-label"
                                className={classes.reassignSelect}
                                onChange={reassignedTo}
                                value={reassignToVal}
                                MenuProps = {{
                                    anchorOrigin: { vertical: "bottom", horizontal: "left" },
                                    transformOrigin: { vertical: "top",horizontal: "left" },
                                    getContentAnchorEl: null
                                }}
                            >
                                <MenuItem 
                                    value={1}
                                    disabled
                                >Service Providers</MenuItem>
                                {serviceProviders.map((item, index) => {
                                    return (
                                        <MenuItem 
                                            key={index}
                                            value={item}
                                        >{item}</MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                     </div>
    console.log('reassignToVal', reassignToVal)
    return (
        <Grid item xs={12} md={12} lg={4} className="action-button-grid">
            <PopupComponent buttonLabel="ADD NOTE" modalTitle="Add Notes" btn2Classes={`${classes.actionButton} action-button`} btnClasses={`${classes.actionButton} action-button`} btn1Classes={`${classes.actionButtonOutlned} action-button`} btnStartIcon={<AddNote/>} btn1Label="Cancel" btn2Func={addNote} btn2Label="Submit" MuiDialogTitle={classes.MuiDialogTitle} content={addNoteContent} />
            <PopupComponent buttonLabel="Not Fixed" modalTitle="Not Fixed" btnClasses={`${classes.actionButton} action-button`} btn2Classes={`${classes.actionButton} action-button`} btn1Classes={`${classes.actionButton} action-button`} btnStartIcon={<NotFixed/>} btn1Func={updateWOStatus} MuiDialogTitle={classes.MuiDialogTitle} content="Not fixed?" />
            <PopupComponent buttonLabel="Reassign" modalTitle="Reassign" reassignToVal={reassignToVal} btnClasses={`${classes.actionButton} action-button`} btn2Classes={`${classes.actionButton} action-button`} btn1Classes={`${classes.actionButton} action-button`} btnStartIcon={<ReAssigned/>} btn1Func={updateWOStatus} MuiDialogTitle={classes.MuiDialogTitle} content={reassignContent} />
            {/* <PopupComponent buttonLabel="Complete" modalTitle="Complete" btnClasses={`${classes.actionButton} action-button`} btn2Classes={`${classes.actionButton} action-button`} btn1Classes={`${classes.actionButton} action-button`} btnStartIcon={<Complete/>} btn1Func={updateWOStatus} MuiDialogTitle={classes.MuiDialogTitle} content="Complete?" /> */}
            <PopupComponent buttonLabel="Cancel" modalTitle="Cancel" btnClasses={`${classes.actionButton} action-button`} btn2Classes={`${classes.actionButton} action-button`} btn1Classes={`${classes.actionButton} action-button`} btnStartIcon={<Cancel/>} btn1Func={updateWOStatus} MuiDialogTitle={classes.MuiDialogTitle} content="Cancel?" />
        </Grid>
    )
}