/**
 * Description: Create History Component
 * Author: Carlos Blanco
 * Created: 9/10/2020
 * Ticket: ET-259
 */
//Basic imports
import * as types from '../../constants';
import { apiHistoryWO } from '../../api';

export const receiveHistoryWOData = (data) => {
    return {type: types.RECEIVE_HISTORY_DATA, data: data};
}

export const fetchHistoryWOData = async (token) => {
    const accessFetchToken = (tk) => {
        return tk.data
    }  
    let accessToken = await accessFetchToken(token)
    let init = { 
        headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json',
        } 
    }  
    return dispatch => {
        return fetch(apiHistoryWO, init)
            .then(response => response.json())
            .then(json => dispatch(receiveHistoryWOData(json)));
    }
}
