/**
* Description: Check for notes column
* Author: Carlos Blanco
* Date: 10/14/2020
* Ticket: ET-352 
* */

//Basic imports
import React from "react";

//Date format
import Moment from 'react-moment';

//Material UI imports
import TableCell from "@material-ui/core/TableCell";

///Set render structure for single-item column
export const RenderDateItem = ({getExtraKey, getDataKey, checkItem, item, getWorkOrderId}) => {
    return (
        <TableCell id={getWorkOrderId} component="div">
            <Moment format="MM/D/YY">{getExtraKey!==false?checkItem:item[getDataKey]}</Moment>
        </TableCell>
    );
}