// Copyright 2002-2012, University of Colorado

/**
 * Utility functions for PhET libraries
 *
 * @author Jonathan Olson <olsonsjc@gmail.com>
 */

define( function( require ) {
  "use strict";
  
  var Util = {
    isArray: function( array ) {
      // yes, this is actually how to do this. see http://stackoverflow.com/questions/4775722/javascript-check-if-object-is-array
      return Object.prototype.toString.call( array ) === '[object Array]';
    },
    
    // like _.extend, but with hardcoded support for ES5 getters/setters. see https://github.com/documentcloud/underscore/pull/986
    extend: function( obj ) {
      _.each( Array.prototype.slice.call( arguments, 1 ), function( source ) {
        if ( source ) {
          for ( var prop in source ) {
            Object.defineProperty( obj, prop, Object.getOwnPropertyDescriptor( source, prop ) );
          }
        }
      });
      return obj;
    }
  };
  
  return Util;
} );
