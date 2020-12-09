/**
* Description: Render priority item column 
* Author: Carlos Blanco
* Date: 10/5/2020
* Ticket: ET-344 
* */
//Basic imports
import React from "react";
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

export const priorityL1Emergency = ({getExtraKey, getDataKey, checkItem, item, change}) => {
    console.log(getExtraKey)
    console.log(getDataKey)
    console.log(checkItem)
    let stringToDivide = getExtraKey!==false?checkItem:item[getDataKey];
    let data = stringToDivide.split("-")
    return (
        <div id={item['workOrderId']} onClick={change} className={'dtableCols'}>
            <Chip
                className={`priorityL1`}
                avatar={<Avatar>{data[0]}</Avatar>}
                label={data[1]}
            />        
        </div>
    )
}

export const priorityL2SameDay = ({getExtraKey, getDataKey, checkItem, item, change}) => {

    let stringToDivide = getExtraKey!==false?checkItem:item[getDataKey];
    let data = stringToDivide.split("-")
    return (
        <div id={item['workOrderId']} onClick={change} className={'dtableCols'}>
            <Chip
                className={`priorityL2`}
                avatar={<Avatar>{data[0]}</Avatar>}
                label={data[1]}
            />        
        </div>
    )
}

export const priorityL3_24Hours = ({getExtraKey, getDataKey, checkItem, item, change}) => {

    let stringToDivide = getExtraKey!==false?checkItem:item[getDataKey];
    let data = stringToDivide.split("-")
    return (
        <div id={item['workOrderId']} onClick={change} className={'dtableCols'}>
            <Chip
                className={`priorityL3`}
                avatar={<Avatar>{data[0]}</Avatar>}
                label={data[1]}
            />        
        </div>
    )
}

export const priorityL4_48Hours = ({getExtraKey, getDataKey, checkItem, item, change}) => {

    let stringToDivide = getExtraKey!==false?checkItem:item[getDataKey];
    let data = stringToDivide.split("-")
    return (
        <div id={item['workOrderId']} onClick={change} className={'dtableCols'}>
            <Chip
                className={`priorityL4`}
                avatar={<Avatar>{data[0]}</Avatar>}
                label={data[1]}
            />        
        </div>
    )
}


export const priorityL5_OneWeek = ({getExtraKey, getDataKey, checkItem, item, change}) => {

    let stringToDivide = getExtraKey!==false?checkItem:item[getDataKey];
    let data = stringToDivide.split("-")
    return (
        <div id={item['workOrderId']} onClick={change} className={'dtableCols'}>
            <Chip
                className={`priorityL5`}
                avatar={<Avatar>{data[0]}</Avatar>}
                label={data[1]}
            />        
        </div>
    )
}

export const priorityL6_30Days = ({getExtraKey, getDataKey, checkItem, item, change}) => {

    let stringToDivide = getExtraKey!==false?checkItem:item[getDataKey];
    let data = stringToDivide.split("-")
    return (
        <div id={item['workOrderId']} onClick={change} className={'dtableCols'}>
            <Chip
                className={`priorityPM`}
                avatar={<Avatar>{data[0]}</Avatar>}
                label={data[1]}
            />        
        </div>
    )
}

export const priorityL7_30Days = ({getExtraKey, getDataKey, checkItem, item, change}) => {

    let stringToDivide = getExtraKey!==false?checkItem:item[getDataKey];
    let data = stringToDivide.split("-")
    return (
        <div id={item['workOrderId']} onClick={change} className={'dtableCols'}>
            <Chip
                className={`priorityPM`}
                avatar={<Avatar>{data[0]}</Avatar>}
                label={data[1]}
            />        
        </div>
    )
}

export const priorityPM = ({getExtraKey, getDataKey, checkItem, item, change}) => {

    let stringToDivide = getExtraKey!==false?checkItem:item[getDataKey];
    let data = stringToDivide.split("-")
    return (
        <div id={item['workOrderId']} onClick={change} className={'dtableCols'}>
            <Chip
                className={`priorityPM`}
                avatar={<Avatar>{data[0]}</Avatar>}
                label={data[1]}
            />        
        </div>
    )
}

export const priorityRFP = ({getExtraKey, getDataKey, checkItem, item, change}) => {

    let stringToDivide = getExtraKey!==false?checkItem:item[getDataKey];
    let data = stringToDivide.split("-")
    return (
        <div id={item['workOrderId']} onClick={change} className={'dtableCols'}>
            <Chip
                className={`priorityPM`}
                avatar={<Avatar>{data[0]}</Avatar>}
                label={data[1]}
            />        
        </div>
    )
}
