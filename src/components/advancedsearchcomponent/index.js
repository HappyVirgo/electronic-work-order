/**
 * Description: Create Advanced Search Component
 * Author: Carlos Blanco
 * Created: 10/26/2020
 * Ticket: ET-237
 */
//Basic imports
import React, {useContext, useState} from 'react';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, TextField, Select, MenuItem, Radio, InputAdornment } from '@material-ui/core';
import SearchIcon from "@material-ui/icons/Search";
//Context
import { GlobalContext } from "../../context/globalcontext";

const useStyles = makeStyles((theme) => ({
    search: {
        width: "70%",
    },
    menuItem: {
        minWidth: '250px',
        width: '100%'
    },
    underline: {
        "&&&:before": {
            borderBottom: "none"
        },
        "&&:after": {
            borderBottom: "none"
        }
    },
    paper: {
        borderRadius: '20px !important',
        borderTopLeftRadius: 'unset !important',
        marginTop: '17px',
        padding: '20px',
        boxShadow: '0px 4px 10px 1px #888888',
        ul: {
            padding: 'unset'
        }
    },
    'input': {
        '&::placeholder': {
            color: '#444444',
            fontSize: '18px',
            fontFamily: 'SfUiDisplay'
        }
    },
}));

const advancedSearchFields = ["Default Search", "Service Provider" ,"Asset Type", "Problem Type", "Trade Type"]

const AdvancedSearchComponent = () => {
    const [searchBox, setSearchBox] = useState(false);
    let searchFunc = useContext(GlobalContext)
    let searchTerm = searchFunc.handleSearchTerm 
    let searchBy = searchFunc.handleSearchBy
    let searchByState = searchFunc.searchByState
    let searchTermState = searchFunc.searchTermState
    const classes = useStyles();
    return (
        <div className={`search-form ${searchBox?'rounded':''}`}>
            <FormControl className={`advanced ${searchBox?'opened':''}`}>
                <Select
                    labelId="advanced-select-filled-label"
                    id="advanced-select-filled-label"
                    className={`search-box ${searchBox?'opened':''}`}
                    onOpen={() => setSearchBox(true)}
                    onClose={() => setSearchBox(false)}
                    onChange={searchBy}
                    value={searchByState}
                    renderValue={(value) => advancedSearchFields[value-1]}
                    MenuProps = {{
                        anchorOrigin: { vertical: "bottom", horizontal: "left" },
                        transformOrigin: { vertical: "top",horizontal: "left" },
                        getContentAnchorEl: null,
                        classes: {
                            paper: classes.paper
                        }
                    }}
                    disableUnderline
                >
                    <MenuItem className={classes.menuItem} value="" disabled><b>Searched by:</b></MenuItem>
                    <MenuItem className={classes.menuItem} value={1}><Radio color="primary" checked={searchByState===1} />{advancedSearchFields[0]}</MenuItem>
                    <MenuItem className={classes.menuItem} value={2}><Radio color="primary" checked={searchByState===2} />{advancedSearchFields[1]}</MenuItem>
                    <MenuItem className={classes.menuItem} value={3}><Radio color="primary" checked={searchByState===3} />{advancedSearchFields[2]}</MenuItem>
                    <MenuItem className={classes.menuItem} value={4}><Radio color="primary" checked={searchByState===4} />{advancedSearchFields[3]}</MenuItem>
                    <MenuItem className={classes.menuItem} value={5}><Radio color="primary" checked={searchByState===5} />{advancedSearchFields[4]}</MenuItem>
                </Select>
            </FormControl>
            <FormControl className={classes.search}>           
                <TextField 
                    placeholder="Search Work Orders..."
                    id="search-input-filled-label"
                    aria-describedby="search" 
                    type="search" 
                    fullWidth={true} 
                    value={searchTermState}
                    onChange={searchTerm}
                    InputProps={{ classes: {
                                    underline: classes.underline
                                },
                                  endAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                    ) }}
                />
            </FormControl>
        </div>
    );
};

export default React.memo(AdvancedSearchComponent);