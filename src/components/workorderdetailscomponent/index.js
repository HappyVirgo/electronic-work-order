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

//Layouts
import { Details } from './layouts' 


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: "auto",
        minWidth: "auto",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "30px 25px 10px 25px",
        boxShadow: "none",
        borderRadius: "0px"
    }
}));

const WorkOrderDetailsComponent = ({detailsdata, history, attachments, notes}) => {
    const classes = useStyles()
    return (
        <div className="details-container">
            <Paper className={classes.paper}>
                <Details 
                    detailsdata={detailsdata}
                    history={history} 
                    attachments={attachments} 
                    notes={notes}
                />
            </Paper>
        </div>
    );
};

export default React.memo(WorkOrderDetailsComponent);