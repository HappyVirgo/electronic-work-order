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
export const RenderSingleItem = ({getNameField, getExtraKeyLast, getExtraKey, getDataKey, checkItem, checkNameField, item, getWorkOrderId}) => {
    let firstName
    let lastName
    let data
    if(getNameField===true){
        firstName = getExtraKey!==false?checkItem:item[getDataKey]
        lastName = getExtraKeyLast!==false?checkNameField:item[getDataKey]
        data = firstName+ " " +lastName
    } else {
        data = getExtraKey!==false?checkItem:item[getDataKey]
    }
    
    return (
        <TableCell id={getWorkOrderId} component="div">
            <span>
                {data}
            </span>
        </TableCell>
    );
}