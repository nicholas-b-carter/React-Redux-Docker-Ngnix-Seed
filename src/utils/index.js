import R from 'ramda'

export function createConstants( ...constants ) {
    return constants.reduce( ( acc, constant ) => {
        acc[ constant ] = constant;
        return acc;
    }, {} );
}

export function createReducer( initialState, reducerMap ) {
    return ( state = initialState, action ) => {
        const reducer = reducerMap[ action.type ];
        return reducer ?
            reducer( state, action.error ? action.error : action.payload ) : state;
    };
}

export function filterInt( value ) {
    if ( /^(\-|\+)?([0-9]+)$/.test( value ) ) {
        return Number( value );
    }
    return NaN;
}

export function mapKeyToArray( array = [], key = 'id' ) {
    let filterFunc, mapFunc;
    if ( Array.isArray( key ) ) {
        mapFunc = R.path( [ ...key ] );
        filterFunc = mapFunc;
    } else {
        filterFunc = item => item.hasOwnProperty( key );
        mapFunc = item => item[ key ]
    }
    return array
        .filter( filterFunc )
        .map( mapFunc );
}
export function sortByFrequency( array ) {
    const frequency = {};
    array.forEach( value => { frequency[ value ] = 0 } );
    return array.filter( value => ( ++frequency[ value ] ) === 1 )
        .sort( ( a, b ) => frequency[ b ] - frequency[ a ] );
}
