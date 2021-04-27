/**
 * Description: Create Warranty Modal
 * Author: Carlos Blanco
 * Created: 11/4/2020
 * Ticket: ET-266
 */

//Basic imports
import { handleActions } from 'redux-actions'
import * as types from '../../constants';
import initialState from '../initialstate';

let newState = {};
const warrantyModalReducer = handleActions({
    [types.RECEIVE_WARRANTY_WO_DATA]: (state, action) => {
        newState.data = action.data;
        return newState;    
    }  
}, initialState);

export default warrantyModalReducer;