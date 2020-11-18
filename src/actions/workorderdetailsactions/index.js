/**
 * Description: Create WO Details Component
 * Author: Carlos Blanco
 * Created: 9/8/2020
 * Ticket: ET-253
 */
//Basic imports
import * as types from '../../constants';
import { apiDetailsWO } from '../../api';


export const receiveDetailsWOData = (data) => {
    return {type: types.RECEIVE_DETAILS_WO_DATA, data: data};
}

export const fetchDetailsWOData = async (dtlsID, token) => {
    const accessFetchToken = (tk) => {
        return tk.data
    }
    const accessDtlId = (id) => {
        return id
    }    
    let accessToken = await accessFetchToken(token)
    let idDtls = await accessDtlId(dtlsID)
    let init = { 
        headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json',
        } 
    }  
    console.log(apiDetailsWO+idDtls)
    return dispatch => {
        return fetch(apiDetailsWO+idDtls, init)
            .then(response => response.json())
            .then(json => dispatch(receiveDetailsWOData(json)));
    }
}
