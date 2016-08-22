import R from 'ramda'
import request, { createURL } from 'src/utils/callApi'
import { API } from 'src/constants'
import 'isomorphic-fetch';
import 'whatwg-fetch';
import fetchMock from 'fetch-mock';
import configureStore from 'redux-mock-store';
import { List, Map, fromJS, Set, OrderedSet } from 'immutable';

// Mocks
const TEST_API = API.API_URL
const token = 'tototoken'
const user = Map( { id: 4, name: 'testUser' } )
const mockStore = configureStore()

//Init
const loggedInState = Map( {
    isAuthenticating: false,
    isAuthenticated: true,
    user,
    token,
    statusText: null
} );
describe( '❇ CallApi', () => {

    afterEach( () => {} )

    beforeEach( () => {} )

    describe( '::createURL', () => {
        it( 'should use the api', () => {
            // mocks
            const path = '/login'
                // init
            const testApi = createURL( TEST_API );
            expect( testApi( { path: '/login' } ) )
                .to.be.eql( `${TEST_API}${path}` )

        } )
        it( 'shoud add the query params', () => {
            // mocks
            const path = '/login'
            const queryArray = [ 1, 2, 3 ]
            const queryObject = { your: 'mama' }

            // init
            const testApi = createURL( TEST_API );
            expect( testApi( { path, query: queryArray } ) )
                .to.be.eql( `${TEST_API}${path}?0=1&1=2&2=3` )
            expect( testApi( { path, query: queryObject } ) )
                .to.be.eql( `${TEST_API}${path}?your=mama` )

        } )

    } )
    describe( '::request', () => {
        it( 'should get a request', () => {
            // mocks
            const store = mockStore( { auth: loggedInState } )
            const path = '/formats';
            const method = 'GET';
            const data = [ { id: 1 }, { id: 2 } ];
            const req = { path, method, data };

            // init
            fetchMock.get( `${TEST_API}${path}`, data )
                // tests
            return request( store.dispatch, store.getState, {
                    type: 'testType',
                    request: req
                } )
                // .should.be.rejected
                .then( () => {
                    expect( fetchMock.called( `${TEST_API}${path}` ) )
                        .to.be.true;
                    // console.log( fetchMock
                    //     .lastOptions( `${TEST_API}${path}` ) );
                    expect( JSON.parse(
                            fetchMock
                            .lastOptions( `${TEST_API}${path}` )
                            .body ) )
                        .to.deep.equal( data );

                } )
        } )
        it( 'should post a request', () => {
            // mocks
            const store = mockStore( { auth: loggedInState } )
            const path = '/login';
            const method = 'POST';
            const data = { oh: 'no' };
            const req = { path, method, data };

            // init
            fetchMock.post( `${TEST_API}${path}`, data )
                // tests
            return request( store.dispatch, store.getState, {
                    type: 'testType',
                    request: req
                } )
                // .should.be.rejected
                .then( () => {
                    expect( fetchMock.called( `${TEST_API}${path}` ) )
                        .to.be.true;
                    // console.log( fetchMock
                    //     .lastOptions( `${TEST_API}${path}` ) );
                    expect( JSON.parse(
                            fetchMock
                            .lastOptions( `${TEST_API}${path}` )
                            .body ) )
                        .to.deep.equal( data );

                } )
        } )

    } )

} )
