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


export const fetchEmergencyWOData = async (token) => {
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
        return fetch(apiEmergencyWO, init)
            .then(response => response.json())
            .then(json => dispatch(receiveEmergencyWOData(json)));
    };     
}
