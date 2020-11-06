/**
 * Description: Create Filter Component
 * Author: Carlos Blanco
 * Created: 11/06/2020
 * Ticket: ET-246
 */

//Basic Imports
import React, {useContext} from 'react';
//import PropTypes from 'prop-types';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, InputLabel, Select, MenuItem, Grid } from '@material-ui/core';

//Context
import { GlobalContext } from "../../context/globalcontext";

//Layouts
/*
import {
    //bla
} from './layouts'
*/

const useStyles = makeStyles((theme) => ({
    filter: {
        width: "30%",
        marginRight: "20px"
    }
}));


const FilteringComponent = () => {
    let filterFunc = useContext(GlobalContext)
    let searchTerm = filterFunc.handleSearchTerm 
    console.log(searchTerm)
    const classes = useStyles();

    return (
        <Grid>
            <FormControl className={classes.filter}>
                <InputLabel id="filter-1-filled-label">Asset Type</InputLabel>
                <Select
                    labelId="filter-1-filled-label"
                    id="filter-1-filled-label"
                    variant="filled"
                    //onChange={searchBy}
                    //value={searchByState}
                >
                    <MenuItem value={''} aria-label="None" disabled>
                        <em>Filter by</em>
                    </MenuItem>
                    <MenuItem value={1}>Default Search</MenuItem>
                    <MenuItem value={2}>Service Provider</MenuItem>
                    <MenuItem value={3}>Asset Type</MenuItem>
                    <MenuItem value={4}>Problem Type</MenuItem>
                    <MenuItem value={5}>Trade Type</MenuItem>
                </Select>
            </FormControl> 
            <FormControl className={classes.filter}>
                <InputLabel id="filter-2-filled-label">Advanced 2</InputLabel>
                <Select
                    labelId="filter-2-filled-label"
                    id="filter-2-filled-label"
                    variant="filled"
                    //onChange={searchBy}
                    //value={searchByState}
                >
                    <MenuItem value={''} aria-label="None" disabled>
                        <em>Filter by</em>
                    </MenuItem>
                    <MenuItem value={1}>Default Search</MenuItem>
                    <MenuItem value={2}>Service Provider</MenuItem>
                    <MenuItem value={3}>Asset Type</MenuItem>
                    <MenuItem value={4}>Problem Type</MenuItem>
                    <MenuItem value={5}>Trade Type</MenuItem>
                </Select>
                </FormControl> 
                <FormControl className={classes.filter}>            
                <InputLabel id="filter-3-filled-label">Advanced 3</InputLabel>
                <Select
                    labelId="filter-3-filled-label"
                    id="filter-3-filled-label"
                    variant="filled"
                    //onChange={searchBy}
                    //value={searchByState}
                >
                    <MenuItem value={''} aria-label="None" disabled>
                        <em>Filter by</em>
                    </MenuItem>
                    <MenuItem value={1}>Default Search</MenuItem>
                    <MenuItem value={2}>Service Provider</MenuItem>
                    <MenuItem value={3}>Asset Type</MenuItem>
                    <MenuItem value={4}>Problem Type</MenuItem>
                    <MenuItem value={5}>Trade Type</MenuItem>
                </Select>            
            </FormControl> 
        </Grid>
    );
};

export default React.memo(FilteringComponent);
