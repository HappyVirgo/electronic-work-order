/**
 * Description: Create CTA Components
 * Author: Carlos Blanco
 * Created: 9/4/2020
 * Ticket: ET-242
 */
//Basic imports
import * as types from '../../constants';
import { apiPendingWO } from '../../api';


export const receivePendingWOData = (data) => {
    return {type: types.RECEIVE_PENDING_WO_DATA, data: data};
}

export const fetchPendingWOData = async (token, userId) => {
    const pendingURL = "/pending"
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
        return fetch(apiPendingWO+accessUserId+pendingURL, init)
            .then(response => response.json())
            .then(json => dispatch(receivePendingWOData(json)));
    }
}
