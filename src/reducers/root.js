import { createReducer } from 'src/utils';
import { List, Map, fromJS } from 'immutable';
import { REHYDRATE } from 'redux-persist/constants'

const initialState = Map( {
    rehydrated: false
} );
export default createReducer( initialState, {
    [ REHYDRATE ]: ( state, payload ) => {
        return state.merge( Map( { rehydrated: true } ) );
    },
} );
