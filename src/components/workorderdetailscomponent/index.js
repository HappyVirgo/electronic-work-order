/**
 * Description: Create WO Details Component
 * Author: Carlos Blanco
 * Created: 9/8/2020
 * Ticket: ET-253
 */

//Basic Imports
import React from 'react';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import Skeleton from '@material-ui/lab/Skeleton';
import CircularProgress from '@material-ui/core/CircularProgress';


//Layouts
import { Details } from './layouts' 


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: "100%",
        minWidth: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "30px 25px 10px 25px",
        boxShadow: "none",
        borderRadius: "0px"
    }
}));

const WorkOrderDetailsComponent = ({detailsdata, history, attachments, notes, warranty, serviceProviders, loadingDetails, firstLoading, tmpDataAmount}) => {
    const classes = useStyles()
    return (
        <>
        {firstLoading?(
            <div>
                <Skeleton variant="text" />
                <Skeleton variant="circle" width={40} height={40} />
                <Skeleton variant="rect" height={210} />
            </div>
        ):(
            <div className="details-container">
                <Paper className={classes.paper}>
                    {loadingDetails && <div className="loading-container">
                        <CircularProgress />
                    </div>}
                    {!tmpDataAmount?(<div style={{display: 'flex', justifyContent: 'center'}}>No Available Details</div>):(
                        <Details 
                            detailsdata={detailsdata}
                            //history={history} 
                            attachments={attachments} 
                            notes={notes}
                            warranty={warranty}
                            serviceProviders={serviceProviders}
                        />
                    )}
                </Paper>
            </div>
        )}
        </>
    );
};

export default React.memo(WorkOrderDetailsComponent);