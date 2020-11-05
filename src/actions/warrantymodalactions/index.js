/**
 * Description: Create Warranty Modal
 * Author: Carlos Blanco
 * Created: 11/4/2020
 * Ticket: ET-266
 */

//Basic imports
import * as types from '../../constants';
import { apiWarranty } from '../../api';


export const receiveWarrantyWOData = (data) => {
    return {type: types.RECEIVE_WARRANTY_WO_DATA, data: data};
}

export const fetchWarrantyWOData = async (dtlsID, token) => {
    const warrantyURL = "/warranties"
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
    const emptydata = []    
    console.log(apiWarranty+idDtls+warrantyURL)  
    return dispatch => {
        return fetch(apiWarranty+idDtls+warrantyURL, init)
            .then(response => {
                if (!response.ok) {
                    return emptydata
                }else{
                    return response.json()
                }
                
            })
            .then(json => dispatch(receiveWarrantyWOData(json)));
    }
}
