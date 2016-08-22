import expect from 'expect';
import R from 'ramda'
import { mapKeyToArray } from 'src/utils'

describe( '❇ Misc', () => {

    afterEach( () => {} )

    beforeEach( () => {} )

    describe( '::mapKeyToArray', () => {
        it( 'use the default key (id)', () => {
            const arr = [ { id: 1 }, { id: 2 }, { id: 3 } ]
            const result = mapKeyToArray( arr );
            const expected = [ 1, 2, 3 ]
            expect( result )
                .toEqual( expected )

        } )
        it( 'ignore object without the key', () => {
            const arr = [ { id: 1 }, { dummy: 2 }, { id: 3 } ]
            const result = mapKeyToArray( arr );
            const expected = [ 1, 3 ]
            expect( result )
                .toEqual( expected )

        } )
        it( 'use the custom key', () => {
            const arr = [ { my_id: 1 }, { my_id: 2 }, { my_id: 3 } ]
            const result = mapKeyToArray( arr, 'my_id' );
            const expected = [ 1, 2, 3 ]
            expect( result )
                .toEqual( expected )

        } )
        it( 'use the deep path custom key', () => {
            const arr = [
                { a: { b: { c: 1 } } },
                { a: { b: { c: 2 } } },
                { a: { b: { c: 3 } } },
            ]
            const result = mapKeyToArray( arr, [ 'a', 'b', 'c' ] );
            const expected = [ 1, 2, 3 ]
            expect( result )
                .toEqual( expected )

        } )
        it( 'use the deep path custom key and ignore', () => {
            const arr = [
                { a: { b: { c: 1 } } },
                { a: { g: { c: 2 } } },
                { a: { b: { c: 3 } } },
            ]
            const result = mapKeyToArray( arr, [ 'a', 'b', 'c' ] );
            const expected = [ 1, 3 ]
            expect( result )
                .toEqual( expected )

        } )
    } )

} )
