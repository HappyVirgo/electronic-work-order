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
import { FormControl, Input  } from '@material-ui/core';

//Context
import { GlobalContext } from "../../context/globalcontext";

const useStyles = makeStyles((theme) => ({
    search: {
        width: "100%",
        height: "54px"
    }
}));

const AdvancedSearchComponent = () => {
    let searchTerm = useContext(GlobalContext)
    searchTerm = searchTerm.handleSearchTerm 
    
    const classes = useStyles();
    return (
        <FormControl className={classes.search}>
            <Input id="search-input" aria-describedby="search" type="search" fullWidth={true} disableUnderline={false} onChange={searchTerm}/>
        </FormControl>
    );
};

export default React.memo(AdvancedSearchComponent);