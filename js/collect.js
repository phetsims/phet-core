// Copyright 2002-2012, University of Colorado

/**
 * Creates an array of results from an iterator that takes a callback.
 *
 * For instance, if calling a function f( g ) will call g( 1 ), g( 2 ), and g( 3 ),
 * collect( function( callback ) { f( callback ); } );
 * will return [1,2,3].
 *
 * @author Jonathan Olson <olsonsjc@gmail.com>
 */

define( function( require ) {
  "use strict";
  
  return function collect( iterate ) {
    var result = [];
    iterate( function( ob ) {
      result.push( ob );
    } );
    return result;
  };
} );
