// Copyright 2016-2021, University of Colorado Boulder

/**
 * Like phet-core's extend, but does not overwrite properties with undefined values.
 *
 * For example:
 *
 * extendDefined( { a: 5 }, { a: undefined } ) will return { a: 5 }
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import phetCore from './phetCore.js';

function extendDefined( obj ) {
  // eslint-disable-next-line prefer-rest-params
  _.each( Array.prototype.slice.call( arguments, 1 ), source => {
    if ( source ) {
      for ( const prop in source ) {
        const descriptor = Object.getOwnPropertyDescriptor( source, prop );

        if ( descriptor && ( typeof descriptor.get === 'function' || source[ prop ] !== undefined ) ) {
          Object.defineProperty( obj, prop, descriptor );
        }
      }
    }
  } );
  return obj;
}

phetCore.register( 'extendDefined', extendDefined );

export default extendDefined;