//Basic imports
import React from 'react';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

//Constants
import {
    IMG_URL,
    PLACEHOLDER_URL
} from '../../constants'

const useStyles = makeStyles((theme) => ({
    img: {
        width: "100%"
    }
}));

export const DetailsImageLayout = ({image}) => {
    const classes = useStyles()
    let img
    if(image!==undefined){
        img = image!==null?IMG_URL+image:PLACEHOLDER_URL
    } else {
        img = PLACEHOLDER_URL
    }
    return (
        <Grid item md={3} className="img-container">
            <img 
                className={classes.img}
                src={img}
                alt='details_image'
            />
        </Grid>
    )
}
