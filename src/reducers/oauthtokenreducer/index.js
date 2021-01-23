/**
 * Description: OAuth2 Client Config
 * Author: Carlos Blanco
 * Created: 9/29/2020
 * Ticket: ET-390
 */

//Basic imports
import { handleActions } from 'redux-actions'
import * as types from '../../constants';
import initialState from '../initialstate';

const oauthTokenReducer = handleActions({
    [types.RECEIVE_TOKEN]: (state, action) => {
        return {
            ...state,
            data: action.data
        };    
    }    
}, initialState);

export default oauthTokenReducer;