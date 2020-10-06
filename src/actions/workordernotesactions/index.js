/**
 * Description: Create notes component
 * Author: Carlos Blanco
 * Created: 9/14/2020
 * Ticket: ET-257
 */
//Basic imports
import * as types from '../../constants';
import { apiNotesWO } from '../../api/';

export const receiveNotesWOData = (data) => {
    return {type: types.RECEIVE_NOTES_DATA, data: data};
}

export const fetchNotesWOData =  async (token) => {
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
        return fetch(apiNotesWO, init)
            .then(response => response.json())
            .then(json => dispatch(receiveNotesWOData(json)));
    }  
}