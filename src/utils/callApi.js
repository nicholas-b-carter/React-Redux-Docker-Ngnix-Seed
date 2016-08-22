import 'isomorphic-fetch';
import url from 'url';
import { API_URL } from 'src/constants/api';
import es6Promise from 'es6-promise';
es6Promise.polyfill();

// Parse

export function checkHttpStatus( response ) {
    if ( response.status >= 200 && response.status < 300 ) {
        return response
    }
    throw response
}

export function parseJSON( response ) {
    return response.json();
}

// API url generetors
export const createURL = ( host ) => ( request ) => {
    const base = url.parse( host );
    const extend = Object.assign( {}, base, {
        pathname: request.path,
        query: request.query
    } );
    return url.format( extend );
}

const createHeaders = ( request, token = null ) => {
    const headers = new Headers();
    headers.append( 'Accept', 'application/json' )
    headers.append( 'Content-Type', 'application/json' )
    if ( token ) {
        headers.append( 'Authorization', `Bearer ${token}` );
    }
    if ( request.headers ) {
        for ( let prop in obj ) {
            if ( obj.hasOwnProperty( prop ) ) {
                headers.append( prop, obj[ prop ] );
            }
        }
    }
    return headers;
}
const createBody = ( response ) => {
    return JSON.stringify( response.data )
}

const createRequest = ( request, token = null ) => {
    return {
        headers: createHeaders( request, token ),
        body: createBody( request ),
        method: request.method || 'GET'
    }
}

//actionsCreators
function start( type ) {
    return { type }
}

function success( type, payload ) {
    return { type: type + '_SUCCESS', payload }
}

function fail( type, payload ) {
    return { type: type + '_FAIL', payload }
}

export default function ( dispatch, state, action ) {
    const beURL = createURL( API_URL );
    const { type, request } = action;
    dispatch( start( type ) );
    const token = state()
        .auth
        .get( 'token' );
    return fetch(
            beURL( request ),
            createRequest( request, token ) )
        .then( checkHttpStatus )
        .then( parseJSON )
        .then( response => {
            dispatch( success( type, response ) );
            return Promise.resolve( response );
        } )
        .catch( response => {
            dispatch( fail( type, response ) );
            return Promise.reject( response );
        } )
}
