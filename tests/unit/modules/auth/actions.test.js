import 'isomorphic-fetch';
import 'whatwg-fetch';
import fetchMock from 'fetch-mock';
import TestUtils from 'react-addons-test-utils';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { List, Map, fromJS, Set, OrderedSet } from 'immutable';
import { mount } from 'enzyme'
import { createURL } from 'src/utils/callApi';
import * as actionsCreators from 'src/modules/auth/actions';
import { initialState } from 'src/modules/auth/reducer';
import * as actionTypes from 'src/modules/auth/consts';
import { API } from 'src/constants'
import rootReducer from 'src/reducers';

// init
const beURL = createURL( API.API_URL );
const middlewares = [ thunk, ]; // add your middlewares like `redux-thunk`
const mockStore = configureStore( middlewares )

// This sets the mock adapter on the default instance
let store;

describe( 'Actions', () => {
    describe( '::login', () => {
        afterEach( () => {
            fetchMock.restore()
        } )

        beforeEach( () => {
            store = mockStore( {
                auth: initialState,
                form: {
                    auth: {
                        password: { value: "password" },
                        email: { value: "email" }
                    }
                }
            } )
        } )

        it( 'should create LOGIN, LOGIN_SUCCESS actions and redirect to MarketplaceView', () => {
            //Mocks
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IlRlc3QgVXNlciJ9.J6n4-v0I85zk9MkxBHroZ9ZPZEES-IKeul9ozxYnoZ8'
            const expectesActions = [ {
                    type: actionTypes.LOGIN
                },
                {
                    type: actionTypes.LOGIN_SUCCESS,
                    payload: { token }
                },
                {
                    type: '@@reduxReactRouter/historyAPI',
                    payload: { args: [ null, '/marketplace' ], method: 'pushState' },
                }
            ];

            //Init
            fetchMock.post( beURL({path:'/login'}), { token } );

            //Test
            return store.dispatch( actionsCreators.login() )
                .then( () => {
                    expect( store.getActions() )
                        .to
                        .shallowDeepEqual( expectesActions )
                } )

        } )

        it( ' should create LOGIN, LOGIN_FAIL actions', () => {
            //Mocks
            const expectesActions = [ {
                    type: actionTypes.LOGIN
                },
                {
                    type: actionTypes.LOGIN_FAIL,
                    payload: { status: 401 }
                }
            ];

            //Init
            fetchMock.post( beURL({path:'/login'}), 401 );

            //Test
            return store.dispatch( actionsCreators.login() )
                .should.be.rejected
                .then( e => {
                    expect( e )
                        .to.have.property( 'status' )
                        .and.to.be.equal( 401 );

                    expect( store.getActions() )
                        .to
                        .shallowDeepEqual( expectesActions )
                } )

        } )
    } )

} )
