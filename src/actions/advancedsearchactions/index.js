/**
 * Description: Create Advanced Search Component
 * Author: Carlos Blanco
 * Created: 10/30/2020
 * Ticket: ET-237
 */
//Basic imports
import * as types from '../../constants';
import { apiSearch } from '../../api/';

export const receiveSearchWOData = (data) => {
    return {type: types.RECEIVE_SEARCH_DATA, data: data};
}

/**
 * Search by ids:
 * 0 = default
 * 1 = Service Provider
 * 2 = Asset Type
 * 3 = Problem Type
 * 4 = Trade Type
 */
export const fetchSearchData =  async (searchby, token) => {
    const accessFetchToken = (tk) => {
        return tk.data
    }  
    const accessSearchby = (term) => {
        return term
    }       
    let accessToken = await accessFetchToken(token)
    //let searchBy = await accessSearchby(searchby)
    let searchBy = "?tradeType=oven"
    let init = { 
        headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json',
        } 
    }  
    
    return dispatch => {
        return fetch(apiSearch+searchBy, init)
            .then(response => response.json())
            .then(json => dispatch(receiveSearchWOData(json)));
    }  
}