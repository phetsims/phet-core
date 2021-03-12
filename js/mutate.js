// Copyright 2021, University of Colorado Boulder

/**
 * Generalized support for mutating objects that take ES5 getters/setters, similar to Node.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import phetCore from './phetCore.js';

/**
 * For example:
 *
 * mutate( something, [ 'left', 'right', 'top', 'bottom' ], { top: 0, left: 5 } );
 *
 * will be equivalent to:
 *
 * something.left = 5;
 * something.top = 0;
 *
 * @param {*} target - The object to mutate
 * @param {Array.<string>} orderedKeys
 * @param {Object} [options]
 *
 */
function mutate( target, orderedKeys, options ) {
  assert && assert( target );
  assert && assert( Array.isArray( orderedKeys ) );

  if ( !options ) {
    return;
  }

  assert && assert( Object.getPrototypeOf( options ) === Object.prototype,
    'Extra prototype on options object is a code smell' );

  _.each( orderedKeys, key => {

    // See https://github.com/phetsims/scenery/issues/580 for more about passing undefined.
    assert && assert( !options.hasOwnProperty( key ) || options[ key ] !== undefined, `Undefined not allowed for key: ${key}` );

    if ( options[ key ] !== undefined ) {
      target[ key ] = options[ key ];
    }
  } );
}

phetCore.register( 'mutate', mutate );
export default mutate;