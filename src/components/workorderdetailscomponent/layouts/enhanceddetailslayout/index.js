//Basic imports
import React from 'react';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    text: {
        fontSize: "14px",
        lineHeight: "25px"
    }
}));

export const EnhancedDetails = ({status, priority, tradeType, problemType, categoryType, woType, nte, nullVal}) => {
    const classes = useStyles()
    return (
        <Grid item xs={5}>
            <Typography variant={'body1'} className={classes.text}><strong>Status: </strong>{status!==null?status:nullVal}</Typography>
            <Typography variant={'body1'} className={classes.text}><strong>Priority: </strong>{priority!==null?priority:nullVal}</Typography>
            <Typography variant={'body1'} className={classes.text}><strong>Trade Type: </strong>{tradeType!==null?tradeType:nullVal}</Typography>
            <Typography variant={'body1'} className={classes.text}><strong>Problem Type: </strong>{problemType!==null?problemType:nullVal}</Typography>
            <Typography variant={'body1'} className={classes.text}><strong>Category: </strong>{categoryType!==null?categoryType:nullVal}</Typography>
            <Typography variant={'body1'} className={classes.text}><strong>WO Type: </strong>{woType!==null?woType:nullVal}</Typography>
            <Typography variant={'body1'} className={classes.text}><strong>NTE: </strong>${nte!==null?nte:nullVal}</Typography>
        </Grid>
    )
}

