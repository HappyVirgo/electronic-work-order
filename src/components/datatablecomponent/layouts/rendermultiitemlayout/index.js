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
    let assetWorkOrder = item?item['workOrderId']:null
    let __getServiceProvider_index = item?item[getServiceProvider_index]:null
    console.log(__getServiceProvider_index)
    let getServiceProviderDef = __getServiceProvider_index?__getServiceProvider_index[getServiceProvider]:null
    console.log(getServiceProviderDef)
    return (
        <div id={assetWorkOrder} onClick={change} className={'dtableCols'}>
            <strong>{getExtraKey!==false?(checkItem!==null?checkItem:assetWorkOrder):null}</strong><br/>
            <span><small>Service Provider: <b>{__getServiceProvider_index!==null?getServiceProviderDef:" "}</b></small></span><br/>
            <span><small>Work Orders: <b>{assetWorkOrder}</b></small></span>
        </div>
    );
}