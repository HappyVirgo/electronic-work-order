/**
 * Description: Create CTA components
 * Author: Carlos Blanco
 * Created: 9/1/2020
 * Ticket: ET-242
 */

//Basic Imports
import React from 'react';
//import PropTypes from 'prop-types';

//Material UI
import Grid from '@material-ui/core/Grid';

//Layouts
import {
    FeaturedCTALayout,
    CTASectionLayout
} from './layouts'

//Components
import { 
    AdvancedSearchComponent,
    FilteringComponent
} from '../index'

const CTASectionComponent = ({ctadata, tmpdata}) => {

    //Process to retrieve user data 
    let assignedToMeWorkOrders
    let emergencyWorkOrders
    let pendingWorkOrders
    let unassignedWorkOrders
    /** Wait until data is already fetched
     ** Then assign values to variables
     * */
    if(ctadata!==undefined) {
        assignedToMeWorkOrders = ctadata.data.assignedToMeWorkOrders
        emergencyWorkOrders = ctadata.data.emergencyWorkOrders
        pendingWorkOrders = ctadata.data.pendingWorkOrders
        unassignedWorkOrders = ctadata.data.unassignedWorkOrders
    }

    return (
            <Grid container className="cta-component">
                <Grid item xs={12} md={12} lg={6} className="search-section">
                    <h1>Work Orders</h1>
                    <AdvancedSearchComponent />
                    <FilteringComponent
                        tmpdata={tmpdata}
                    />
                </Grid>
                <Grid item xs={12} md={12} lg={6} className="cta-section">
                    <FeaturedCTALayout 
                        emergencyWorkOrders={emergencyWorkOrders} 
                    />
                    <CTASectionLayout
                        assignedToMeWorkOrders={assignedToMeWorkOrders}
                        pendingWorkOrders={pendingWorkOrders} 
                        unassignedWorkOrders={unassignedWorkOrders} 
                    />
                </Grid>
            </Grid>
    );
};

export default React.memo(CTASectionComponent);
