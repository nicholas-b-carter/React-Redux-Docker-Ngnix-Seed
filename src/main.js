import React from 'react';
import ReactDOM from 'react-dom';
import Root from 'src/containers/Root';
import configureStore from 'src/store/configureStore';
import { AppContainer } from 'react-hot-loader';
import debug from 'debug';
import 'babel-polyfill';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { SOCKET_URL } from 'src/constants/api';
import socketIOClient from 'socket.io-client';
import sailsIOClient from 'sails.io.js';
injectTapEventPlugin();

// const io = sailsIOClient(socketIOClient);
//
// io.sails.transports = ['websocket']
// io.sails.useCORSRouteToGetCookie = false
// io.sails.url = SOCKET_URL;
// io.sails.pingInterval = 0;


// ========================================================
// Store and History Instantiation
// ========================================================
// Create redux store and sync with react-router-redux. We have installed the
// react-router-redux reducer under the routerKey "router" in src/routes/index.js,
// so we need to provide a custom `selectLocationState` to inform
// react-router-redux of its location.

const initialState = window.___INITIAL_STATE__;
const store = configureStore(initialState);
const { dispatch } = store;

// ========================================================
// Developer Tools Setup
// ========================================================
if (__DEBUG__) {
    debug.enable('*')
    debug.disable('engine.io-client:socket')
    if (window.devToolsExtension) {
        window
            .devToolsExtension
            .open()
    }
}

// ========================================================
// Render Setup
// ========================================================

// const node = (<Root store={store}/>);
//
// ReactDOM.render(node, target);

const MOUNT_NODE = document.getElementById('root')

// TODO(zuko): get rid of routerKey
// TODO(zuko): hot reloading does actually work, the whole app reloads
const render = (routerKey = null) => {
    const nextRoutes = require('src/routes');
    const NextRootContainer = Root;

    ReactDOM.render(
        <AppContainer>
            <NextRootContainer store={store} routes={nextRoutes}/>
    </AppContainer>, MOUNT_NODE)
}

if (__DEV__ && module.hot) {
    module
        .hot
        .accept('./reducers', () => {
            const nextReducer = require('./reducers')
                .default
            store.replaceReducer(nextReducer)
        })
    module
        .hot
        .accept([
            './containers/Root', './routes'
        ], () => render(Date.now()))
}

// ========================================================
// Go!
// ========================================================
render()
