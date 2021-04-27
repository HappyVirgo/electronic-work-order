/**
 * Description: Create CTA components
 * Author: Carlos Blanco
 * Created: 8/31/2020
 * Ticket: ET-242
 */

//Basic imports
import { handleActions } from 'redux-actions'
import * as types from '../../constants/';
import initialState from '../initialstate';

const ctaSectionDataReducer = handleActions({
    [types.RECEIVE_CTA_DATA]: (state, action) => {
        return {
            ...state,
            data: action.data
        };    
    }    
}, initialState);

export default ctaSectionDataReducer;