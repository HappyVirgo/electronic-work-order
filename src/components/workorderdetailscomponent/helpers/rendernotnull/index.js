//Basic imports
import React from 'react';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

//Layouts
import {
    DetailsImageLayout,
    MainDetails,
    MainActions,
    LinkActions,
    WorkOrderDescription,
    EnhancedDetails,
    BoxedDetails,
    LocationDetails
} from '../../layouts'

const useStyles = makeStyles((theme) => ({

    locationDetails: {
        marginLeft: "50%"
    }
}));

export const RenderNotNull = ({detailsdata}) => {
    const classes = useStyles()
    //In null case
    const nullVal = null;    
    //Image Section
    let image
    //Store data to display in new array
    let assetName
    let workOrderId
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
        //Image Section
        if(detailsdata.data.work_order.asset!==null){
            let pre_image = detailsdata.data.work_order.asset.assetImage
            image = pre_image[0]!==undefined?pre_image[0]['fileName']:nullVal;
        }         
        //Short Detail Section
        if(detailsdata.data.work_order.asset!==null){
            let pre_assetName = detailsdata.data.work_order.asset
            assetName = pre_assetName!==null?detailsdata.data.work_order.asset.name:nullVal;
        }        
        if(detailsdata.data.work_order!==null){
            workOrderId = detailsdata.data.work_order.id!==null?detailsdata.data.work_order.id:nullVal;
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
            let pre_proposalStatus = detailsdata.data.work_order.proposal.proposalStatus
            proposalStatus = pre_proposalStatus!==null?detailsdata.data.work_order.proposal.proposalStatus.description:nullVal;
        }         
        //Bordered Section
        serviceProvider = detailsdata.data.work_order.serviceProviderId!==null?detailsdata.data.work_order.serviceProviderId:nullVal;
        currentEta = detailsdata.data.work_order.currentEta!==null?detailsdata.data.work_order.currentEta:nullVal;
        //Location Section
        locationAddress = detailsdata.data.work_order.location!==null?detailsdata.data.work_order.location.address1:nullVal;
        location = detailsdata.data.work_order.location!==null?detailsdata.data.work_order.location.name:nullVal;
        locationPhone = detailsdata.data.work_order.location!==null?detailsdata.data.work_order.location.phone1:nullVal;
    }        
    return(
        <div>
            <Grid container spacing={0}>
                <DetailsImageLayout
                    image={image}
                />
                <MainDetails 
                    workOrderId={workOrderId}
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
            <LinkActions />
            <Divider/>
            <Grid container spacing={0} className={classes.enhancedDetails}>
                <WorkOrderDescription
                    id={id}
                    description={description}
                    nullVal={nullVal}
                />
                <EnhancedDetails 
                    status={status}
                    priority={priority}
                    tradeType={tradeType}
                    problemType={problemType}
                    categoryType={categoryType}
                    woType={woType}
                    nte={nte}
                    nullVal={nullVal}
                />
                <BoxedDetails 
                    currentEta={currentEta}
                    serviceProvider={serviceProvider}
                    proposalStatus={proposalStatus}
                    nullVal={nullVal}
                />
                <LocationDetails
                    locationAddress={locationAddress}
                    location={location}
                    locationPhone={locationPhone}
                    nullVal={nullVal}
                />                   
            </Grid>
        </div>            
    )
}