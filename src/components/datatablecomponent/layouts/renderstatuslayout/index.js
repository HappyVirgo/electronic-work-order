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
        <div id={item?item['workOrderId']:""} onClick={change} className={'dtableCols accepted-status'}>
            <span>
                {getExtraKey!==false?checkItem:item[getDataKey]}
            </span>
        </div>            
    )
}
export const statusArrived = ({getExtraKey, getDataKey, checkItem, item, change}) => {
    return (
        <div id={item?item['workOrderId']:""} onClick={change} className={'dtableCols arrived-status'}>
            <span>
                {getExtraKey!==false?checkItem:item[getDataKey]}
            </span>
        </div>            
    )
}
export const statusCancelled = ({getExtraKey, getDataKey, checkItem, item, change}) => {
    return (
        <div id={item?item['workOrderId']:""} onClick={change} className={'dtableCols complete-status'}>           
            <span>
                {getExtraKey!==false?checkItem:item[getDataKey]}
            </span>
        </div>            
    )
}
export const statusProposalApproved = ({getExtraKey, getDataKey, checkItem, item, change}) => {
    return (
        <div id={item?item['workOrderId']:""} onClick={change} className={'dtableCols proposal-approved-status'}>
            <span>
                {getExtraKey!==false?checkItem:item[getDataKey]}
            </span>
        </div>            
    )
}
export const statusProposalSubmitted = ({getExtraKey, getDataKey, checkItem, item, change}) => {
    return (
        <div id={item?item['workOrderId']:""} onClick={change} className={'dtableCols proposal-submitted-status'}>
            <span>
                {getExtraKey!==false?checkItem:item[getDataKey]}
            </span>
        </div>            
    )
}
export const statusSubmittingProposal = ({getExtraKey, getDataKey, checkItem, item, change}) => {
    return (
        <div id={item?item['workOrderId']:""} onClick={change} className={'dtableCols submitting-proposal-status'}>
            <span>
                {getExtraKey!==false?checkItem:item[getDataKey]}
            </span>
        </div>            
    )
}
export const statusComplete = ({getExtraKey, getDataKey, checkItem, item, change}) => {
    return (
        <div id={item?item['workOrderId']:""} onClick={change} className={'dtableCols complete-status'}>
            <span>
                {getExtraKey!==false?checkItem:item[getDataKey]}
            </span>
        </div>            
    )
}
export const statusEnroute = ({getExtraKey, getDataKey, checkItem, item, change}) => {
    return (
        <div id={item?item['workOrderId']:""} onClick={change} className={'dtableCols enroute-status'}>
            <span>
                {getExtraKey!==false?checkItem:item[getDataKey]}
            </span>
        </div>            
    )
}
export const statusReassign = ({getExtraKey, getDataKey, checkItem, item, change}) => {
    return (
        <div id={item?item['workOrderId']:""} onClick={change} className={'dtableCols reassign-status'}>
            <span>
                {getExtraKey!==false?checkItem:item[getDataKey]}
            </span>
        </div>            
    )
}
export const statusUnassigned = ({getExtraKey, getDataKey, checkItem, item, change}) => {
    return (
        <div id={item?item['workOrderId']:""} onClick={change} className={'dtableCols unassigned-status'}>
            <span>
                {getExtraKey!==false?checkItem:item[getDataKey]}
            </span>
        </div>            
    )
}
export const statusNotFixed = ({getExtraKey, getDataKey, checkItem, item, change}) => {
    return (
        <div id={item?item['workOrderId']:""} onClick={change} className={'dtableCols not-fixed-status'}>
            <span>
                {getExtraKey!==false?checkItem:item[getDataKey]}
            </span>
        </div>            
    )
}
export const statusPending = ({getExtraKey, getDataKey, checkItem, item, change}) => {
    return (
        <div id={item?item['workOrderId']:""} onClick={change} className={'dtableCols pending-status'}>           
            <span>
                {getExtraKey!==false?checkItem:item[getDataKey]}
            </span>
        </div>            
    )
}
export const statusPendingSPAcceptance = ({getExtraKey, getDataKey, checkItem, item, change}) => {
    return (
        <div id={item?item['workOrderId']:""} onClick={change} className={'dtableCols pending-sp-acceptance-status'}>           
            <span>
                {getExtraKey!==false?checkItem:item[getDataKey]}
            </span>
        </div>            
    )
}
export const statusPendingParts = ({getExtraKey, getDataKey, checkItem, item, change}) => {
    return (
        <div id={item?item['workOrderId']:""} onClick={change} className={'dtableCols pending-parts-status'}>           
            <span>
                {getExtraKey!==false?checkItem:item[getDataKey]}
            </span>
        </div>            
    )
}
export const statusRejected = ({getExtraKey, getDataKey, checkItem, item, change}) => {
    return (
        <div id={item?item['workOrderId']:""} onClick={change} className={'dtableCols rejected-status'}>           
            <span>
                {getExtraKey!==false?checkItem:item[getDataKey]}
            </span>
        </div>            
    )
}
export const statusProposalRejected = ({getExtraKey, getDataKey, checkItem, item, change}) => {
    return (
        <div id={item?item['workOrderId']:""} onClick={change} className={'dtableCols proposal-rejected-status'}>           
            <span>
                {getExtraKey!==false?checkItem:item[getDataKey]}
            </span>
        </div>            
    )
}
export const statusReturnVisitRequired = ({getExtraKey, getDataKey, checkItem, item, change}) => {
    return (
        <div id={item?item['workOrderId']:""} onClick={change} className={'dtableCols return-visit-required-status'}>           
            <span>
                {getExtraKey!==false?checkItem:item[getDataKey]}
            </span>
        </div>            
    )
}


