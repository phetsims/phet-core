// Copyright 2019-2024, University of Colorado Boulder

/**
 * Like Lodash's _.merge, this will recursively merge nested options objects provided that the keys end in 'Options'
 * (case-sensitive) and they are pure object literals.
 * That is, they must be defined by `... = { ... }` or `somePropOptions: { ... }`.
 * Non object literals (arrays, functions, and inherited types) or anything with an extra prototype will all throw
 * assertion errors if passed in as an arg or as a value to a `*Options` field.
 *
 * @author Michael Barlow (PhET Interactive Simulations)
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import affirm, { isAffirmEnabled } from '../../perennial-alias/js/browser-and-node/affirm.js';
import IntentionalAny from './types/IntentionalAny.js';

// constants
const OPTIONS_SUFFIX = 'Options';

// Function overloading is described in https://www.tutorialsteacher.com/typescript/function-overloading
function merge<A, B>( a: A, b: B ): A & B;
function merge<A, B, C>( a: A, b: B, c: C ): A & B & C;
function merge<A, B, C, D>( a: A, b: B, c: C, d: D ): A & B & C & D;
function merge<A, B, C, D, E>( a: A, b: B, c: C, d: D, e: E ): A & B & C & D & E;

/**
 * @param  {Object} target - the object literal that will have keys set to it
 * @param  {...<Object|null>} sources
 */
function merge( target: IntentionalAny, ...sources: IntentionalAny[] ): IntentionalAny {
  isAffirmEnabled() && assertIsMergeable( target );
  affirm( target !== null, 'target should not be null' ); // assertIsMergeable supports null
  affirm( sources.length > 0, 'at least one source expected' );

  for ( let i = 0; i < sources.length; i++ ) {
    const source = sources[ i ];
    if ( source ) {
      isAffirmEnabled() && assertIsMergeable( source );
      for ( const property in source ) {

        // Providing a value of undefined in the target doesn't override the default, see https://github.com/phetsims/phet-core/issues/111
        if ( source.hasOwnProperty( property ) && source[ property ] !== undefined ) {
          const sourceProperty = source[ property ];

          // Recurse on keys that end with 'Options', but not on keys named 'Options'.
          if ( property.endsWith( OPTIONS_SUFFIX ) && property !== OPTIONS_SUFFIX ) {

            // *Options property value cannot be undefined, if truthy, it we be validated with assertIsMergeable via recursion.
            affirm( sourceProperty !== undefined, 'nested *Options should not be undefined' );
            target[ property ] = merge( target[ property ] || {}, sourceProperty );
          }
          else {
            target[ property ] = sourceProperty;
          }
        }
      }
    }
  }
  return target;
}

/**
 * TODO: can we remove assertIsMergeable? https://github.com/phetsims/phet-core/issues/128
 * Asserts that the object is compatible with merge. That is, it's a POJSO.
 * This function must be called like: isAffirmEnabled() && assertIsMergeable( arg );
 */
function assertIsMergeable( object: IntentionalAny ): void {
  affirm( object === null ||
          ( object && typeof object === 'object' && Object.getPrototypeOf( object ) === Object.prototype ),
    'object is not compatible with merge' );

  if ( object !== null ) {
    // ensure that options keys are not ES5 setters or getters
    Object.keys( object ).forEach( prop => {
      const ownPropertyDescriptor = Object.getOwnPropertyDescriptor( object, prop )!;
      affirm( !ownPropertyDescriptor.hasOwnProperty( 'set' ),
        'cannot use merge with an object that has a setter' );
      affirm( !ownPropertyDescriptor.hasOwnProperty( 'get' ),
        'cannot use merge with an object that has a getter' );
    } );
  }
}

export default merge;