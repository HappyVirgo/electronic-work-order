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
import Grid from '@material-ui/core/Grid';

//Date format
import Moment from 'react-moment';

//Helpers
import {
    getModalStyle
} from './helpers'


const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: "50%",
        height: "auto",
        '@media (max-width: 600px)': {
            width: "80%",
            height: "auto",
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
    },
    warranty: {
        float: "right",
        width: "75%",
        marginTop: "-30px"
    },
    date: {
        fontWeight: "800",
        color: "#E60042"
    }
}));

const ModalComponent = ({title, data, type}) => {
    const classes = useStyles();
    let ifWarranty =  type==="warranty"?classes.warranty:""
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    //Button variations
    const buttonWarranty = (
        <Button variant="text" color="secondary" onClick={handleOpen} className={classes.button}>
            <span className="icon_warranty"></span><strong>{title}</strong>
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
    let imageFile
    let imageTitle
    let referenceID
    let assetID
    let warrantyPeriod1
    let warrantyPeriod2
    let warrantyPeriod3
    let warrantyPeriod4
    let warrantyExpiryDate
    let warrantyStartFromDate
    let warrantyNte
    let warrantyStatusId
    let warranty1
    let warranty2
    let warranty3
    let warranty4
    const Empty = ""
    if(type==="document") {
        description = data['type']!==undefined?data['type']['description']:Empty
        typeOf = data['type']!==undefined?data['type']['type']:Empty
        createdDate = data['createdAt']!==undefined?data['createdAt']:Empty  
        updatedDate = data['updatedAt']!==undefined?data['updatedAt']:Empty  
        imageFile = data['fileName']!==undefined?data['fileName']:Empty  
        imageTitle = data['documentId']!==undefined?data['documentId']:Empty   
        referenceID = data['referenceId']!==undefined?data['referenceId']:Empty   
        createdDate = data['dateCreated']!==undefined?data['dateCreated']:Empty
        updatedDate = data['dateUpdated']!==undefined?data['dateUpdated']:Empty
    } else if (type==="history") {
        phone = data['user']!==undefined?data['user']['phoneNumber']:Empty  
        historyNote = data['note']!==undefined?data['note']:Empty
        updatedDate = data['updatedDate']!==undefined?data['updatedDate']:Empty
        company = data['user']!==undefined?data['companyName']:Empty
    } else if (type==="warranty") { 
        assetID = data['warranty']!==undefined?data['warranty']['assetId']:Empty
        warrantyPeriod1 = data['warranty']!==undefined?data['warranty']['warrantyPeriod1']:Empty
        warrantyPeriod2 = data['warranty']!==undefined?data['warranty']['warrantyPeriod2']:Empty
        warrantyPeriod3 = data['warranty']!==undefined?data['warranty']['warrantyPeriod3']:Empty
        warrantyPeriod4 = data['warranty']!==undefined?data['warranty']['warrantyPeriod4']:Empty
        warrantyExpiryDate = data['warranty']!==undefined?data['warranty']['warrantyExpiryDate']:Empty
        warrantyStartFromDate = data['warranty']!==undefined?data['warranty']['warrantyStartFromDate']:Empty
        warrantyNte = data['warranty']!==undefined?data['warranty']['warrantyNte']:Empty
        warrantyStatusId = data['warranty']!==undefined?data['warranty']['warrantyStatusId']:Empty
        warranty1 = data['warranty']!==undefined?data['warranty']['warranty1']:Empty
        warranty1 = data['warranty']!==undefined?data['warranty']['warranty1']:Empty
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
        <Grid style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">{describer}</h2>
                <p id="simple-modal-description">
                    {description}
                </p>
                <p><strong>Company: </strong>{company}</p>
                <p><strong>Name: </strong>{firstName} {lastName}</p>  
                <p><strong>Created At: </strong><span className={classes.date}><Moment format="MMMM D, YYYY hh:mm a">{createdDate}</Moment></span></p>
                <p><strong>Updated At: </strong><span className={classes.date}><Moment format="MMMM D, YYYY hh:mm a">{updatedDate}</Moment></span></p>                              
        </Grid>
    )
    
    //Attachments
    const imageURL = "https://ecotrak-documents-production.s3.us-east-2.amazonaws.com/img/uploads/photos/cache/80x80/100/portrait/"
    const bodyAttachments = (
        <Grid style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">{description}</h2>
            <img src={`${imageURL}${imageFile}`} alt={imageTitle}/>
            <p><strong>Reference ID: </strong>{referenceID}</p>
            <p><strong>Type: </strong>{typeOf}</p>  
            <p><strong>Created At: </strong><span className={classes.date}><Moment format="MMMM D, YYYY hh:mm a">{createdDate}</Moment></span></p>
            <p><strong>Updated At: </strong><span className={classes.date}><Moment format="MMMM D, YYYY hh:mm a">{updatedDate}</Moment></span></p>               
        </Grid>
    )  
    
    //History
    const bodyHistory = (
        <Grid style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">History</h2>
            <p><strong>Phone: </strong>{phone}</p>
            <p><strong>Note: </strong>{historyNote}</p>  
            <p><strong>Company: </strong><span className={classes.date}><Moment format="MMMM D, YYYY hh:mm a">{company}</Moment></span></p>
            <p><strong>Updated At: </strong><span className={classes.date}><Moment format="MMMM D, YYYY hh:mm a">{updatedDate}</Moment></span></p>               
        </Grid>
    )

    //Warranty
    const bodyWarranty = (
        <Grid container style={modalStyle} className={classes.paper}>
            <Grid item xs={12} md={12} lg={6}>
                <h2 id="simple-modal-title">Warranty</h2> 
                <p><strong>Asset ID: </strong>{assetID}</p>
                <p><strong>Warranty Period1: </strong>{warrantyPeriod1}</p>
                <p><strong>Warranty Period2: </strong>{warrantyPeriod2}</p>  
                <p><strong>Warranty Period3: </strong>{warrantyPeriod3}</p>
                <p><strong>Warranty Period4: </strong>{warrantyPeriod4}</p> 
                <p><strong>Warranty Expiry Date: </strong><span className={classes.date}><Moment format="MMMM D, YYYY hh:mm a">{warrantyExpiryDate}</Moment></span></p>     
                <p><strong>warranty Start from Date: </strong>{warrantyStartFromDate}</p>  
                <p><strong>Warranty Nte: </strong>$ {warrantyNte}</p>  
                <p><strong>Warranty Status Id: </strong>{warrantyStatusId}</p>  
            </Grid>
            <Grid item xs={12} md={12} lg={6} className="cta-section">
                <p><strong>Asset ID: </strong>{assetID}</p>
                <p><strong>Warranty Period1: </strong>{warrantyPeriod1}</p>
                <p><strong>Warranty Period2: </strong>{warrantyPeriod2}</p>  
                <p><strong>Warranty Period3: </strong>{warrantyPeriod3}</p>
                <p><strong>Warranty Period4: </strong>{warrantyPeriod4}</p>   
            </Grid>
        </Grid>        
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
    <Grid className={ifWarranty}>
        {button}        
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"         
        >
        {body}
        </Modal>
    </Grid>
    );
}

export default React.memo(ModalComponent)
