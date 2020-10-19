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
    statusEnroute,
    statusPendingSPAcceptance,
    statusNotFixed,
    statusRejected,
    statusComplete,
    statusArrived,
    statusPendingParts,
    statusProposalSubmitted,   
    statusProposalApproved, 
    statusReturnVisitRequired,
    statusSubmittingProposal,
    statusCancelled,
    statusReassign,
    statusProposalRejected,
    //Priority
    priorityL1Emergency,
    priorityL2SameDay,
    priorityL3_24Hours,
    priorityL4_48Hours,
    priorityL5_OneWeek,
    priorityL6_30Days,
    priorityL7_30Days,
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
            data = statusPendingSPAcceptance({
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
            data = statusNotFixed({
                getExtraKey,
                getDataKey,
                checkItem,
                item,
                change
            })
            break;
        case "Rejected":
            data = statusRejected({
                getExtraKey,
                getDataKey,
                checkItem,
                item,
                change
            })
            break;
        case "Complete":
            data = statusComplete({
                getExtraKey,
                getDataKey,
                checkItem,
                item,
                change
            })
            break;
        case "EnRoute":
            data = statusEnroute({
                getExtraKey,
                getDataKey,
                checkItem,
                item,
                change
            })
            break;
        case "Arrived":
            data = statusArrived({
                getExtraKey,
                getDataKey,
                checkItem,
                item,
                change
            })
            break;
        case "Pending Parts":
            data = statusPendingParts({
                getExtraKey,
                getDataKey,
                checkItem,
                item,
                change
            })
            break;
        case "Proposal Submitted":
            data = statusProposalSubmitted({
                getExtraKey,
                getDataKey,
                checkItem,
                item,
                change
            })
            break;
        case "Proposal Approved":
            data = statusProposalApproved({
                getExtraKey,
                getDataKey,
                checkItem,
                item,
                change
            })
            break;
        case "Return Visit Required":
            data = statusReturnVisitRequired({
                getExtraKey,
                getDataKey,
                checkItem,
                item,
                change
            })
            break;
        case "Submitting Proposal":
            data = statusSubmittingProposal({
                getExtraKey,
                getDataKey,
                checkItem,
                item,
                change
            })
            break;
        case "Cancelled":
            data = statusCancelled({
                getExtraKey,
                getDataKey,
                checkItem,
                item,
                change
            })
            break;
        case "ReAssign":
            data = statusReassign({
                getExtraKey,
                getDataKey,
                checkItem,
                item,
                change
            })
            break;
        case "Proposal Rejected":
            data = statusProposalRejected({
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
        case "L7 - 30 Days":
            data = priorityL7_30Days({
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