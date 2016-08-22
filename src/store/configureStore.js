import thunk from 'redux-thunk';
import { createHistory } from 'history';
import createLogger from 'redux-logger';
import { reduxReactRouter } from 'redux-router';
import { persistStore, autoRehydrate } from 'redux-persist'
import immutableTransform from 'redux-persist-transform-immutable'
import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import rootReducer from 'src/reducers';
import routes from 'src/routes';
import DevTools from 'src/containers/DevTools';

const logger = createLogger();
const enhancer = compose( window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument() );

export default function configureStore( initialState ) {
    let createStoreWithMiddleware;
    createStoreWithMiddleware = compose(
        autoRehydrate(),
        applyMiddleware( thunk ),
        reduxReactRouter( { routes, createHistory } ),
        enhancer
    );
    const store = createStoreWithMiddleware( createStore )( rootReducer, initialState );
    persistStore( store, {
        transforms: [ immutableTransform( {} ) ],
        blacklist: [ 'router' ]
    } )
    return store;
}
