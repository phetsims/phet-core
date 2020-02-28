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
 * @param  {Array.<Object|null>} sources
 * @returns {Object}
 */
function merge( target, ...sources ) {
  validateMergeableObject( target );
  assert && assert( target !== null, 'target should not be null' ); // validateMergeableObject supports null
  assert && assert( sources.length > 0, 'at least one source expected' );

  _.each( sources, source => {
    if ( source ) {
      validateMergeableObject( source );
      for ( const property in source ) {
        if ( source.hasOwnProperty( property ) ) {
          const sourceProperty = source[ property ];

          // don't support recursing on the key "Options" with no prefix
          if ( _.endsWith( property, OPTIONS_SUFFIX ) && property !== OPTIONS_SUFFIX ) {

            // ensure that the *Options property is a POJSO
            validateMergeableObject( sourceProperty );

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
 * Validate that the object is a valid arg, with assertions.
 * @param {Object|null} object
 */
function validateMergeableObject( object ) {
  assert && assert( object === null ||
                    ( object && typeof object === 'object' &&
                      Object.getPrototypeOf( object ) === Object.prototype ),
    'Object should be null or a truthy  object that cannot have an extra prototype' );

  if ( object !== null ) {
    // ensure that options keys are not ES5 setters or getters
    assert && Object.keys( object ).forEach( prop => {
      const ownPropertyDescriptor = Object.getOwnPropertyDescriptor( object, prop );
      assert( !ownPropertyDescriptor.hasOwnProperty( 'set' ),
        'cannot use merge with a setter' );
      assert( !ownPropertyDescriptor.hasOwnProperty( 'get' ),
        'cannot use merge with a getter' );
    } );
  }
}

phetCore.register( 'merge', merge );
export default merge;