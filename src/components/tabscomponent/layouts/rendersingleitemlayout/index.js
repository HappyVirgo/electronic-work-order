/**
* Description: Check for notes column
* Author: Carlos Blanco
* Date: 10/14/2020
* Ticket: ET-352 
* */

//Basic imports
import React from "react";


//Material UI imports
import TableCell from "@material-ui/core/TableCell";

///Set render structure for single-item column
export const renderSingleItem = ({getExtraKey, getDataKey, checkItem, item, getWorkOrderId}) => {
    return (
        <TableCell id={getWorkOrderId}>
            <span>
            {getExtraKey!==false?checkItem:item[getDataKey]}
            </span>
        </TableCell>
    );
}