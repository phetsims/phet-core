// Copyright 2019-2020, University of Colorado Boulder

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

/**
 * @param  {Object} target - the object literal that will have keys set to it
 * @param  {...<Object|null>} sources
 * @returns {Object}
 */
function merge( target, ...sources ) {
  assert && assertIsMergeable( target );
  assert && assert( target !== null, 'target should not be null' ); // assertIsMergeable supports null
  assert && assert( sources.length > 0, 'at least one source expected' );

  _.each( sources, source => {
    if ( source ) {
      assert && assertIsMergeable( source );
      for ( const property in source ) {
        if ( source.hasOwnProperty( property ) ) {
          const sourceProperty = source[ property ];

          // don't support recursing on the key "Options" with no prefix
          if ( _.endsWith( property, OPTIONS_SUFFIX ) && property !== OPTIONS_SUFFIX ) {

            // ensure that the *Options property is a POJSO
            assert && assertIsMergeable( sourceProperty );

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
 * Asserts that the object is compatible with merge. That is, it's a POJSO.
 * This function must be called like: assert && assertIsMergeable( arg );
 * @param {Object|null} object
 */
function assertIsMergeable( object ) {
  assert( object === null ||
          ( object && typeof object === 'object' && Object.getPrototypeOf( object ) === Object.prototype ),
    'object is not compatible with merge' );

  if ( object !== null ) {
    // ensure that options keys are not ES5 setters or getters
    Object.keys( object ).forEach( prop => {
      const ownPropertyDescriptor = Object.getOwnPropertyDescriptor( object, prop );
      assert( !ownPropertyDescriptor.hasOwnProperty( 'set' ),
        'cannot use merge with an object that has a setter' );
      assert( !ownPropertyDescriptor.hasOwnProperty( 'get' ),
        'cannot use merge with an object that has a getter' );
    } );
  }
}

phetCore.register( 'merge', merge );
export default merge;