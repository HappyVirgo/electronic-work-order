/**
 * Description: Display user information
 * Author: Carlos Blanco
 * Created: 8/27/2020
 * Ticket: ET-235
 */

//Basic imports
import { handleActions } from 'redux-actions'
import * as types from '../../constants/';
import initialState from '../initialstate';

let newState = {}
const userAccountDataReducer = handleActions({
    [types.RECEIVE_USER_DATA]: (state, action) => {
        newState.userdata = action.userdata;
        return newState;    
    }    
}, initialState);

export default userAccountDataReducer;