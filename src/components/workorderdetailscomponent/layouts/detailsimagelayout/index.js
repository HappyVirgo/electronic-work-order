//Basic imports
import React from 'react';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme) => ({
    img: {
        width: "100%"
    }
}));

export const DetailsImageLayout = () => {
    const classes = useStyles()
    return (
        <Grid item md={3} className="img-container">
            <img 
                className={classes.img}
                src='https://via.placeholder.com/150x210'
                alt='details_image'
            />
        </Grid>
    )
}
