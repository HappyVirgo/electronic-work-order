/**
 * Description: Create notes component
 * Author: Carlos Blanco
 * Created: 9/14/2020
 * Ticket: ET-257
 */
//Basic imports
import * as types from '../../constants';
import { apiNotesWO } from '../../api/';

export const receiveNotesWOData = (data) => {
    return {type: types.RECEIVE_NOTES_DATA, data: data};
}

export const addNoteWOData = (data) => {
    return {type: types.ADD_NOTE, data: data}
}

export const fetchNotesWOData =  async (dtlsID, token) => {
    const notesURL = "/note/aggregate"
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
    
    return dispatch => {
        return fetch(apiNotesWO+idDtls+notesURL, init)
            .then(response => response.json())
            .then(json => dispatch(receiveNotesWOData(json)));
    }  
}

export const createNoteWOData = async (noteDescription, dtlsID, token, userId="2152") => {
    console.log("token", token)
    const addNoteURL = "/note"
    const accessFetchToken = (tk) => {
        return tk.data
    }  
    const accessDtlId = (id) => {
        return id
    }       
    let accessToken = await accessFetchToken(token)
    let idDtls = await accessDtlId(dtlsID)
    
    let data = {
        userId,
        description: noteDescription
    }

    const requestOptions = {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    };
    return dispatch => {
        return fetch(apiNotesWO+idDtls+addNoteURL, requestOptions)
            .then(response => response.json())
            .then(json => dispatch(receiveNotesWOData(json)));
    }
}