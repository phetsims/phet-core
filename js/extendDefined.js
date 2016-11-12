// Copyright 2013-2015, University of Colorado Boulder

/**
 * Like phet-core's extend, but does not overwrite properties with undefined values.
 *
 * For example:
 *
 * extendDefined( { a: 5 }, { a: undefined } ) will return { a: 5 }
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

define( function( require ) {
  'use strict';

  var phetCore = require( 'PHET_CORE/phetCore' );

  function extendDefined( obj ) {
    _.each( Array.prototype.slice.call( arguments, 1 ), function( source ) {
      if ( source ) {
        for ( var prop in source ) {
          var descriptor = Object.getOwnPropertyDescriptor( source, prop );

          if ( descriptor && ( typeof descriptor.get === 'function' || source[ prop ] !== undefined ) ) {
            Object.defineProperty( obj, prop, descriptor );
          }
        }
      }
    } );
    return obj;
  }

  phetCore.register( 'extendDefined', extendDefined );

  return extendDefined;
} );