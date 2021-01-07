/**
 * Description: Create CTA Components
 * Author: Kiran Nasim
 * Created: 1/6/2021
 */
//Basic imports
import * as types from '../../constants';
import { apiOpenWO } from '../../api';


export const receiveOpenWOData = (data) => {
    return {type: types.RECEIVE_OPEN_WO_DATA, data: data};
}

export const fetchOpenWOData = async (token, userId) => {
    const openURL = "/open"
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
        return fetch(apiOpenWO+accessUserId+openURL, init)
            .then(response => response.json())
            .then(json => dispatch(receiveOpenWOData(json)));
    }
}
