/**
 * Description: Create Advanced Search Component
 * Author: Carlos Blanco
 * Created: 10/26/2020
 * Ticket: ET-237
 */
//Basic imports
import React from 'react';
//import { makeStyles } from '@material-ui/core/styles';


const AdvancedSearchComponent = () => {
    return (
        <form>
        <p>Advanced:</p>
        <input
            type='text'
        />
        </form>
    );
};

export default React.memo(AdvancedSearchComponent);