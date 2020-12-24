/**
 * Description: Create WO Details Component
 * Author: Carlos Blanco
 * Created: 9/8/2020
 * Ticket: ET-253
 */

//Basic imports
import { handleActions } from 'redux-actions'
import * as types from '../../constants/';
import initialState from '../initialstate';

const workOrderDetailsReducer = handleActions({
    [types.RECEIVE_DETAILS_WO_DATA]: (state, action) => {
        return {
            ...state,
            data: action.data
        };    
    }, 
    [types.UPDATE_WO_STATUS]: (state, action) => {
        return {
            ...state,
            data: action.data
        };    
    },
    [types.RECEIVE_SERVICE_PROVIDERS]: (state, action) => {
        return {
            ...state,
            data: action.data
        };
    },    
}, initialState);

export default workOrderDetailsReducer;