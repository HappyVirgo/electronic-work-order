/**
 * Description: Create Data Table Component
 * Author: Carlos Blanco
 * Created: 9/2/2020
 * Ticket: ET-249
 */
//Basic imports
import * as types from '../../constants';
import { apiEmergencyWO } from '../../api';


export const receiveEmergencyWOData = (data) => {
    return {type: types.RECEIVE_EMERGENCY_WO_DATA, data: data};
}

export const fetchEmergencyWOData = async (token, userId) => {
    const emergencyURL = "/emergency"
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
        return fetch(apiEmergencyWO+accessUserId+emergencyURL, init)
            .then(response => response.json())
            .then(json => dispatch(receiveEmergencyWOData(json)));
    };     
}
