/**
 * Description: Display user information
 * Author: Carlos Blanco
 * Created: 8/27/2020
 * Ticket: ET-235
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