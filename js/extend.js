// Copyright 2013-2019, University of Colorado Boulder

/**
 * Like Underscore's _.extend and PHET_CORE/merge, but with hardcoded support for ES5 getters/setters. In general this
 * type shouldn't be used for phet's options pattern, and instead was designed to support extension for defining
 * mixins and object prototypes.
 *
 * See https://github.com/documentcloud/underscore/pull/986.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

define( require => {
  'use strict';

  const phetCore = require( 'PHET_CORE/phetCore' );

  function extend( obj ) {
    _.each( Array.prototype.slice.call( arguments, 1 ), function( source ) {
      if ( source ) {
        for ( const prop in source ) {
          Object.defineProperty( obj, prop, Object.getOwnPropertyDescriptor( source, prop ) );
        }
      }
    } );
    return obj;
  }

  phetCore.register( 'extend', extend );

  return extend;
} );