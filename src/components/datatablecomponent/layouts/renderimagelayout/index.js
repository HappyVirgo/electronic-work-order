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
    let url_plchdlr = item?(item['asset']!==null?item['asset']:null):null
    let placeholder = url_plchdlr!==null?PLACEHOLDER_URL:PLACEHOLDER_URL_PMs
    let assetImage = item?item[getDataKey]:null
    if(assetImage!==null||undefined) {
        checkImg = item[getDataKey][getExtraKey]!==undefined||null?item[getDataKey][getExtraKey]:[]   
        checkImg = checkImg.length>0?checkImg[0][getImgPath]:[]
        img = checkImg!==undefined?(checkImg.length!==0?IMG_URL+checkImg:placeholder):placeholder
    }

    return (
        <div id={item?item['workOrderId']:""} onClick={change} className={'dtableCols'}>
            <img 
                width="80"
                style={{minWidth:'80px'}}
                alt={`img-${item?item['workOrderId']:""}`}
                src={img!==undefined?img:placeholder}
            />
        </div>
    );
}