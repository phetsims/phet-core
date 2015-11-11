// Copyright 2013-2015, University of Colorado Boulder

/**
 * Like Underscore's _.extend, but with hardcoded support for ES5 getters/setters.
 *
 * See https://github.com/documentcloud/underscore/pull/986.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

define( function( require ) {
  'use strict';

  var phetCore = require( 'PHET_CORE/phetCore' );

  function extend( obj ) {
    _.each( Array.prototype.slice.call( arguments, 1 ), function( source ) {
      if ( source ) {
        for ( var prop in source ) {
          Object.defineProperty( obj, prop, Object.getOwnPropertyDescriptor( source, prop ) );
        }
      }
    } );
    return obj;
  }

  phetCore.register( 'extend', extend );

  return extend;
} );