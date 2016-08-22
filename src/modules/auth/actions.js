import callApi from 'src/utils/callApi';
import { List, Map, fromJS } from 'immutable';
import { push } from 'redux-router';
import { getValues } from 'redux-form';
import jwtDecode from 'jwt-decode';
import * as actionTypes from './consts'
import _debug from 'debug'
const debug = _debug('app:modules:format')

/**
 * User logout
 * @return {action} LOGOUT_USER action
 */
export function logout() {
    return {
        type: actionTypes.LOGOUT,
    };
}
/**
 * User logout and redirect to login page
 * @return {actionCreators} a
 */
function logoutAndRedirect() {
    return (dispatch, state) => {
        dispatch(logout());
        dispatch(push('/login'));
    };
}

function loginRequest(credentials) {
    return {
        type: actionTypes.LOGIN,
        request: {
            path: '/login',
            method: 'post',
            data: credentials,
        },
    };
}
/**
 * User login and redirect to path
 * @param  {String} redirect default="marketplace" path to redirect after success
 * @return {actionCreators}          [description]
 */
export function login(redirect = '/marketplace') {
    return (dispatch, state) => {
        const credentials = getValues(state().form.auth);
        return callApi(dispatch, state, loginRequest(credentials))
            .then(() => {
                dispatch(push(redirect))
            });

    };
}
