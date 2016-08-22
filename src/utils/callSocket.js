import 'isomorphic-fetch';
import url from 'url';
import { SOCKET_URL } from 'src/constants/api';
import es6Promise from 'es6-promise';
es6Promise.polyfill();

// Parse

export function checkHttpStatus(resData, jwres) {
    if (jwres.statusCode >= 200 && jwres.statusCode < 300) {
        return jwres
    }
    throw jwres
}
export function parseJSON(response) {
    return response.body;
}
// API url generetors
export const createURL = (host) => (request) => {
    const base = url.parse(host);
    const extend = Object.assign({}, base, {
        pathname: request.path,
        query: request.query
    });
    return url.format(extend);
}


const createRequest = (request, token = null) => {
        return {
            headers: request.headers,
            data: request.data || {},
            method: request.method || 'GET'
        }
    }
    //actionsCreators
function start(type) {
    return { type }
}

function success(type, payload) {
    return { type: type + '_SUCCESS', payload }
}

function fail(type, payload) {
    return { type: type + '_FAIL', payload }
}

export default function(dispatch, state, action) {
    const socketURL = createURL(SOCKET_URL);
    const { type, request } = action;
    dispatch(start(type));
    const token = state()
        .auth
        .get('token');
    return fetch(
            socketURL(request),
            createRequest(request, token))
        .then(checkHttpStatus)
        .then(parseJSON)
        .then(response => {
            dispatch(success(type, response));
            return Promise.resolve(response);
        })
        .catch(response => {
            dispatch(fail(type, response));
            return Promise.reject(response);
        })
}
