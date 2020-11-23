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

const WorkOrderDetailsComponent = ({detailsdata, history, attachments, notes, warranty, loading}) => {
    const classes = useStyles()
    return (
        <div className="details-container">
            {loading && <div className="loading-container">
                <CircularProgress />
            </div>}
            <Paper className={classes.paper}>
                <Details 
                    detailsdata={detailsdata}
                    history={history} 
                    attachments={attachments} 
                    notes={notes}
                    warranty={warranty}
                />
            </Paper>
        </div>
    );
};

export default React.memo(WorkOrderDetailsComponent);