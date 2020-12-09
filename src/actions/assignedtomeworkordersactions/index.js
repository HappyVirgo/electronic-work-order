/**
 * Description: Assigned to me WO
 * Author: Carlos Blanco
 * Created: 9/9/2020
 * Ticket: ET-329
 */
//Basic imports
import * as types from '../../constants';
import { apiAssignedToMeWO } from '../../api';


export const receiveAssignedToMeWOData = (data) => {
    return {type: types.RECEIVE_ASSIGNED_TO_ME_WO_DATA, data: data};
}

export const fetchAssignedToMeWOData = async (token, userId) => {
    const assigntomeURL = "/assigned"
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
        return fetch(apiAssignedToMeWO+accessUserId+assigntomeURL, init)
            .then(response => response.json())
            .then(json => dispatch(receiveAssignedToMeWOData(json)));
    }
}
