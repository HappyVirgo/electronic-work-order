/**
 * Description: Develop Cognito oauth scripts
 * Author: Carlos Blanco
 * Created: 8/20/2020
 * Ticket: ET-267
 */
import oauthTokenReducer from './oauthtokenreducer'
import userAccountDataReducer from './useraccountdatareducer'
import ctaSectionDataReducer from './ctasectionreducer'
import emergencyWorkOrdersReducer from './emergencyworkordersreducer'
import pendingWorkOrdersReducer from './pendingworkordersreducer'
import workOrderDetailsReducer from './workorderdetailsreducer'
import assignedWorkOrdersReducer from './workorderassignedtomereducer'
import unassignedWorkOrdersReducer from './workorderunassignedreducer'
import historyWorkOrdersReducer from './workordershistoryreducer'
import notesWorkOrderReducer from './workordersnotesreducer'
import attachmentsWorkOrdersReducer from './workorderattachmentsreducer'
import advancedSearchDataReducer from './advancedsearchreducer'


export {
    oauthTokenReducer,
    userAccountDataReducer,
    ctaSectionDataReducer,
    advancedSearchDataReducer,
    emergencyWorkOrdersReducer,
    pendingWorkOrdersReducer,
    workOrderDetailsReducer,
    assignedWorkOrdersReducer,
    unassignedWorkOrdersReducer,
    historyWorkOrdersReducer,
    notesWorkOrderReducer,
    attachmentsWorkOrdersReducer
}