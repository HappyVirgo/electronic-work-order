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
 * 2 = Service Provider
 * 3 = Asset Type
 * 4 = Problem Type
 * 5 = Trade Type
 */

export const fetchSearchData =  async (searchTerm, searchBy, token, userId) => {
    const searchURL = "/search"
    const accessFetchToken = (tk) => {
        return tk.data
    }
    const accessFetchUserId = (id) => {
        return id
    }     
    let accessToken = await accessFetchToken(token)
    let accessUserId = await accessFetchUserId(userId)
    let searchParams
    switch (searchBy) {
        case 2:
            searchParams = `?serviceProvider=${searchTerm}`
            break;
        case 3:
            searchParams = `?assetType=${searchTerm}`
            break;
        case 4:
            searchParams = `?problemType=${searchTerm}`
            break;  
        case 5:
            searchParams = `?tradeType=${searchTerm}`
            break;
        case 6:
            searchParams = `?categoryType=${searchTerm}`
            break;                      
        default:
            break;
    }
    let init = { 
        headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json',
        } 
    } 
    const emptydata = { 
        work_orders: []
    }
    return dispatch => {
        return fetch(apiSearch+accessUserId+searchURL+searchParams, init)
            .then(response => {
                if (!response.ok) {
                    return emptydata
                }else{
                    return response.json()
                }
                
            })
            .then(json => dispatch(receiveSearchWOData(json))           
        );
    };     
}