/**
 * Description: Display user information
 * Author: Carlos Blanco
 * Created: 11/02/2020
 * Ticket: ET-292
 */
import * as types from '../../constants';
import { apiUsers } from '../../api/'


export const receiveUserData = (user) => {
    return {type: types.RECEIVE_USER_DATA, userdata: user};
}

export const fetchUsersInformation = () => {
    return dispatch => {
        return fetch(apiUsers)
        .then(response => response.json())
        .then(json => dispatch(receiveUserData(json)))                  
    };    
};