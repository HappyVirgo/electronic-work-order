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
    },
    paper: {
        height: "100%",
        minWidth: "640px",
        display: "flex",
        flexDirection: "column",
        padding: "30px 25px 10px 25px",
        boxShadow: "none",
        borderRadius: "0px"
    },
    actionButtonGrid:{
        width: '160px',
    },
    actionButton:{
        color: "#FFFFFF",
        margin: '3px 0',
        backgroundColor: '#0072CE',
        fontWeight: 'bold',
        width: '150px',
        height: '32px',
        fontSize: '13px',
        borderRadius: 16,
        '&:hover': {
            backgroundColor: '#54A6DA',
            borderColor: '#0072CE',
            boxShadow: 'none',
        }

    },
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
    null: {
        padding: "25px"
    },
    locationDetails: {
        marginLeft: "50%"
    }
}));

export const Details = ({detailsdata}) => {
    const classes = useStyles()
    
    return (
    <div className={`${classes.root} work-order-details-component`}>
        {(detailsdata!==undefined)?(detailsdata.data.work_order!==null?<RenderNotNull detailsdata={detailsdata} />:<RenderNull />):""}
    </div>
)}
