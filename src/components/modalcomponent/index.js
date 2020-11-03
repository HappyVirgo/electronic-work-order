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

const ModalComponent = ({data, type}) => {
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
    
    console.log(data)
    console.log(type)

    //Notes
    let describer
    let description
    let createdDate
    let updatedDate
    let company
    let firstName
    let lastName

    const Empty = ""
    if(type==="document") {
        
    } else if (type==="history") {
        //description = data['type']['description']!==undefined?data['type']['description']:Empty  
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
            <h2 id="simple-modal-title">{data['type']!==undefined?data['type']['description']:Empty}</h2>
            <img src={`${imageURL}${data['fileName']}`} alt={data['documentId']!==undefined?data['documentId']:""}/>
            <p><strong>Reference ID: </strong>{data['referenceId']!==undefined?data['referenceId']:""}</p>
            <p><strong>Type: </strong>{/*data['type']['type']!==undefined?data['type']['type']:""*/}</p>  
            <p><strong>Created At: </strong><Moment format="MMMM D, YYYY hh:mm a">{data['dateCreated']!==undefined?data['dateCreated']:""}</Moment></p>
            <p><strong>Updated At: </strong><Moment format="MMMM D, YYYY hh:mm a">{data['dateUpdated']!==undefined?data['dateUpdated']:""}</Moment></p>               
        </div>
    )  
    
    //History
    const bodyHistory = (
        <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">History {/*description*/}</h2>
            <img src={`${imageURL}${data['fileName']}`} alt={data['documentId']}/>
            <p><strong>Reference ID: </strong>{data['referenceId']}</p>
            <p><strong>Type: </strong>{/*data['type']['type']*/}</p>  
            <p><strong>Created At: </strong><Moment format="MMMM D, YYYY hh:mm a">{data['dateCreated']}</Moment></p>
            <p><strong>Updated At: </strong><Moment format="MMMM D, YYYY hh:mm a">{data['dateUpdated']}</Moment></p>               
        </div>
    )
    let body
    if (type==="document") {
        body = bodyAttachments
    } else if (type==="history") {
        body = bodyHistory
    } else {
        body = bodyNotes
    }
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
