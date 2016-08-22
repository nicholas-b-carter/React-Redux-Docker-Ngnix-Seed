import R from 'ramda';
import { List, Map, fromJS, Set, OrderedSet } from 'immutable';
import { createReducer, mapKeyToArray, sortByFrequency } from 'src/utils';
import { push } from 'redux-router';
import { getValues } from 'redux-form';
import jwtDecode from 'jwt-decode';
import * as actionTypes from './consts'
import _debug from 'debug'
const debug = _debug( 'app:modules:format' )

export const initialState = Map( {
    isAuthenticated: false,
    isAuthenticating: false,
    user: null,
    statusText: null,
    token: null,
} );
export default createReducer( initialState, {
    [ actionTypes.LOGIN ]: ( state, payload ) => {
        return fromJS( state )
            .merge(
                fromJS( {
                    isAuthenticating: true,
                    statusText: null,
                } )
            )
    },
    [ actionTypes.LOGIN_SUCCESS ]: ( state, payload ) => {
        return state.mergeDeep( fromJS( {
            isAuthenticating: false,
            isAuthenticated: true,
            token: payload.token,
            user: jwtDecode( payload.token ),
            statusText: 'You have been successfully logged in.',
        } ) );
    },
    [ actionTypes.LOGIN_FAIL ]: ( state, error ) =>
        state
        .mergeDeep( {
            statusText: `Authentication Error: ${error.status} ${error.statusText}`
        } ),
    [ actionTypes.LOGOUT ]: ( state, payload ) => {
        return state.merge( {
            isAuthenticating: false,
            isAuthenticated: false,
            token: null,
            user: null,
            statusText: 'You have been successfully logged out.',
        } );
    }
} );
