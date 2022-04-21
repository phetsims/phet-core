// Copyright 2019-2022, University of Colorado Boulder

/**
 * Like Lodash's _.merge, this will recursively merge nested options objects provided that the keys end in 'Options'
 * (case sensitive) and they are pure object literals.
 * That is, they must be defined by `... = { ... }` or `somePropOptions: { ... }`.
 * Non object literals (arrays, functions, and inherited types) or anything with an extra prototype will all throw
 * assertion errors if passed in as an arg or as a value to a `*Options` field.
 *
 * @author Michael Barlow (PhET Interactive Simulations)
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import phetCore from './phetCore.js';

// constants
const OPTIONS_SUFFIX = 'Options';

// Function overloading is described in https://www.tutorialsteacher.com/typescript/function-overloading
function merge<A, B>( a: A, b: B ): A & B;
function merge<A, B, C>( a: A, b: B, c: C ): A & B & C; // eslint-disable-line no-redeclare
function merge<A, B, C, D>( a: A, b: B, c: C, d: D ): A & B & C & D; // eslint-disable-line no-redeclare
function merge<A, B, C, D, E>( a: A, b: B, c: C, d: D, e: E ): A & B & C & D & E; // eslint-disable-line no-redeclare

// TODO: SR and MK tried two other potential ways of typing out Merge, below we explain the issues associated with both, https://github.com/phetsims/chipper/issues/1128
// https://dev.to/vborodulin/ts-how-to-override-properties-with-type-intersection-554l
// type Override<T1, T2> = Omit<T1, keyof T2> & T2;

// TODO: This is incorrect because it doesn't adequately recognize when A fills in a default for an optional option that B thinks could be undefined, https://github.com/phetsims/chipper/issues/1128
// function merge<A, B>( a: A, b: B ): Override<A, B>;

// TODO: This is incorrect because it results in false positives as it assumes that everything optional in B has had defaults filled in by A, even if the values actually weren't filled in by A, https://github.com/phetsims/chipper/issues/1128
// function merge<A, B>( a: A, b: B ): Required<Override<A, B>>;

/**
 * @param  {Object} target - the object literal that will have keys set to it
 * @param  {...<Object|null>} sources
 * @returns {Object}
 */
function merge( target: any, ...sources: any ) { // eslint-disable-line no-redeclare
  assert && assertIsMergeable( target );
  assert && assert( target !== null, 'target should not be null' ); // assertIsMergeable supports null
  assert && assert( sources.length > 0, 'at least one source expected' );

  _.each( sources, source => {
    if ( source ) {
      assert && assertIsMergeable( source );
      for ( const property in source ) {

        // Providing a value of undefined in the target doesn't override the default, see https://github.com/phetsims/phet-core/issues/111
        if ( source.hasOwnProperty( property ) && source[ property ] !== undefined ) {
          const sourceProperty = source[ property ];

          // Recurse on keys that end with 'Options', but not on keys named 'Options'.
          if ( _.endsWith( property, OPTIONS_SUFFIX ) && property !== OPTIONS_SUFFIX ) {

            // *Options property value cannot be undefined, if truthy, it we be validated with assertIsMergeable via recursion.
            assert && assert( sourceProperty !== undefined, 'nested *Options should not be undefined' );
            target[ property ] = merge( target[ property ] || {}, sourceProperty );
          }
          else {
            target[ property ] = sourceProperty;
          }
        }
      }
    }
  } );
  return target;
}

/**
 * TODO: can we remove assertIsMergeable? https://github.com/phetsims/chipper/issues/1128
 * Asserts that the object is compatible with merge. That is, it's a POJSO.
 * This function must be called like: assert && assertIsMergeable( arg );
 * @param {Object|null} object
 */
function assertIsMergeable( object: any ) {
  assert && assert( object === null ||
                    ( object && typeof object === 'object' && Object.getPrototypeOf( object ) === Object.prototype ),
    'object is not compatible with merge' );

  if ( object !== null ) {
    // ensure that options keys are not ES5 setters or getters
    Object.keys( object ).forEach( prop => {
      const ownPropertyDescriptor = Object.getOwnPropertyDescriptor( object, prop )!;
      assert && assert( !ownPropertyDescriptor.hasOwnProperty( 'set' ),
        'cannot use merge with an object that has a setter' );
      assert && assert( !ownPropertyDescriptor.hasOwnProperty( 'get' ),
        'cannot use merge with an object that has a getter' );
    } );
  }
}

phetCore.register( 'merge', merge );
export default merge;