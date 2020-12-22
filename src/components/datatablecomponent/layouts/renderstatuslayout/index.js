/**
* Description: Render status item column 
* Author: Carlos Blanco
* Date: 10/5/2020
* Ticket: ET-344 
* */
//Basic imports
import React from "react";

export const statusAccepted = ({getExtraKey, getDataKey, checkItem, item, change}) => {
    return (
        <div id={item?item['workOrderId']:""} onClick={change} className={'dtableCols accepted-status status-tag'}>
            <span>
                {getExtraKey!==false?checkItem:item[getDataKey]}
            </span>
        </div>            
    )
}
export const statusArrived = ({getExtraKey, getDataKey, checkItem, item, change}) => {
    return (
        <div id={item?item['workOrderId']:""} onClick={change} className={'dtableCols arrived-status status-tag'}>
            <span>
                {getExtraKey!==false?checkItem:item[getDataKey]}
            </span>
        </div>            
    )
}
export const statusCancelled = ({getExtraKey, getDataKey, checkItem, item, change}) => {
    return (
        <div id={item?item['workOrderId']:""} onClick={change} className={'dtableCols complete-status status-tag'}>           
            <span>
                {getExtraKey!==false?checkItem:item[getDataKey]}
            </span>
        </div>            
    )
}
export const statusProposalApproved = ({getExtraKey, getDataKey, checkItem, item, change}) => {
    return (
        <div id={item?item['workOrderId']:""} onClick={change} className={'dtableCols proposal-approved-status status-tag'}>
            <span>
                {getExtraKey!==false?checkItem:item[getDataKey]}
            </span>
        </div>            
    )
}
export const statusProposalSubmitted = ({getExtraKey, getDataKey, checkItem, item, change}) => {
    return (
        <div id={item?item['workOrderId']:""} onClick={change} className={'dtableCols proposal-submitted-status status-tag'}>
            <span>
                {getExtraKey!==false?checkItem:item[getDataKey]}
            </span>
        </div>            
    )
}
export const statusSubmittingProposal = ({getExtraKey, getDataKey, checkItem, item, change}) => {
    return (
        <div id={item?item['workOrderId']:""} onClick={change} className={'dtableCols submitting-proposal-status status-tag'}>
            <span>
                {getExtraKey!==false?checkItem:item[getDataKey]}
            </span>
        </div>            
    )
}
export const statusComplete = ({getExtraKey, getDataKey, checkItem, item, change}) => {
    return (
        <div id={item?item['workOrderId']:""} onClick={change} className={'dtableCols complete-status status-tag'}>
            <span>
                {getExtraKey!==false?checkItem:item[getDataKey]}
            </span>
        </div>            
    )
}
export const statusEnroute = ({getExtraKey, getDataKey, checkItem, item, change}) => {
    return (
        <div id={item?item['workOrderId']:""} onClick={change} className={'dtableCols enroute-status status-tag'}>
            <span>
                {getExtraKey!==false?checkItem:item[getDataKey]}
            </span>
        </div>            
    )
}
export const statusReassign = ({getExtraKey, getDataKey, checkItem, item, change}) => {
    return (
        <div id={item?item['workOrderId']:""} onClick={change} className={'dtableCols reassign-status status-tag'}>
            <span>
                {getExtraKey!==false?checkItem:item[getDataKey]}
            </span>
        </div>            
    )
}
export const statusUnassigned = ({getExtraKey, getDataKey, checkItem, item, change}) => {
    return (
        <div id={item?item['workOrderId']:""} onClick={change} className={'dtableCols unassigned-status status-tag'}>
            <span>
                {getExtraKey!==false?checkItem:item[getDataKey]}
            </span>
        </div>            
    )
}
export const statusNotFixed = ({getExtraKey, getDataKey, checkItem, item, change}) => {
    return (
        <div id={item?item['workOrderId']:""} onClick={change} className={'dtableCols not-fixed-status status-tag'}>
            <span>
                {getExtraKey!==false?checkItem:item[getDataKey]}
            </span>
        </div>            
    )
}
export const statusPending = ({getExtraKey, getDataKey, checkItem, item, change}) => {
    return (
        <div id={item?item['workOrderId']:""} onClick={change} className={'dtableCols pending-status status-tag'}>           
            <span>
                {getExtraKey!==false?checkItem:item[getDataKey]}
            </span>
        </div>            
    )
}
export const statusPendingSPAcceptance = ({getExtraKey, getDataKey, checkItem, item, change}) => {
    return (
        <div id={item?item['workOrderId']:""} onClick={change} className={'dtableCols pending-sp-acceptance-status status-tag'}>           
            <span>
                {getExtraKey!==false?checkItem:item[getDataKey]}
            </span>
        </div>            
    )
}
export const statusPendingParts = ({getExtraKey, getDataKey, checkItem, item, change}) => {
    return (
        <div id={item?item['workOrderId']:""} onClick={change} className={'dtableCols pending-parts-status status-tag'}>           
            <span>
                {getExtraKey!==false?checkItem:item[getDataKey]}
            </span>
        </div>            
    )
}
export const statusRejected = ({getExtraKey, getDataKey, checkItem, item, change}) => {
    return (
        <div id={item?item['workOrderId']:""} onClick={change} className={'dtableCols rejected-status status-tag'}>           
            <span>
                {getExtraKey!==false?checkItem:item[getDataKey]}
            </span>
        </div>            
    )
}
export const statusProposalRejected = ({getExtraKey, getDataKey, checkItem, item, change}) => {
    return (
        <div id={item?item['workOrderId']:""} onClick={change} className={'dtableCols proposal-rejected-status status-tag'}>           
            <span>
                {getExtraKey!==false?checkItem:item[getDataKey]}
            </span>
        </div>            
    )
}
export const statusReturnVisitRequired = ({getExtraKey, getDataKey, checkItem, item, change}) => {
    return (
        <div id={item?item['workOrderId']:""} onClick={change} className={'dtableCols return-visit-required-status status-tag'}>           
            <span>
                {getExtraKey!==false?checkItem:item[getDataKey]}
            </span>
        </div>            
    )
}


