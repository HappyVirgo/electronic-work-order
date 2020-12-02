//Basic imports
import React from 'react';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
    linkButtonGrid:{
        margin: '60px 0px 20px 0px',
    },
    linkButton:{
        color: "#0072CE",
        margin: '0 5px',
        backgroundColor: '#F4F8FE',
        fontWeight: 'bold',
        width: '23%',
        height: '30px',
        fontSize: '11px',
        borderRadius: '15px !important',
        '&:hover': {
            backgroundColor: '#54A6DA',
            borderColor: '#0072CE',
            boxShadow: 'none',
            color: "#FFFFFF",
        }

    },
}));

const api_url = "https://radstuff.ecotrak.com/admin/";

export const LinkActions = ({workOrderId}) => {
    const classes = useStyles()
    return (
        <Grid className={`${classes.linkButtonGrid} link-button-grid`}>
            <Button
                variant="contained"
                color="primary" 
                className={`${classes.linkButton} link-button`} 
                onClick={
                    () => {
                        window.open(`${api_url}WorkOrders/work_order_details/${workOrderId}`, "_blank")
                    }
                }
            >
                Work Order
            </Button>
            <Button variant="contained" color="primary" className={`${classes.linkButton} link-button`} >Asset</Button>

            <Button
                variant="contained" 
                color="primary" 
                className={`${classes.linkButton} link-button`} 
                onClick={

                    () => window.open(`${api_url}Invoices/details/${workOrderId}`, "_blank")
                }
            >
                Invoice
            </Button>
            <Button variant="contained" color="primary" className={`${classes.linkButton} link-button`} >Proposal</Button>
        </Grid>
    )
}
