/**
 * Description: Create Modal Component
 * Author: Carlos Blanco
 * Created: 9/18/2020
 * Ticket: ET-255
 */

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

//Material UI
import { Button } from '@material-ui/core';

//Helpers
import {
    getModalStyle
} from './helpers'

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    button: {
        padding: "0px 5px",
        textTransform: "capitalize"
    }
}));

const ModalComponent = ({data}) => {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    let describer
    let description

    if (data['wonNote']) {
        describer = "Work Order Note"
        description = data['wonNote']
    } else if (data['pnote']) {
        describer = "Proposal Note"
        description = data['pnote']
    } else {
        describer = "Invoice Note"
        description = data['invNote']
    }    

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">{describer}</h2>
                <p id="simple-modal-description">
                    {description}
                </p>
        </div>
    )

    return (
    <div>
        <Button variant="outlined" color="secondary" onClick={handleOpen} className={classes.button}>
            More details
        </Button>        
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"          
        >
            {body}
        </Modal>
    </div>
    );
}

export default React.memo(ModalComponent)
