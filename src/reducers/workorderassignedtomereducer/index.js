/**
 * Description: Assigned to me WO
 * Author: Carlos Blanco
 * Created: 9/9/2020
 * Ticket: ET-329
 */

//Basic imports
import { handleActions } from 'redux-actions'
import * as types from '../../constants';
import initialState from '../initialstate';

let newState = {};
const assignedWorkOrdersReducer = handleActions({
    [types.RECEIVE_ASSIGNED_TO_ME_WO_DATA]: (state, action) => {
        newState.data = action.data;
        return newState;    
    }  
}, initialState);

export default assignedWorkOrdersReducer;