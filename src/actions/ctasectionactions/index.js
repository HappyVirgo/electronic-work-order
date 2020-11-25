/**
 * Description: Create CTA components
 * Author: Carlos Blanco
 * Created: 8/31/2020
 * Ticket: ET-242
 */
//Basic imports
import * as types from '../../constants';
import { apiCTA } from '../../api/';

export const receiveCTAsData = (data) => {
    return {
        type: types.RECEIVE_CTA_DATA,
        data: data
    };
}

export const fetchCTAsData =  async (token, userID) => {
    const ctaURL = "/landing"
    const accessFetchToken = (tk) => {
        return tk.data
    }
    const accessFetchUserId = (id) => {
        return id
    }    
    let accessToken = await accessFetchToken(token)
    let accessUserId = await accessFetchUserId(userID)
    let init = { 
        headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json',
        } 
    }  
    return dispatch => {
        return fetch(apiCTA+accessUserId+ctaURL, init)
            .then(response => response.json())
            .then(json => dispatch(receiveCTAsData(json)));
    };   
}