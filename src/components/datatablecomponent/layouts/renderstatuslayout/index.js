/**
* Description: Render status item column 
* Author: Carlos Blanco
* Date: 10/5/2020
* Ticket: ET-344 
* */
//Basic imports
import React from "react";

export const statusPending = ({getExtraKey, getDataKey, checkItem, item, change}) => {
    return (
        <div id={item['workOrderId']} onClick={change} className={'dtableCols pending-status'}>           
            <span>
                {getExtraKey!==false?checkItem:item[getDataKey]}
            </span>
        </div>            

    )
}

export const statusAccepted = ({getExtraKey, getDataKey, checkItem, item, change}) => {
    return (
        <div id={item['workOrderId']} onClick={change} className={'dtableCols accepted-status'}>
            <span>
                {getExtraKey!==false?checkItem:item[getDataKey]}
            </span>
        </div>            

    )
}

export const statusUnassigned = ({getExtraKey, getDataKey, checkItem, item, change}) => {
    return (
        <div id={item['workOrderId']} onClick={change} className={'dtableCols unassigned-status'}>
            <span>
                {getExtraKey!==false?checkItem:item[getDataKey]}
            </span>
        </div>            

    )
}