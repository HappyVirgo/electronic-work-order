//Basic imports
import React from 'react';
import Moment from 'react-moment';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

//Layouts
import {
    DetailsImageLayout,
    MainDetails,
    MainActions,
} from '../../layouts'

const useStyles = makeStyles((theme) => ({
    linkButtonGrid:{
        margin: '60px 0px 20px 0px'
    },
    linkButton:{
        color: "#0072CE",
        margin: '0 5px',
        backgroundColor: '#F4F8FE',
        fontWeight: 'bold',
        width: '23%',
        height: '30px',
        fontSize: '11px',
        borderRadius: 15,
        '&:hover': {
            backgroundColor: '#54A6DA',
            borderColor: '#0072CE',
            boxShadow: 'none',
            color: "#FFFFFF",
        }

    },
    enhancedDetails: {
        marginTop: '30px'
    },
    etaSection: {
        border: "1px solid #000"
    },
    locationDetails: {
        marginLeft: "50%"
    }
}));

export const RenderNotNull = ({detailsdata}) => {
    const classes = useStyles()
    //In null case
    const nullVal = "null";    
    //Store data to display in new array
    let assetName
    let woType
    let manufacturer
    let model
    let serial
    let assetType
    let warranty
    //Enhanced Section
    let id
    let description
    let status
    let priority
    let tradeType
    let problemType
    let categoryType
    let nte
    //Border Section
    let currentEta
    let serviceProvider
    //Location Section
    let locationAddress
    let location
    let locationPhone
    //To be defined
    let proposalStatus    

    if(detailsdata!==undefined){
        //Short Detail Section
        if(detailsdata.data.work_order.asset!==null){
            let pre_assetName = detailsdata.data.work_order.asset
            assetName = pre_assetName!==null?detailsdata.data.work_order.asset.name:nullVal;
        }        
        woType = detailsdata.data.work_order.asset!==null?detailsdata.data.work_order.woType:nullVal;
        if(detailsdata.data.work_order.asset!==null){
            let pre_manufacturer = detailsdata.data.work_order.asset.manufacturer
            manufacturer = pre_manufacturer!==null?detailsdata.data.work_order.asset.manufacturer.companyName:nullVal;
        }
        model = detailsdata.data.work_order.asset!==null?detailsdata.data.work_order.asset.modelNumber:nullVal;
        serial = detailsdata.data.work_order.asset!==null?detailsdata.data.work_order.asset.serialNumber:nullVal;
        assetType = detailsdata.data.work_order.assetType!==null?detailsdata.data.work_order.assetType.name:nullVal;
        warranty = detailsdata.data.work_order.asset!==null?detailsdata.data.work_order.warrantyAvailable:nullVal;
        //Enhanced Section
        id = detailsdata.data.work_order.id!==null?detailsdata.data.work_order.id:nullVal;
        description = detailsdata.data.work_order.description!==null?detailsdata.data.work_order.description:nullVal;
        status = detailsdata.data.work_order.workOrderStatus!==null?detailsdata.data.work_order.workOrderStatus:nullVal;
        priority = detailsdata.data.work_order.priority!==null?detailsdata.data.work_order.priority.name:nullVal;
        tradeType = detailsdata.data.work_order.tradeType!==null?detailsdata.data.work_order.tradeType:nullVal;
        problemType = detailsdata.data.work_order.problemType!==null?detailsdata.data.work_order.problemType.name:nullVal;
        categoryType = detailsdata.data.work_order.categoryType!==null?detailsdata.data.work_order.categoryType.name:nullVal;
        nte = detailsdata.data.work_order.nte!==null?detailsdata.data.work_order.nte:nullVal;
        if(detailsdata.data.work_order.proposal!==null){
            let pre_proposalStatus = detailsdata.data.work_order.proposal
            proposalStatus = pre_proposalStatus!==null?detailsdata.data.work_order.proposal.title:nullVal;
        }         
        //Bordered Section
        serviceProvider = detailsdata.data.work_order.serviceProviderId!==null?detailsdata.data.work_order.priority.serviceProviderId:nullVal;
        currentEta = detailsdata.data.work_order.currentEta!==null?detailsdata.data.work_order.currentEta:nullVal;
        //Location Section
        locationAddress = detailsdata.data.work_order.location!==null?detailsdata.data.work_order.location.address1:nullVal;
        location = detailsdata.data.work_order.location!==null?detailsdata.data.work_order.location.name:nullVal;
        locationPhone = detailsdata.data.work_order.location!==null?detailsdata.data.work_order.location.phone1:nullVal;
    }        
    return(
        <div>
            <Grid container spacing={0}>
                <DetailsImageLayout />
                <MainDetails 
                    assetName={assetName}
                    woType={woType}
                    manufacturer={manufacturer}
                    model={model}
                    serial={serial}
                    assetType={assetType}
                    warranty={warranty}
                    nullVal={nullVal}
                />
                <MainActions />
            </Grid>
            <Grid className={classes.linkButtonGrid}>
                <Button variant="contained" color="primary" className={classes.linkButton} >Work Order</Button>
                <Button variant="contained" color="primary" className={classes.linkButton} >Asset</Button>
                <Button variant="contained" color="primary" className={classes.linkButton} >Invoice</Button>
                <Button variant="contained" color="primary" className={classes.linkButton} >Proposal</Button>
            </Grid>
            <Divider/>
            <Grid container spacing={0} className={classes.enhancedDetails}>
                <Grid item xs={12}>
                    <h1>Work Order: {id!==null?id:nullVal}</h1>
                    <p>{description!==null?description:nullVal}</p>                    
                </Grid>
                <Grid item xs={6}>
                    <p><b>Status: </b>{status!==null?status:nullVal}</p>
                    <p><b>Priority: </b>{priority!==null?priority:nullVal}</p>
                    <p><b>Trade Type: </b>{tradeType!==null?tradeType:nullVal}</p>
                    <p><b>Problem Type: </b>{problemType!==null?problemType:nullVal}</p>
                    <p><b>Category: </b>{categoryType!==null?categoryType:nullVal}</p>
                    <p><b>WO Type: </b>{woType!==null?woType:nullVal}</p>
                    <p><b>NTE: </b>${nte!==null?nte:nullVal}</p>
                </Grid>
                <Grid item xs={6} className={classes.etaSection}>
                    <p><b>Current ETA: </b><Moment format="MMMM D, YYYY hh:mm a">{currentEta!==null?currentEta:nullVal}</Moment></p>
                    <p><b>Service Provider: </b>{serviceProvider!==null?serviceProvider:nullVal}</p>
                    <p><b>Assigned To: </b>N/A</p>
                    <p><b>Proposal Status: </b>{proposalStatus!==null?proposalStatus:nullVal}</p>
                    <p><b>Invoice Status: </b>{proposalStatus!==null?proposalStatus:nullVal}</p>                    
                </Grid>

                <Grid container className={classes.locationDetails}>
                    <Grid item xs={3}>
                        <b>Location Details: </b>
                    </Grid>
                    <Grid item xs={3}>
                        <p>
                        {locationAddress!==null?locationAddress:nullVal}<br/>
                        {location!==null?location:nullVal}<br/>
                        {locationPhone!==null?locationPhone:nullVal}
                        </p>
                    </Grid>               
                </Grid>                   
            </Grid>
        </div>            
    )
}