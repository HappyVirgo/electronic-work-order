/**
 * Description: Create WO Details Component
 * Author: Carlos Blanco
 * Created: 9/8/2020
 * Ticket: ET-253
 */
//Basic imports
import * as types from '../../constants';
import { apiDetailsWO } from '../../api';

const accessFetchToken = (tk) => {
    return tk.data
}
const accessDtlId = (id) => {
    return id
}

export const receiveDetailsWOData = (data) => {
    return {type: types.RECEIVE_DETAILS_WO_DATA, data: data};
}

export const fetchDetailsWOData = async (dtlsID, token) => {   
    let accessToken = await accessFetchToken(token)
    let idDtls = await accessDtlId(dtlsID)
    let init = { 
        headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json',
        } 
    } 
    return dispatch => {
        return fetch(apiDetailsWO+idDtls, init)
            .then(response => response.json())
            .then(json => dispatch(receiveDetailsWOData(json)));
    }
}

export const changeWOStatus = (data) => {
    return {type: types.UPDATE_WO_STATUS, data: data};
}

export const updateWOStatus = async (dtlsID, token, updatedStatus) => {
    const updateStatusURL = "/status"
    let accessToken = await accessFetchToken(token)
    let idDtls = await accessDtlId(dtlsID)

    let data = {
        status: updatedStatus
    }

    const requestOptions = {
        method: 'PUT',
        headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    };

    return dispatch => {
        return fetch(apiDetailsWO+idDtls+updateStatusURL, requestOptions)
            .then(response => response.json())
            .then(json => dispatch(changeWOStatus(json)));
    }
}