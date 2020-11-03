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

export const fetchHistoryWOData = async (dtlsID, token) => {
    const HistoryURL = "249114/history"
    const accessFetchToken = (tk) => {
        return tk.data
    }  
    const accessDtlId = (id) => {
        return id
    }       
    let accessToken = await accessFetchToken(token)
    let idDtls = await accessDtlId(dtlsID)

    let init = { 
        headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json',
        } 
    } 
    return dispatch => {
        return fetch(apiHistoryWO+HistoryURL, init)
            .then(response => response.json())
            .then(json => dispatch(receiveHistoryWOData(json)));
    }
}
