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

//Helpers
import { 
    filterByAssetType,
    filterByStatus,
    filterByPriority
} from "./helpers"

const useStyles = makeStyles((theme) => ({
    filter: {
        width: "30%",
        marginRight: "20px"
    }
}));


const FilteringComponent = ({tmpdata}) => {
    const filterFunc = useContext(GlobalContext)
    //Functions to handle state changes
    const funcFilterByAssetType = filterFunc.handleFilterByAssetType 
    const funcFilterByStatus = filterFunc.handleFilterByStatus
    const funcFilterByPriority = filterFunc.handleFilterByPriority
    //Default values for selects inputs
    const filterByStateAssetType = filterFunc.handleFilterAssetType
    const filterByStateStatus = filterFunc.filterByStateStatus
    const filterByStatePriority = filterFunc.filterByStatePriority

    let data = tmpdata!==undefined?(tmpdata['data']?tmpdata['data']['work_orders']:[]):[]
    let filterDataAssetType = filterByAssetType(data)
    let filterDataStatus = filterByStatus(data)
    let filterDataPriority = filterByPriority(data)
    const classes = useStyles();
    //console.log(data)
    return (
        <Grid>
            <FormControl className={classes.filter}>
                <InputLabel id="filter-1-filled-label">Filter by Asset Type</InputLabel>
                <Select
                    labelId="filter-1-filled-label"
                    id="filter-1-filled-label"
                    variant="filled"
                    onChange={funcFilterByAssetType} 
                    value={filterByStateAssetType}
                >
                    <MenuItem value={1}>Default Filter</MenuItem>                    
                    {filterDataAssetType.map((item, index) => {
                        return (
                            <MenuItem 
                                key={index}
                                value={item}
                            >{item}</MenuItem>
                        )
                    })}
                    
                </Select>
            </FormControl> 
            <FormControl className={classes.filter}>
                <InputLabel id="filter-2-filled-label">Filter by Status</InputLabel>
                <Select
                    labelId="filter-2-filled-label"
                    id="filter-2-filled-label"
                    variant="filled"
                    onChange={funcFilterByStatus} 
                    value={filterByStateStatus}
                >
                    <MenuItem value={1}>Default Filter</MenuItem>                    
                    {filterDataStatus.map((item, index) => {
                        return (
                            <MenuItem 
                                key={index}
                                value={item}
                            >{item}</MenuItem>
                        )
                    })}
                    
                </Select>
            </FormControl> 
            <FormControl className={classes.filter}>
                <InputLabel id="filter-3-filled-label">Filter by Priority</InputLabel>
                <Select
                    labelId="filter-3-filled-label"
                    id="filter-3-filled-label"
                    variant="filled"
                    onChange={funcFilterByPriority} 
                    value={filterByStatePriority}
                >
                    <MenuItem value={1}>Default Filter</MenuItem>                    
                    {filterDataPriority.map((item, index) => {
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

export default React.memo(FilteringComponent);
