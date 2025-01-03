// Copyright 2021-2025, University of Colorado Boulder

/**
 * Generalized support for mutating objects that take ES5 getters/setters, similar to Node.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import affirm from '../../perennial-alias/js/browser-and-node/affirm.js';
import _ from '../../sherpa/js/lodash.js';
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
 * First param will be mutated
 */
function mutate( target: object, orderedKeys: string[], options?: object ): void {
  affirm( target );
  affirm( Array.isArray( orderedKeys ) );

  if ( !options ) {
    return;
  }

  affirm( Object.getPrototypeOf( options ) === Object.prototype,
    'Extra prototype on options object is a code smell' );

  _.each( orderedKeys, key => {

    // See https://github.com/phetsims/scenery/issues/580 for more about passing undefined.
    // @ts-expect-error
    affirm( !options.hasOwnProperty( key ) || options[ key ] !== undefined,
      `Undefined not allowed for key: ${key}` );

    // @ts-expect-error
    if ( options[ key ] !== undefined ) {
      // @ts-expect-error
      target[ key ] = options[ key ]!;
    }
  } );
}

phetCore.register( 'mutate', mutate );
export default mutate;