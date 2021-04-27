/**
 * Description: History Component - TABS
 * Author: Carlos Blanco
 * Created: 9/10/2020
 * Ticket: ET-259
 */

//Basic imports
import { handleActions } from 'redux-actions'
import * as types from '../../constants';
import initialState from '../initialstate';

let newState = {};
const historyWorkOrdersReducer = handleActions({
    [types.RECEIVE_HISTORY_DATA]: (state, action) => {
        newState.data = action.data;
        return newState;    
    }  
}, initialState);

export default historyWorkOrdersReducer;