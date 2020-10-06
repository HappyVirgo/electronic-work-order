/**
 * Description: Create Attachments Component
 * Author: Carlos Blanco
 * Created: 9/9/2020
 * Ticket: ET-258
 */
//Basic imports
import * as types from '../../constants';
import { apiAttachmentsWO } from '../../api';


export const receiveAttachmentsWOData = (data) => {
    return {type: types.RECEIVE_ATTACHMENTS_WO_DATA, data: data};
}

export const fetchAttachmentsWOData = async (token) => {
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
        return fetch(apiAttachmentsWO, init)
            .then(response => response.json())
            .then(json => dispatch(receiveAttachmentsWOData(json)));
    }
}
