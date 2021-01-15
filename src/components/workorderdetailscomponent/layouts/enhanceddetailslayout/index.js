//Basic imports
import React from 'react';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';


const useStyles = makeStyles((theme) => ({
    text: {
        fontSize: "14px",
        lineHeight: "25px"
    },
    avatar: {
        marginLeft: '0px !important',
    },
}));

export const EnhancedDetails = ({status, priority, tradeType, problemType, categoryType, woType, nte, nullVal}) => {
    const classes = useStyles()
    let statusDisplay
    let priorityDisplay
    switch (status) {
        case "PENDING":
            statusDisplay = <div className="status-tag"><span className="peding-badge">Pending</span></div>
            break;
        case "PENDING_SP_ACCEPTANCE":
            statusDisplay = <div className="status-tag"><span className="peding-sp-acceptance-badge">Pending SP Acceptance</span></div>
            break;
        case "PENDING_ACCEPTANCE":
            statusDisplay = <div className="status-tag"><span className="pending-badge">Pending SP Acceptance</span></div>
            break;            
        case "ACCEPTED":
            statusDisplay = <div className="status-tag"><span className="accepted-badge">Accepted</span></div>
            break;
        case "UNASSIGNED":
            statusDisplay = <div className="status-tag"><span className="unassigned-badge">UnAssigned</span></div>
            break;
        case "NOT_FIXED":
            statusDisplay = <div className="status-tag"><span className="not-fixed-badge">Not Fixed</span></div>
            break;
        case "REJECTED":
            statusDisplay = <div className="status-tag"><span className="rejected-badge">Rejected</span></div>
            break;
        case "COMPLETE":
            statusDisplay = <div className="status-tag"><span className="complete-badge">Complete</span></div>
            break;
        case "ENROUTE":
            statusDisplay = <div className="status-tag"><span className="enroute-badge">EnRoute</span></div>
            break;
        case "ARRIVED":
            statusDisplay = <div className="status-tag"><span className="arrived-badge">Arrived</span></div>
            break;
        case "PENDING_PARTS":
            statusDisplay = <div className="status-tag"><span className="pending-parts-badge">Pending Parts</span></div>
            break;
        case "PROPOSAL_SUBMITTED":
            statusDisplay = <div className="status-tag"><span className="proposal-submitted-badge">Proposal Submitted</span></div>
            break;
        case "PROPOSAL_APPROVED":
            statusDisplay = <div className="status-tag"><span className="proposal-approved-badge">Proposal Approved</span></div>
            break;
        case "RETURN_VISIT_REQUIRED":
            statusDisplay = <div className="status-tag"><span className="return-visit-requiered-badge">Return Visit Required</span></div>
            break;
        case "SUBMITTING_PROPOSAL":
            statusDisplay = <div className="status-tag"><span className="submitting-proposal-badge">Submitting Proposal</span></div>
            break;
        case "CANCELLED":
            statusDisplay = <div className="status-tag"><span className="complete-badge">Cancelled</span></div>
            break;
        case "REASSIGN":
            statusDisplay = <div className="status-tag"><span className="reassign-badge">ReAssign</span></div>
            break;
        case "PROPOSAL_REJECTED":
            statusDisplay = <div className="status-tag"><span className="proposal-rejected-badge">Proposal Rejected</span></div>
            break;
        default:
            statusDisplay = <div className="status-tag"><span className="complete-badge">{status}</span></div>
                break;            
    }
    switch (priority) {
        case "L1 - Emergency":
            priorityDisplay = "priorityL1 details"
            break;
        case "L2 - Same Day":
            priorityDisplay = "priorityL2 details"
            break;
        case "L3 - 24 Hours":
            priorityDisplay = "priorityL3 details"
            break;
        case "L4 - 48 Hours":
            priorityDisplay = "priorityL4 details"
            break;
        case "L5 - One Week":
            priorityDisplay = "priorityL5 details"
            break;
        case "L6 - 30 Days":
            priorityDisplay = "priorityL6 details"
            break;
        case "PM":
            priorityDisplay = "priorityPM details"
            break;
        case "RFP - Proposal":
            priorityDisplay = "priorityPM details"
            break;
        default:
            priorityDisplay = "priorityPM details"
                break;            
    }    
    let stringToDivide = priority!==null?priority:nullVal
    let data = stringToDivide.split("-")    
    const titleSize = 5
    const descSize = 7
    return (
        <Grid item xs={12} md={12} lg={5} style={{padding:"10px"}}>
            <Grid container>
                <Grid item xs={titleSize}>
                    <Typography variant={'body1'} className={classes.text}><strong>Status: </strong></Typography>
                </Grid>
                <Grid item xs={descSize}>
                    <Typography variant={'body1'} className={classes.text}>{statusDisplay!==null?statusDisplay:nullVal}</Typography>
                </Grid>                
            </Grid>
            <Grid container>
                <Grid item xs={titleSize}>
                    <Typography variant={'body1'} className={classes.text}><strong>Priority: </strong></Typography>
                </Grid>
                <Grid item xs={descSize}>
                    <Chip
                        className={priorityDisplay}
                        avatar={<Avatar className={classes.avatar}>{data[0]}</Avatar>}
                        label={data[1]}
                    />                 
                </Grid>                
            </Grid>
            <Grid container>
                <Grid item xs={titleSize}>
                    <Typography variant={'body1'} className={classes.text}><strong>Trade Type: </strong></Typography>
                </Grid>
                <Grid item xs={descSize}>
                    <Typography variant={'body1'} className={classes.text}>{tradeType!==null?tradeType:nullVal}</Typography>
                </Grid>                
            </Grid>
            <Grid container>
                <Grid item xs={titleSize}>
                    <Typography variant={'body1'} className={classes.text}><strong>Problem Type: </strong></Typography>
                </Grid>
                <Grid item xs={descSize}>
                    <Typography variant={'body1'} className={classes.text}>{problemType!==null?problemType:nullVal}</Typography>
                </Grid>                
            </Grid>
            <Grid container>
                <Grid item xs={titleSize}>
                    <Typography variant={'body1'} className={classes.text}><strong>Category: </strong></Typography>
                </Grid>
                <Grid item xs={descSize}>
                    <Typography variant={'body1'} className={classes.text}>{categoryType!==null?categoryType:nullVal}</Typography>
                </Grid>                
            </Grid>
            <Grid container>
                <Grid item xs={titleSize}>
                    <Typography variant={'body1'} className={classes.text}><strong>WO Type: </strong></Typography>
                </Grid>
                <Grid item xs={descSize}>
                    <Typography variant={'body1'} className={classes.text}>{woType!==null?woType:nullVal}</Typography>
                </Grid>                
            </Grid>
            <Grid container>
                <Grid item xs={titleSize}>
                    <Typography variant={'body1'} className={classes.text}><strong>NTE: </strong></Typography>
                </Grid>
                <Grid item xs={descSize}>
                    <Typography variant={'body1'} className={classes.text}>${nte!==null?nte:nullVal}</Typography>
                </Grid>                
            </Grid>                                                                        
        </Grid>
    )
}

