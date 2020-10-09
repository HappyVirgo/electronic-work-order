/**
* Description: Layouts for status column
* Author: Carlos Blanco
* Date: 10/5/2020
* Ticket: ET-344 
* */

//Layouts
import {
    regularColumn,
    //Status
    statusPending,
    statusAccepted,
    statusUnassigned,
    //Priority
    priorityL1Emergency,
    priorityL2SameDay,
    priorityL3_24Hours,
    priorityL4_48Hours,
    priorityL5_OneWeek,
    priorityL6_30Days,
    priorityPM,
    priorityRFP
} from '../index'

export const renderSingleItem = ({getExtraKey, getDataKey, checkItem, item, change}) => {

    let data
    switch (item[getDataKey][getExtraKey]) {
        //Status
        case "Pending":
            data = statusPending({
                getExtraKey,
                getDataKey,
                checkItem,
                item,
                change
            })
            break;
        case "Pending SP Acceptance":
            data = statusPending({
                getExtraKey,
                getDataKey,
                checkItem,
                item,
                change
            })
            break;
        case "Accepted":
            data = statusAccepted({
                getExtraKey,
                getDataKey,
                checkItem,
                item,
                change
            })
            break;
        case "UnAssigned":
            data = statusUnassigned({
                getExtraKey,
                getDataKey,
                checkItem,
                item,
                change
            })
            break;
        case "Not Fixed":
            data = statusUnassigned({
                getExtraKey,
                getDataKey,
                checkItem,
                item,
                change
            })
            break;
        case "Rejected":
            data = statusUnassigned({
                getExtraKey,
                getDataKey,
                checkItem,
                item,
                change
            })
            break;
        case "Complete":
            data = statusAccepted({
                getExtraKey,
                getDataKey,
                checkItem,
                item,
                change
            })
            break;
        case "EnRoute":
            data = statusPending({
                getExtraKey,
                getDataKey,
                checkItem,
                item,
                change
            })
            break;
        case "Arrived":
            data = statusAccepted({
                getExtraKey,
                getDataKey,
                checkItem,
                item,
                change
            })
            break;
        case "Pending Parts":
            data = statusPending({
                getExtraKey,
                getDataKey,
                checkItem,
                item,
                change
            })
            break;
        case "Proposal Submitted":
            data = statusAccepted({
                getExtraKey,
                getDataKey,
                checkItem,
                item,
                change
            })
            break;
        case "Proposal Approved":
            data = statusAccepted({
                getExtraKey,
                getDataKey,
                checkItem,
                item,
                change
            })
            break;
        case "Return Visit Required":
            data = statusUnassigned({
                getExtraKey,
                getDataKey,
                checkItem,
                item,
                change
            })
            break;
        case "Submitting Proposal":
            data = statusPending({
                getExtraKey,
                getDataKey,
                checkItem,
                item,
                change
            })
            break;
        case "Cancelled":
            data = statusUnassigned({
                getExtraKey,
                getDataKey,
                checkItem,
                item,
                change
            })
            break;
        case "ReAssign":
            data = statusUnassigned({
                getExtraKey,
                getDataKey,
                checkItem,
                item,
                change
            })
            break;
        case "Proposal Rejected":
            data = statusUnassigned({
                getExtraKey,
                getDataKey,
                checkItem,
                item,
                change
            })
            break;
            //Priority
        case "L1 - Emergency":
            data = priorityL1Emergency({
                getExtraKey,
                getDataKey,
                checkItem,
                item,
                change
            })
            break;
        case "L2 - Same Day":
            data = priorityL2SameDay({
                getExtraKey,
                getDataKey,
                checkItem,
                item,
                change
            })
            break;
        case "L3 - 24 Hours":
            data = priorityL3_24Hours({
                getExtraKey,
                getDataKey,
                checkItem,
                item,
                change
            })
            break;
        case "L4 - 48 Hours":
            data = priorityL4_48Hours({
                getExtraKey,
                getDataKey,
                checkItem,
                item,
                change
            })
            break;
        case "L5 - One Week":
            data = priorityL5_OneWeek({
                getExtraKey,
                getDataKey,
                checkItem,
                item,
                change
            })
            break;
        case "L6 - 30 Days":
            data = priorityL6_30Days({
                getExtraKey,
                getDataKey,
                checkItem,
                item,
                change
            })
            break;
        case "PM":
            data = priorityPM({
                getExtraKey,
                getDataKey,
                checkItem,
                item,
                change
            })
            break;
        case "RFP - Proposal":
            data = priorityRFP({
                getExtraKey,
                getDataKey,
                checkItem,
                item,
                change
            })
            break;
        default:
            data = regularColumn({
                getExtraKey,
                getDataKey,
                checkItem,
                item,
                change
            })
            break;
    }
    
    return data
}