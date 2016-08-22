import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { List, Map, fromJS, Set, OrderedSet } from 'immutable';
import { API } from 'src/constants';
import * as actionsCreators from 'src/modules/auth/actions';
import * as actionTypes from 'src/modules/auth/consts';
import reducer, { initialState } from 'src/modules/auth/reducer';
import rootReducer from 'src/reducers';

const middlewares = [ thunk, ];
const mockStore = configureStore( middlewares )

// This sets the mock adapter on the default instance
let store;

describe( 'Reducer', () => {
    afterEach( () => {

    } )

    beforeEach( () => {
        store = mockStore( {
            auth: initialState
        } )
    } )
    describe( '::LOGIN', () => {

        it( 'should enable isAuthenticating ', () => {

            const action = { type: actionTypes.LOGIN };
            const state = reducer( initialState, action );
            expect( state )
                .to.have.property( 'isAuthenticating', true );

        } )

    } )
    describe( '::LOGIN_FAIL', () => {

        it( 'should init auth state with error msg', () => {
            // Mocks
            const status = 504;
            const statusText = 'superwow';
            const action = { type: actionTypes.LOGIN_FAIL, error: { status, statusText } };

            //Init
            const state = reducer( initialState, action );

            //Test
            expect( state )
                .to.eql( Map( {
                    isAuthenticating: false,
                    isAuthenticated: false,
                    user: null,
                    token: null,
                    statusText: `Authentication Error: ${status} ${statusText}`
                } ) )

        } )
        it( 'should stay logged in with error msg', () => {
            // Mocks
            const status = 504;
            const statusText = 'superwow';
            const token = 'tototoken'
            const user = Map( { id: 4, name: 'testUser' } )

            //Init
            const action = { type: actionTypes.LOGIN_FAIL, error: { status, statusText } };
            const initialState = Map( {
                isAuthenticating: false,
                isAuthenticated: true,
                user,
                token,
                statusText: null
            } );
            const state = reducer( initialState, action );

            //Test
            expect( state )
                .to.eql( Map( {
                    isAuthenticating: false,
                    isAuthenticated: true,
                    user,
                    token,
                    statusText: `Authentication Error: ${status} ${statusText}`
                } ) )

        } )

    } )

} )
