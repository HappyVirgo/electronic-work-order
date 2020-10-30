/**
 * Description: Create Advanced Search Component
 * Author: Carlos Blanco
 * Created: 10/26/2020
 * Ticket: ET-237
 */
//Basic imports
import React, {useContext} from 'react';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, TextField, InputLabel, Select, MenuItem } from '@material-ui/core';

//Context
import { GlobalContext } from "../../context/globalcontext";

const useStyles = makeStyles((theme) => ({
    advanced: {
        width: "30%",
    },
    search: {
        width: "70%",
    }    
}));

const AdvancedSearchComponent = () => {
    let searchTerm = useContext(GlobalContext)
    searchTerm = searchTerm.handleSearchTerm 
    
    const classes = useStyles();
    return (
        <div>
            <FormControl className={classes.advanced}>
                <InputLabel id="advanced-select-filled-label">Advanced</InputLabel>
                <Select
                    labelId="advanced-select-filled-label"
                    id="advanced-select-filled-label"
                    variant="filled"
                >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl> 
            <FormControl className={classes.search}>           
                <TextField 
                    label="Search"
                    id="search-input-filled-label"
                    aria-describedby="search" 
                    type="search" 
                    fullWidth={true} 
                    variant="filled" 
                    onChange={searchTerm}
                />
            </FormControl>
        </div>
    );
};

export default React.memo(AdvancedSearchComponent);