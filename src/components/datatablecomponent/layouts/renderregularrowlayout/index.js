/**
* Description: Render regular item column 
* Author: Carlos Blanco
* Date: 10/5/2020
* Ticket: ET-344 
* */
//Basic imports
import React from "react";

export const regularColumn = ({getExtraKey, getDataKey, checkItem, item, change}) => {
    return (
        <div id={item?item['workOrderId']:""} onClick={change} className={'dtableCols'}>
            <span>
                {getExtraKey!==false?checkItem:item[getDataKey]}
            </span>
        </div>
    )
}