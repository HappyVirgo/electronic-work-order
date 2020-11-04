/**
 * Description: Create Modal Component
 * Author: Carlos Blanco
 * Created: 9/18/2020
 * Ticket: ET-255
 */
//Basic imports
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

//Material UI
import { Button } from '@material-ui/core';

//Date format
import Moment from 'react-moment';

//Helpers
import {
    getModalStyle
} from './helpers'


const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: "40%",
        height: "40%",
        '@media (max-width: 600px)': {
            width: "80%",
            height: "80%",
        },
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    button: {
        padding: "0px 5px",
        textTransform: "capitalize",
        marginTop: "5px"
    }
}));

const ModalComponent = ({title, data, type}) => {
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

    const buttonWarranty = (
        <Button variant="outlined" color="secondary" onClick={handleOpen} className={classes.button}>
            <strong>{title}</strong>
        </Button>        
    ) 

    const buttonRegular = (
        <Button variant="outlined" color="secondary" onClick={handleOpen} className={classes.button}>
            More details
        </Button>
    )     
    //vars
    let describer
    let description
    let createdDate
    let updatedDate
    let company
    let firstName
    let lastName
    let typeOf
    let historyNote
    let phone

    const Empty = ""
    if(type==="document") {
        description = data['type']!==undefined?data['type']['description']:Empty
        typeOf = data['type']!==undefined?data['type']['type']:Empty
        createdDate = data['createdAt']!==undefined?data['createdAt']:Empty  
        updatedDate = data['updatedAt']!==undefined?data['updatedAt']:Empty          
    } else if (type==="history") {
        phone = data['user']!==undefined?data['user']['phoneNumber']:Empty  
        historyNote = data['note']!==undefined?data['note']:Empty
        updatedDate = data['updatedDate']!==undefined?data['updatedDate']:Empty
        company = data['user']!==undefined?data['companyName']:Empty
    } else if (type==="warranty") { 

    } else {
        if (data['wonNote']) {
            describer = "Work Order Note"
            description = data['wonNote']!==undefined?data['wonNote']:Empty
            createdDate = data['createdAt']!==undefined?data['createdAt']:Empty
            updatedDate = data['updatedAt']!==undefined?data['updatedAt']:Empty
            company = data['user']['companyName']!==undefined?data['user']['companyName']:Empty
            firstName = data['user']['firstName']!==undefined?data['user']['firstName']:Empty
            lastName = data['user']['lastName']!==undefined?data['user']['lastName']:Empty
        } else if (data['pnote']) {
            describer = "Proposal Note"
            description = data['pnote']!==undefined?data['pnote']:Empty
            createdDate = data['createdAt']!==undefined?data['createdAt']:Empty
            updatedDate = data['updatedAt']!==undefined?data['updatedAt']:Empty
            company = data['user']['companyName']!==undefined?data['user']['companyName']:Empty
            firstName = data['user']['firstName']!==undefined?data['user']['firstName']:Empty
            lastName = data['user']['lastName']!==undefined?data['user']['lastName']:Empty       
        } else {
            describer = "Invoice Note"
            description = data['invNote']!==undefined?data['invNote']:Empty  
            createdDate = data['createdAt']!==undefined?data['createdAt']:Empty  
            updatedDate = data['updatedAt']!==undefined?data['updatedAt']:Empty  
            company = data['user']!==undefined?data['user']['companyName']:Empty  
            firstName = data['user']!==undefined?data['user']['firstName']:Empty   
            lastName = data['user']!==undefined?data['user']['lastName']:Empty  
        }
    }

    //Notes
    const bodyNotes = (
        <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">{describer}</h2>
                <p id="simple-modal-description">
                    {description}
                </p>
                <p><strong>Company: </strong>{company}</p>
                <p><strong>Name: </strong>{firstName} {lastName}</p>  
                <p><strong>Created At: </strong><Moment format="MMMM D, YYYY hh:mm a">{createdDate}</Moment></p>
                <p><strong>Updated At: </strong><Moment format="MMMM D, YYYY hh:mm a">{updatedDate}</Moment></p>                              
        </div>
    )
    
    //Attachments
    const imageURL = "https://ecotrak-documents-production.s3.us-east-2.amazonaws.com/img/uploads/photos/cache/80x80/100/portrait/"
    const bodyAttachments = (
        <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">{description}</h2>
            <img src={`${imageURL}${data['fileName']!==undefined?data['fileName']:Empty}`} alt={data['documentId']!==undefined?data['documentId']:Empty}/>
            <p><strong>Reference ID: </strong>{data['referenceId']!==undefined?data['referenceId']:Empty}</p>
            <p><strong>Type: </strong>{typeOf}</p>  
            <p><strong>Created At: </strong><Moment format="MMMM D, YYYY hh:mm a">{data['dateCreated']!==undefined?data['dateCreated']:Empty}</Moment></p>
            <p><strong>Updated At: </strong><Moment format="MMMM D, YYYY hh:mm a">{data['dateUpdated']!==undefined?data['dateUpdated']:Empty}</Moment></p>               
        </div>
    )  
    
    //History
    const bodyHistory = (
        <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">History</h2>
            <p><strong>Phone: </strong>{phone}</p>
            <p><strong>Note: </strong>{historyNote}</p>  
            <p><strong>Company: </strong><Moment format="MMMM D, YYYY hh:mm a">{company}</Moment></p>
            <p><strong>Updated At: </strong><Moment format="MMMM D, YYYY hh:mm a">{updatedDate}</Moment></p>               
        </div>
    )

    //Warranty
    const bodyWarranty = (
        <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">Warranty</h2>         
        </div>
    )

    //Check for types to assign values to "body" layouts   
    let button
    let body
    if (type==="warranty") {
        body = bodyWarranty
        button = buttonWarranty
    } else if (type==="document") {
        body = bodyAttachments
        button = buttonRegular
    } else if (type==="history") {
        body = bodyHistory
        button = buttonRegular
    } else {
        body = bodyNotes
        button = buttonRegular
    }
    return (
    <div>
        {button}        
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
