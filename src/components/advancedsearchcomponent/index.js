/**
 * Description: Create Advanced Search Component
 * Author: Carlos Blanco
 * Created: 10/26/2020
 * Ticket: ET-237
 */
//Basic imports
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    input: {
        width: "100%",
        height: "54px"
    }
}));

const AdvancedSearchComponent = () => {
    const classes = useStyles();
    return (
        <form>
        <input
            type='text'
            className={classes.input}
            placeholder='Search Work Orders...'
        />
        </form>
    );
};

export default React.memo(AdvancedSearchComponent);