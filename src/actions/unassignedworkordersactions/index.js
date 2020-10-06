/**
 * Description: Unassigned WO
 * Author: Carlos Blanco
 * Created: 9/9/2020
 * Ticket: ET-331
 */
//Basic imports
import * as types from '../../constants';
import { apiUnassignedWO } from '../../api';

export const receiveUnassignedWOData = (data) => {
    return {type: types.RECEIVE_UNASSIGNED_DATA, data: data};
}

export const fetchUnassignedWOData = async (token) => {
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
        return fetch(apiUnassignedWO, init)
            .then(response => response.json())
            .then(json => dispatch(receiveUnassignedWOData(json)));
    }
}
