//Basic imports
import React from 'react';

//Material UI
import { makeStyles } from '@material-ui/core/styles';

//Layouts
import {
    RenderNull,
    RenderNotNull
} from '..'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    }
}));
//export const Details = ({detailsdata, history, attachments, notes, warranty, serviceProviders}) => {
export const Details = ({detailsdata, attachments, notes, warranty, serviceProviders}) => {
    const classes = useStyles()
    
    return (
    <div className={`${classes.root} work-order-details-component`}>
        {(detailsdata!==undefined)?(detailsdata.data.work_order!==null?<RenderNotNull 
            detailsdata={detailsdata} 
            //history={history} 
            attachments={attachments} 
            notes={notes} warranty={warranty} 
            serviceProviders={serviceProviders} 
            />:<RenderNull />):""}
    </div>
)}
