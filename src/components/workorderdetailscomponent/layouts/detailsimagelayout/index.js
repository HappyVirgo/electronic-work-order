//Basic imports
import React from 'react';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

//Constants
import {
    IMG_URL,
    PLACEHOLDER_URL,
    PLACEHOLDER_URL_PMs
} from '../../constants'

const useStyles = makeStyles((theme) => ({
    img: {
        width: "100%"
    }
}));

export const DetailsImageLayout = ({image, ifPM}) => {
    const classes = useStyles()
    let img
    let placeholder
    if (ifPM!==true) {
        placeholder = PLACEHOLDER_URL
    } else {
        placeholder = PLACEHOLDER_URL_PMs
    }
    if(image!==undefined){
        img = image!==null?IMG_URL+image:placeholder
    } else {
        img = placeholder
    }
    return (
        <Grid item md={5} lg={3} className="img-container">
            <img 
                className={classes.img}
                src={img}
                alt='details_image'
            />
        </Grid>
    )
}
