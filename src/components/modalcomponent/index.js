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
import { Button, Divider } from '@material-ui/core';
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
        '@media (max-width: 600px)': {
            width: "80%",
            height: "100%",
        },
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    warrantyPaper: {
        height: "100%",
        overflow:'scroll',
        overflowX:'hidden',
    },
    regularPaper: {
        height: "50%",
        overflow:'scroll',
        overflowX:'hidden',
    },
    button: {
        padding: "0px 5px",
        textTransform: "capitalize",
        marginTop: "5px"
    },
    warranty: {
        // float: "right",
        // width: "75%",
        // marginTop: "-30px",      
    },
    date: {
        fontWeight: "800",
        color: "#E60042"
    },
    pad: {
        paddingLeft: "20px"
    }
}));

const ModalComponent = ({title, data, type}) => {
    const classes = useStyles();
    let ifWarranty =  type==="warranty"?classes.warranty:""
    let ifWarrantyPaper =  type==="warranty"?classes.warrantyPaper:classes.regularPaper
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

    const buttonAttachments = (
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
    let warranty1typeId
    let warranty2typeId
    let warranty3typeId
    let warranty4typeId
    let warranty1type
    let warranty2type
    let warranty3type
    let warranty4type
    let warranty1typeStatus
    let warranty2typeStatus
    let warranty3typeStatus
    let warranty4typeStatus
    let componentWarranties

    const Empty = ""
    if(type==="document") {
        description = data['type']?data['type']['description']:Empty
        typeOf = data['type']?data['type']['type']:Empty
        createdDate = data['createdAt']?data['createdAt']:Empty  
        updatedDate = data['updatedAt']?data['updatedAt']:Empty  
        imageFile = data['fileName']?data['fileName']:Empty  
        imageTitle = data['documentId']?data['documentId']:Empty   
        referenceID = data['referenceId']?data['referenceId']:Empty   
        createdDate = data['dateCreated']?data['dateCreated']:Empty
        updatedDate = data['dateUpdated']?data['dateUpdated']:Empty
    } else if (type==="history") {
        phone = data['user']?data['user']['phoneNumber']:Empty  
        historyNote = data['note']?data['note']:Empty
        updatedDate = data['updatedDate']?data['updatedDate']:Empty
        company = data['user']?data['companyName']:Empty
    } else if (type==="warranty") { 
        assetID = data['warranty']?data['warranty']['assetId']:Empty
        warrantyPeriod1 = data['warranty']?data['warranty']['warrantyPeriod1']:Empty
        warrantyPeriod2 = data['warranty']?data['warranty']['warrantyPeriod2']:Empty
        warrantyPeriod3 = data['warranty']?data['warranty']['warrantyPeriod3']:Empty
        warrantyPeriod4 = data['warranty']?data['warranty']['warrantyPeriod4']:Empty
        warrantyExpiryDate = data['warranty']?data['warranty']['warrantyExpiryDate']:Empty
        warrantyStartFromDate = data['warranty']?data['warranty']['warrantyStartFromDate']:Empty
        warrantyNte = data['warranty']?data['warranty']['warrantyNte']:Empty
        warrantyStatusId = data['warranty']?data['warranty']['warrantyStatusId']:Empty
        warranty1typeId = data['warranty']?(data['warranty']['warranty1']?data['warranty']['warranty1']['warrantyTypeId']:Empty):Empty
        warranty2typeId = data['warranty']?(data['warranty']['warranty2']?data['warranty']['warranty1']['warrantyTypeId']:Empty):Empty
        warranty3typeId = data['warranty']?(data['warranty']['warranty3']?data['warranty']['warranty1']['warrantyTypeId']:Empty):Empty
        warranty4typeId = data['warranty']?(data['warranty']['warranty4']?data['warranty']['warranty1']['warrantyTypeId']:Empty):Empty
        warranty1type = data['warranty']?(data['warranty']['warranty1']?data['warranty']['warranty1']['warrantyType']:Empty):Empty
        warranty2type = data['warranty']?(data['warranty']['warranty2']?data['warranty']['warranty2']['warrantyType']:Empty):Empty
        warranty3type = data['warranty']?(data['warranty']['warranty3']?data['warranty']['warranty3']['warrantyType']:Empty):Empty
        warranty4type = data['warranty']?(data['warranty']['warranty4']?data['warranty']['warranty4']['warrantyType']:Empty):Empty
        warranty1typeStatus = data['warranty']?(data['warranty']['warranty1']?data['warranty']['warranty1']['status']:Empty):Empty
        warranty2typeStatus = data['warranty']?(data['warranty']['warranty2']?data['warranty']['warranty2']['status']:Empty):Empty
        warranty3typeStatus = data['warranty']?(data['warranty']['warranty3']?data['warranty']['warranty3']['status']:Empty):Empty
        warranty4typeStatus = data['warranty']?(data['warranty']['warranty4']?data['warranty']['warranty4']['status']:Empty):Empty  
        componentWarranties =  data['warranty']?data['warranty']['componentWarranties']:Empty             
    } else {
        if (data['wonNote']) {
            describer = "Work Order Note"
            description = data['wonNote']?data['wonNote']:Empty
            createdDate = data['createdAt']?data['createdAt']:Empty
            updatedDate = data['updatedAt']?data['updatedAt']:Empty
            company = data['user']['companyName']?data['user']['companyName']:Empty
            firstName = data['user']['firstName']?data['user']['firstName']:Empty
            lastName = data['user']['lastName']?data['user']['lastName']:Empty
        } else if (data['pnote']) {
            describer = "Proposal Note"
            description = data['pnote']?data['pnote']:Empty
            createdDate = data['dateCreated']?data['dateCreated']:Empty
            updatedDate = data['dateUpdated']?data['dateUpdated']:Empty
            company = data['user']['companyName']?data['user']['companyName']:Empty
            firstName = data['user']['firstName']?data['user']['firstName']:Empty
            lastName = data['user']['lastName']?data['user']['lastName']:Empty       
        } else {
            describer = "Invoice Note"
            description = data['invNote']?data['invNote']:Empty  
            createdDate = data['createdAt']?data['createdAt']:Empty  
            updatedDate = data['updatedAt']?data['updatedAt']:Empty  
            company = data['user']?data['user']['companyName']:Empty  
            firstName = data['user']?data['user']['firstName']:Empty   
            lastName = data['user']?data['user']['lastName']:Empty  
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
    
    const linkButton = (
        <Button onClick={() => {
            let url = `${imageURL}${imageFile}`;
            let img = '<img src="'+url+'" alt="'+imageTitle+'">';
            let m_title = "Attachments";
            let header = '<html><head><title>' + m_title + '</title></head><body height="100%" width="100%">'
            let popup = window.open();
            popup.document.write(header);
            popup.document.write(img);
            popup.document.write('</body></html>');                     
            popup.document.close();
        }} variant="outlined" color="secondary" className={classes.button}>More Details</Button>
        
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
    //Converting object into array in order to use map()
    const componentWarrantiesArray = componentWarranties?Object.entries(componentWarranties):[];
    const bodyWarranty = (
        <Grid container style={modalStyle} className={`${classes.paper} ${ifWarrantyPaper}`}>
            <Grid item xs={12} md={12} lg={6}>
                <h2 id="simple-modal-title">Warranty</h2> 
                <p><strong>Asset ID: </strong>{assetID}</p>
                <p><strong>Warranty Expiry Date: </strong><span className={classes.date}><Moment format="MMMM D, YYYY hh:mm a">{warrantyExpiryDate}</Moment></span></p>     
                <p><strong>warranty Start from Date: </strong>{warrantyStartFromDate}</p>  
                <p><strong>Warranty Nte: </strong>$ {warrantyNte}</p>  
                <p><strong>Warranty Status Id: </strong>{warrantyStatusId}</p>
                <Divider />
                <p><strong>Warranty Period 1: </strong>{warrantyPeriod1}</p>
                <p><strong>Warranty Type: </strong>{warranty1type}</p>
                <p><strong>Warranty Type Id: </strong>{warranty1typeId}</p>
                <p><strong>Warranty Status: </strong>{warranty1typeStatus}</p>
                <Divider/>
                <p><strong>Warranty Period 2: </strong>{warrantyPeriod2}</p> 
                <p><strong>Warranty Type: </strong>{warranty2type}</p>
                <p><strong>Warranty Type Id: </strong>{warranty2typeId}</p>
                <p><strong>Warranty Status: </strong>{warranty2typeStatus}</p>                   
                <Divider/>
                <p><strong>Warranty Period 3: </strong>{warrantyPeriod3}</p>
                <p><strong>Warranty Type: </strong>{warranty3type}</p>
                <p><strong>Warranty Type Id: </strong>{warranty3typeId}</p>
                <p><strong>Warranty Status: </strong>{warranty3typeStatus}</p>                   
                <Divider/>
                <p><strong>Warranty Period 4: </strong>{warrantyPeriod4}</p>
                <p><strong>Warranty Type: </strong>{warranty4type}</p>
                <p><strong>Warranty Type Id: </strong>{warranty4typeId}</p>
                <p><strong>Warranty Status: </strong>{warranty4typeStatus}</p>
            </Grid>
            <Grid item xs={12} md={12} lg={6} className={classes.pad}>
                <h2 id="simple-modal-title">Component Warranties</h2>                   
                {componentWarrantiesArray.map((item) => {
                    return (
                        <Grid key={item[0]}>
                            <p><strong>Warranty Period: </strong>{item[1]['warrantyPeriodType']}</p> 
                            <p><strong>Warranty Period Type: </strong>{item[1]['warrantyPeriodType']}</p> 
                            <p><strong>Component Warranty Id: </strong>{item[1]['componentWarrantyId']}</p> 
                            <p><strong>Invoice Id: </strong>{item[1]['invoiceId']}</p> 
                            <p><strong>Asset Id: </strong>{item[1]['assetId']}</p> 
                            <p><strong>Service Provider Id: </strong>{item[1]['serviceProviderId']}</p> 
                            <p><strong>Asset Failure TypeId: </strong>{item[1]['assetFailureTypeId']}</p> 
                            <p><strong>Status: </strong>{item[1]['status']}</p>
                            <p><strong>Date Created: </strong><span className={classes.date}><Moment format="MMMM D, YYYY hh:mm a">{item[1]['dateCreated']}</Moment></span></p> 
                            <p><strong>Date Updated: </strong><span className={classes.date}><Moment format="MMMM D, YYYY hh:mm a">{item[1]['dateUpdated']}</Moment></span></p>                        
                            <Divider />                       
                        </Grid>
                    )
                })}
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
        button = linkButton
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
