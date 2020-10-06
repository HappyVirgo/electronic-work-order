/**
 * Description: Unassigned
 * Author: Carlos Blanco
 * Created: 9/9/2020
 * Ticket: ET-331
 */

//Basic imports
import { handleActions } from 'redux-actions'
import * as types from '../../constants';
import initialState from '../initialstate';

let newState = {};
const unassignedWorkOrdersReducer = handleActions({
    [types.RECEIVE_ASSIGNED_TO_ME_WO_DATA]: (state, action) => {
        newState.data = action.data;
        return newState;    
    }  
}, initialState);

export default unassignedWorkOrdersReducer;