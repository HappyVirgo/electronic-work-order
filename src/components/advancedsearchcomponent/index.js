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
    'input': {
        '&::placeholder': {
            color: '#444444',
            fontSize: '18px',
            fontFamily: 'SfUiDisplay'
        }
    },
}));

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
                    renderValue={(value) => "Advanced"}
                    MenuProps = {{
                        anchorOrigin: { vertical: "bottom", horizontal: "left" },
                        transformOrigin: { vertical: "top",horizontal: "left" },
                        getContentAnchorEl: null,
                    }}
                    disableUnderline
                >
                    <MenuItem className={classes.menuItem} value="" disabled><b>Searched by:</b></MenuItem>
                    <MenuItem className={classes.menuItem} value={1}><Radio color="primary" checked={searchByState===1} />Default Search</MenuItem>
                    <MenuItem className={classes.menuItem} value={2}><Radio color="primary" checked={searchByState===2} />Service Provider</MenuItem>
                    <MenuItem className={classes.menuItem} value={3}><Radio color="primary" checked={searchByState===3} />Asset Type</MenuItem>
                    <MenuItem className={classes.menuItem} value={4}><Radio color="primary" checked={searchByState===4} />Problem Type</MenuItem>
                    <MenuItem className={classes.menuItem} value={5}><Radio color="primary" checked={searchByState===5} />Trade Type</MenuItem>
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