//Basic imports
import React from 'react';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    null: {
        padding: "25px"
    }
}));

export const RenderNull = () => {
    const classes = useStyles()
    return(
            <Grid className={classes.null}>
                <h1>Null</h1>
            </Grid>
    )

}