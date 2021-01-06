/**
* Description: Check for multi-item column 
* Author: Carlos Blanco
* Date: 9/8/2020
* Ticket: ET-249 
* */
//Basic imports
import React from "react";
//Set render structure for multi-item column
export const renderMultiItem = ({getExtraKey, checkItem, item, getServiceProvider, getServiceProvider_index, getWorkOrderId, getCategoryType_index, getCategoryType, change}) => {
    console.log("item3", item)
    console.log(getCategoryType_index, getCategoryType)
    let assetWorkOrder = item?item['workOrderId']:null
    let __getServiceProvider_index = item?item[getServiceProvider_index]:null
    let getServiceProviderDef = __getServiceProvider_index?__getServiceProvider_index[getServiceProvider]:null
    let __getCategoryType_index = item?item[getCategoryType_index]:null
    let getCategoryTypeDef = __getCategoryType_index?__getCategoryType_index[getCategoryType]:null
    return (
        <div id={assetWorkOrder} onClick={change} className={'dtableCols'}>
            <strong>{getExtraKey!==false?(checkItem!==null?checkItem:assetWorkOrder):null}</strong><br/>
            <span><small>Service Providers: <b>{__getServiceProvider_index!==null?getServiceProviderDef:" "}</b></small></span><br/>
            <span><small>Category Type: <b>{__getCategoryType_index!==null?getCategoryTypeDef:" "}</b></small></span><br/>
            <span><small>Work Orders: <b>{assetWorkOrder}</b></small></span>
        </div>
    );
}