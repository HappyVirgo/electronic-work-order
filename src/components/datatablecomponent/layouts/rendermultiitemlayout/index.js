/**
* Description: Check for multi-item column 
* Author: Carlos Blanco
* Date: 9/8/2020
* Ticket: ET-249 
* */
//Basic imports
import React from "react";
//Set render structure for multi-item column
export const renderMultiItem = ({getExtraKey, checkItem, item, getServiceProvider, getServiceProvider_index, getWorkOrderId, change}) => {
    return (
        <div id={item['workOrderId']} onClick={change} className={'dtableCols'}>
            <strong>{getExtraKey!==false?(checkItem!==null?checkItem:item[getWorkOrderId]):null}</strong><br/>
            <span><small>Service Provider: <b>{item[getServiceProvider_index]!==null?item[getServiceProvider_index][getServiceProvider]:"null"}</b></small></span><br/>
            <span><small>Work Orders: <b>{item[getWorkOrderId]}</b></small></span>
        </div>
    );
}