/**
* Description: Check for notes column
* Author: Carlos Blanco
* Date: 10/14/2020
* Ticket: ET-352 
* */

//Basic imports
import React from "react";

//Modal
import {ModalComponent} from '../../../../components'

//Material UI imports
import TableCell from "@material-ui/core/TableCell";

///Set render structure for single-item column
export const RenderSingleItem = ({ typeOfTab, getDetailsButton, getNameField, getExtraKeyLast, getExtraKey, getDataKey, checkItem, checkNameField, item, getWorkOrderId}) => {
    let firstName
    let lastName
    let data
    console.log(typeOfTab)
    if(getNameField===true){
        firstName = getExtraKey!==false?checkItem:item[getDataKey]
        lastName = getExtraKeyLast!==false?checkNameField:item[getDataKey]
        data = firstName+ " " +lastName
    } else if(getDetailsButton===true) {
        data =  <ModalComponent data={item} type={typeOfTab} />
    } else {
        data = getExtraKey!==false?checkItem:item[getDataKey]
    }
    
    return (
        <TableCell id={getWorkOrderId} component="div">
                {data}
        </TableCell>
    );
}