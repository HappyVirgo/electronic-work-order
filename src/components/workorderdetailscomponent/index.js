/**
 * Description: Create WO Details Component
 * Author: Carlos Blanco
 * Created: 9/8/2020
 * Ticket: ET-253
 */

//Basic Imports
import React from 'react';
//import PropTypes from 'prop-types';

//Layouts
import { Details } from './common/detailslayout' 

const WorkOrderDetailsComponent = ({detailsdata}) => {
    return (
        <Details detailsdata={detailsdata}></Details>
    );
};

export default React.memo(WorkOrderDetailsComponent);