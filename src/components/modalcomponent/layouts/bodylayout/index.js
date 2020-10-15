/**
 * Description: Create Modal for Notes
 * Author: Carlos Blanco
 * Created: 10/15/2020
 * Ticket: ET-302
 */

import React from 'react';

export const BodyLayout = ({modalStyle, classes, data}) => {
    let describer
    let description
    if (data['wonNote']) {
        describer = "Work Order Note"
        description = data['wonNote']
    } else if (data['pnote']) {
        describer = "Proposal Note"
        description = data['pnote']
    } else {
        describer = "Invoice Note"
        description = data['invNote']
    }    
    console.log(data)
    return (
    <div style={modalStyle} className={classes}>
        <h2 id="simple-modal-title">{describer}</h2>
            <p id="simple-modal-description">
                {description}
            </p>
    </div>
    )
}
