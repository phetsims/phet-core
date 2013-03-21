// Copyright 2002-2012, University of Colorado

/**
 * Like Underscore's _.extend, but with hardcoded support for ES5 getters/setters.
 *
 * See https://github.com/documentcloud/underscore/pull/986.
 *
 * @author Jonathan Olson <olsonsjc@gmail.com>
 */

define( function( require ) {
  "use strict";
  
  return function extend( obj ) {
    _.each( Array.prototype.slice.call( arguments, 1 ), function( source ) {
      if ( source ) {
        for ( var prop in source ) {
          Object.defineProperty( obj, prop, Object.getOwnPropertyDescriptor( source, prop ) );
        }
      }
    });
    return obj;
  };
} );
