/**
 * Description: Create Filter Component
 * Author: Carlos Blanco
 * Created: 11/06/2020
 * Ticket: ET-246
 */

//Basic Imports
import React, {useContext, useEffect, useState} from 'react';
//import PropTypes from 'prop-types';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, InputLabel, Select, MenuItem, Grid } from '@material-ui/core';

//Context
import { GlobalContext } from "../../context/globalcontext";

//Helpers
import { filterByAssetType } from "./helpers"

const useStyles = makeStyles((theme) => ({
    filter: {
        width: "30%",
        marginRight: "20px"
    }
}));


const FilteringComponent = ({tmpdata}) => {
    const filterFunc = useContext(GlobalContext)
    const filterBy = filterFunc.handleFilterBy 
    const filterByState = filterFunc.filterByState
    const filterAssetType = filterFunc.handleFilterAssetType

    let data = tmpdata!==undefined?(tmpdata['data']?tmpdata['data']['work_orders']:[]):[]
    let filterData = filterByAssetType(data)
    const classes = useStyles();
    useEffect(() => {
        //Updates data from state
        filterAssetType(data)
    }, [data, filterAssetType]);
    
    console.log(filterData)
    return (
        <Grid>
            <FormControl className={classes.filter}>
                <InputLabel id="filter-1-filled-label">Filter by Asset Type</InputLabel>
                <Select
                    labelId="filter-1-filled-label"
                    id="filter-1-filled-label"
                    variant="filled"
                    onChange={filterBy} 
                    value={filterByState}
                >
                    <MenuItem value={null} aria-label="None" disabled>
                        <em>Filter by</em>
                    </MenuItem>
                    <MenuItem value={'default'}>Clear Filter</MenuItem>                    
                    {filterData.map((item, index) => {
                        return (
                            <MenuItem 
                                key={index}
                                value={item}
                            >{item}</MenuItem>
                        )
                    })}
                    
                </Select>
            </FormControl>  
        </Grid>
    );
};

/*<FormControl className={classes.filter}>
                <InputLabel id="filter-2-filled-label">Advanced 2</InputLabel>
                <Select
                    labelId="filter-2-filled-label"
                    id="filter-2-filled-label"
                    variant="filled"
                    onChange={filterBy}
                    value={filterByState}
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
                    onChange={filterBy}
                    value={filterByState}
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
            </FormControl>*/
export default React.memo(FilteringComponent);
