/**
 * Description: OAuth2 Client Config
 * Author: Carlos Blanco
 * Created: 9/29/2020
 * Ticket: ET-390
 */

//Basic imports
import ClientOAuth2 from 'client-oauth2'
import * as types from '../../constants';

export const receiveToken = (data) => {
    return {
        type: types.RECEIVE_TOKEN,
        data: data
    };
}

const oauth2token = new ClientOAuth2({
    clientId: '6ic74shi9pk9p8nj44c17aks21',
    clientSecret: '1gdskv3iivvhfil887m3ef0tpuqpjvdq2ch6mg7psr5317j89von',
    accessTokenUri: 'https://auth.ecotrak.com/oauth2/token'
})

export const oauthFetchToken = () => {
    return dispatch => {
        return oauth2token.credentials.getToken()
            .then(user => user.accessToken)
            .then(data => dispatch(receiveToken(data)));
    };        
}