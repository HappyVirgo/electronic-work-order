/**
* Description: Render image item column 
* Author: Carlos Blanco
* Date: 10/2/2020
* Ticket: ET-344 
* */
//Basic imports
import React from "react";

//Constants
import {
    IMG_URL,
    PLACEHOLDER_URL,
    PLACEHOLDER_URL_PMs
} from '../../constants'

///Set render structure for single-item column
export const renderImage = ({getImgPath, getExtraKey, getDataKey, item, change}) => {
    let img
    let checkImg
    let placeholder = item['asset']!==null?PLACEHOLDER_URL:PLACEHOLDER_URL_PMs
    if(item[getDataKey]!==null||undefined) {
        checkImg = item[getDataKey][getExtraKey]!==undefined||null?item[getDataKey][getExtraKey]:[]   
        checkImg = checkImg.length>0?checkImg[0][getImgPath]:[]
        img = checkImg!==undefined?(checkImg.length!==0?IMG_URL+checkImg:placeholder):placeholder
    }

    return (
        <div id={item['workOrderId']} onClick={change} className={'dtableCols'}>
            <img 
                width="80"
                alt={`img-${item['workOrderId']}`}
                src={img!==undefined?img:placeholder}
            />
        </div>
    );
}