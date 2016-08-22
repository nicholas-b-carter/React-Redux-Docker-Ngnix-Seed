import { combineReducers } from 'redux';
import { routerStateReducer as router } from 'redux-router';
import auth from 'src/modules/auth/reducer';
import rootReducer from './root';
import { reducer as form } from 'redux-form';

const data = combineReducers( {

} )

export default combineReducers( {
    auth,
    router,
    form,
    root: rootReducer
} );
