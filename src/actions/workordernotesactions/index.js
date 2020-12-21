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
    return { type: types.RECEIVE_NOTES_DATA, data: data };
}

export const addNoteWOData = (data) => {
    return { type: types.ADD_NOTE, data: data }
}

export const fetchNotesWOData = async(dtlsID, token) => {
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
        return fetch(apiNotesWO + idDtls + notesURL, init)
            .then(response => response.json())
            .then(json => dispatch(receiveNotesWOData(json)));
    }
}

export const createNoteWOData = async(noteDescription, dtlsID, token, userId = "2152") => {
    //Real url
    //const addNoteURL = "/note"
    //Fake API url
    const addNoteURL = "/note/aggregate"
    const accessFetchToken = (tk) => {
        return tk.data
    }
    const accessDtlId = (id) => {
        return id
    }
    let accessToken = await accessFetchToken(token)
    let idDtls = await accessDtlId(dtlsID)

    /**
     * Real structure
     */
    /*
    let data = {
        userId,
        description: noteDescription
    }
    */
    //Fake structure
    let data = {
        wonId: 123456,
        wonUserId: 123456,
        wonWorkOrderId: 123456,
        wonNote: noteDescription,
        createdBy: 6038,
        customerIds: null,
        serviceProviderIds: null,
        user: {
          userProfileId: 6014,
          userId: userId,
          companyName: "Testing",
          firstName: "Test",
          lastName: "Test",
          phoneNumber: "800-8000-5555"
        },
        noteType: 0,
        createdAt: "2020-05-20T16:04:14.000+0000",
        updatedAt: "2020-05-20T16:04:14.000+0000"
      }

    const requestOptions = {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    };
    console.log("NOTES: ", apiNotesWO + idDtls + addNoteURL)    
    return dispatch => {
        return fetch(apiNotesWO + idDtls + addNoteURL, requestOptions)
            .then(response => response.json())
            .then(json => dispatch(receiveNotesWOData(json)));
    }
}