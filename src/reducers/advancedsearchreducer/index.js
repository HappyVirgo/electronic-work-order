/**
 * Description: Create Advanced Search Component
 * Author: Carlos Blanco
 * Created: 10/30/2020
 * Ticket: ET-237
 */
//Basic imports
import { handleActions } from 'redux-actions'
import * as types from '../../constants/';
import initialState from '../initialstate';

const advancedSearchDataReducer = handleActions({
    [types.RECEIVE_SEARCH_DATA]: (state, action) => {
        return {
            ...state,
            data: action.data
        };    
    }    
}, initialState);

export default advancedSearchDataReducer;