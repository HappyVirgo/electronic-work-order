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

export const fetchUnassignedWOData = async (token, userId) => {
    const unassignURL = "/unassigned"
    const accessFetchToken = (tk) => {
        return tk.data
    }
    const accessFetchUserId = (id) => {
        return id
    }    
    let accessToken = await accessFetchToken(token)
    let accessUserId = await accessFetchUserId(userId)
    let init = { 
        headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json',
        } 
    }  
    return dispatch => {
        return fetch(apiUnassignedWO+accessUserId+unassignURL, init)
            .then(response => response.json())
            .then(json => dispatch(receiveUnassignedWOData(json)));
    }
}
