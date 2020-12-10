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
import { FormControl, Select, MenuItem, Grid } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

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
        textAlign: 'center',
        // padding: '5px',
        padding: '0px',
        border: '3px solid #78b0dd',
        borderRadius: '38px',
    },
    filterBox: {
        // margin: '15px 0px',
        margin: '10px 0px',
        display: 'flex',
        justifyContent: 'space-between'
    },
    icon: {
        fill: 'white',
    },
    eachFilter: {
        color: 'white',
        "&&&:before": {
            borderBottom: "none"
        },
        "&&:after": {
            borderBottom: "none"
        }
    },
}));


const FilteringComponent = ({tmpdata}) => {
    const filterFunc = useContext(GlobalContext)
    //Functions to handle state changes
    const funcFilterByAssetType = filterFunc.handleFilterByAssetType 
    const funcFilterByStatus = filterFunc.handleFilterByStatus
    const funcFilterByPriority = filterFunc.handleFilterByPriority
    const funcFilterClearAll = filterFunc.handleFilterClearAll
    //Default values for selects inputs
    const filterByStateAssetType = filterFunc.filterByStateAssetType
    const filterByStateStatus = filterFunc.filterByStateStatus
    const filterByStatePriority = filterFunc.filterByStatePriority

    let data = tmpdata!==undefined?(tmpdata['data']?tmpdata['data']['work_orders']:[]):[]
    let filterDataAssetType = filterByAssetType(data)
    let filterDataStatus = filterByStatus(data)
    let filterDataPriority = filterByPriority(data)
    const classes = useStyles();
    //console.log(data)
    return (
        <Grid className={classes.filterBox}>
            <FormControl className={classes.filter}>
                <Select
                    labelId="filter-1-filled-label"
                    id="filter-1-filled-label"
                    onChange={funcFilterByAssetType} 
                    value={filterByStateAssetType}
                    className={classes.eachFilter}
                    renderValue={(value) => { if(value && value !== 1) { return value} else {return 'Filter: Asset Type'} }}
                    inputProps={{
                        classes: {
                            icon: classes.icon,
                        },
                    }}
                    MenuProps = {{
                        anchorOrigin: { vertical: "bottom", horizontal: "left" },
                        transformOrigin: { vertical: "top",horizontal: "left" },
                        getContentAnchorEl: null,
                        elevation: 0,
                    }}
                >
                    <MenuItem className={classes.menuItem} value="" disabled><b>Asset Type:</b></MenuItem>
                    <MenuItem value={1}>Reset Filter</MenuItem>                    
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
                <Select
                    labelId="filter-2-filled-label"
                    id="filter-2-filled-label"
                    onChange={funcFilterByStatus} 
                    renderValue={(value) => { if(value && value !== 1) { return value} else {return 'Filter: Status'} }}
                    value={filterByStateStatus}
                    className={classes.eachFilter}
                    inputProps={{
                        classes: {
                            icon: classes.icon,
                        },
                    }}
                    MenuProps = {{
                        anchorOrigin: { vertical: "bottom", horizontal: "left" },
                        transformOrigin: { vertical: "top",horizontal: "left" },
                        getContentAnchorEl: null,
                        elevation: 0,
                    }}
                >
                    <MenuItem className={classes.menuItem} value="" disabled><b>Status:</b></MenuItem>
                    <MenuItem value={1}>Reset Filter</MenuItem>                    
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
                <Select
                    labelId="filter-3-filled-label"
                    id="filter-3-filled-label"
                    onChange={funcFilterByPriority} 
                    value={filterByStatePriority}
                    renderValue={(value) => { if(value && value !== 1) { return value} else {return 'Filter: Priority'} }}
                    className={classes.eachFilter}
                    inputProps={{
                        classes: {
                            icon: classes.icon,
                        },
                    }}
                    MenuProps = {{
                        anchorOrigin: { vertical: "bottom", horizontal: "left" },
                        transformOrigin: { vertical: "top",horizontal: "left" },
                        getContentAnchorEl: null,
                        elevation: 0,
                    }}
                >
                    <MenuItem className={classes.menuItem} value="" disabled><b>Priority:</b></MenuItem>
                    <MenuItem value={1}>Reset Filter</MenuItem>                    
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
            <Tooltip title="Clear Filters" aria-label="clear">
                <IconButton component="span" style={{padding:0}} onClick={funcFilterClearAll}>
                    <ClearIcon fontSize="large" color="action"  />               
                </IconButton>
            </Tooltip>
        </Grid>
    );
};

export default React.memo(FilteringComponent);
