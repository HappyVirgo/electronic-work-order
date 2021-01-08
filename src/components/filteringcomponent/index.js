/**
 * Description: Create Filter Component
 * Author: Carlos Blanco
 * Created: 11/06/2020
 * Ticket: ET-246
 */

//Basic Imports
import React, {useContext, useState, useEffect} from 'react';
//import PropTypes from 'prop-types';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, Select, MenuItem, Grid } from '@material-ui/core';
import ClearAllRoundedIcon from '@material-ui/icons/ClearAllRounded';
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
    filterDisabled: {
        width: "30%",
        textAlign: 'center',
        // padding: '5px',
        padding: '0px',
        border: '3px solid rgba(0, 0, 0, 0.5)',
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
    iconDisabled: {
        fill: 'rgba(0, 0, 0, 0.5)',
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
    eachFilterDisabled: {
        color: 'rgba(0, 0, 0, 0.5)',
        "&&&:before": {
            borderBottom: "none"
        },
        "&&:after": {
            borderBottom: "none"
        }
    },    
}));


const FilteringComponent = ({tmpdata, targetdata}) => {
    const classes = useStyles();
    const filterFunc = useContext(GlobalContext)
    const [disabledClassAssetType, setDisabledClassAssetType] = useState([classes.filterDisabled, classes.eachFilterDisabled, classes.iconDisabled])
    const [disabledClassStatus, setDisabledClassStatus] = useState([classes.filterDisabled, classes.eachFilterDisabled, classes.iconDisabled])
    const [disabledClassPriority, setDisabledClassPriority] = useState([classes.filterDisabled, classes.eachFilterDisabled, classes.iconDisabled])

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
    //let disabledSelectAssetType = filterDataAssetType.length<=1?true:false    
    //Set "disabled" filters by default
    const disabledSelectAssetType = false
    let target = targetdata===undefined?"emergencyWO":targetdata
    let disabledSelectStatus = target==="pendingWO"?true:false
    let disabledSelectPriority = target==="emergencyWO"?true:false
    useEffect(() => {
        if(!disabledSelectAssetType) {
            setDisabledClassAssetType([classes.filter, classes.eachFilter, classes.icon])
        }else{
            setDisabledClassAssetType([classes.filterDisabled, classes.eachFilterDisabled, classes.iconDisabled])
        }        
        if(!disabledSelectStatus) {
            setDisabledClassStatus([classes.filter, classes.eachFilter, classes.icon])
        }else{
            setDisabledClassStatus([classes.filterDisabled, classes.eachFilterDisabled, classes.iconDisabled])
        }
        if(!disabledSelectPriority) {
            setDisabledClassPriority([classes.filter, classes.eachFilter, classes.icon])
        }else{
            setDisabledClassPriority([classes.filterDisabled, classes.eachFilterDisabled, classes.iconDisabled])
        }
    }, [
        classes.filter,
        classes.filterDisabled,
        classes.eachFilter,
        classes.eachFilterDisabled,
        classes.icon,
        classes.iconDisabled,
        disabledSelectAssetType,
        disabledSelectPriority,
        disabledSelectStatus
    ])

    //console.log(data)
    return (
        <Grid className={classes.filterBox}>
            <FormControl className={disabledClassAssetType[0]}>
                <Select
                    disabled={disabledSelectAssetType}
                    labelId="filter-1-filled-label"
                    id="filter-1-filled-label"
                    onChange={funcFilterByAssetType} 
                    value={filterByStateAssetType}
                    className={disabledClassAssetType[1]}
                    renderValue={(value) => { if(value && value !== 1) { return value} else {return 'Filter: Asset Type'} }}
                    inputProps={{
                        classes: {
                            icon: disabledClassAssetType[2],
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
                    {!!filterDataAssetType?filterDataAssetType.map((item, index) => {
                        return (
                            <MenuItem 
                                key={index}
                                value={item}
                            >{item}</MenuItem>
                        )
                    }):null}
                    
                </Select>
            </FormControl> 
            <FormControl className={disabledClassStatus[0]}>
                <Select
                    disabled={disabledSelectStatus}
                    labelId="filter-2-filled-label"
                    id="filter-2-filled-label"
                    onChange={funcFilterByStatus} 
                    renderValue={(value) => { if(value && value !== 1) { return value} else {return 'Filter: Status'} }}
                    value={filterByStateStatus}
                    className={disabledClassStatus[1]}
                    inputProps={{
                        classes: {
                            icon: disabledClassStatus[2],
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
                    {!!filterDataStatus?filterDataStatus.map((item, index) => {
                        return (
                            <MenuItem 
                                key={index}
                                value={item}
                            >{item}</MenuItem>
                        )
                    }):null}
                    
                </Select>
            </FormControl> 
            <FormControl className={disabledClassPriority[0]}>
                <Select
                    disabled={disabledSelectPriority}
                    labelId="filter-3-filled-label"
                    id="filter-3-filled-label"
                    onChange={funcFilterByPriority} 
                    value={filterByStatePriority}
                    renderValue={(value) => { if(value && value !== 1) { return value} else {return 'Filter: Priority'} }}
                    className={disabledClassPriority[1]}
                    inputProps={{
                        classes: {
                            icon: disabledClassPriority[2],
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
                    {!!filterDataPriority?filterDataPriority.map((item, index) => {
                        return (
                            <MenuItem 
                                key={index}
                                value={item}
                            >{item}</MenuItem>
                        )
                    }):null}
                    
                </Select>
            </FormControl>
            <Tooltip title="Clear Filters" aria-label="clear">
                <IconButton 
                    
                    style={{padding:0}}
                    onClick={funcFilterClearAll}
                    color="secondary"
                    >
                        <ClearAllRoundedIcon 
                            fontSize="large"
                            color="action"
                            
                        />               
                </IconButton>
            </Tooltip>
        </Grid>
    );
};

export default React.memo(FilteringComponent);
