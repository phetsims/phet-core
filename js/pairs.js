// Copyright 2002-2014, University of Colorado Boulder

/**
 * Creates an array of arrays, which consists of pairs of objects from the input array without duplication.
 *
 * For example, core.pairs( [ 'a', 'b', 'c' ] ) will return:
 * [ [ 'a', 'b' ], [ 'a', 'c' ], [ 'b', 'c' ] ]
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

define( function( require ) {
  'use strict';

  var core = require( 'PHET_CORE/core' );

  core.pairs = function pairs( array ) {
    var result = [];
    var length = array.length;
    if ( length > 1 ) {
      for ( var i = 0; i < length - 1; i++ ) {
        var first = array[i];
        for ( var j = i + 1; j < length; j++ ) {
          result.push( [ first, array[j] ] );
        }
      }
    }
    return result;
  };
  return core.pairs;
} );
