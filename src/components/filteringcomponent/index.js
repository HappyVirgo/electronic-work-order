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
        padding: '5px',
        border: '2px solid #78b0dd',
        borderRadius: '38px',
    },
    filterBox: {
        margin: '20px 0px',
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
                <Select
                    labelId="filter-2-filled-label"
                    id="filter-2-filled-label"
                    onChange={funcFilterByStatus} 
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
                <Select
                    labelId="filter-3-filled-label"
                    id="filter-3-filled-label"
                    onChange={funcFilterByPriority} 
                    value={filterByStatePriority}
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
