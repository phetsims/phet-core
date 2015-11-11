// Copyright 2014-2015, University of Colorado Boulder

/**
 * Creates an array of arrays, which consists of pairs of objects from the input array without duplication.
 *
 * For example, phetCore.pairs( [ 'a', 'b', 'c' ] ) will return:
 * [ [ 'a', 'b' ], [ 'a', 'c' ], [ 'b', 'c' ] ]
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

define( function( require ) {
  'use strict';

  var phetCore = require( 'PHET_CORE/phetCore' );

  function pairs( array ) {
    var result = [];
    var length = array.length;
    if ( length > 1 ) {
      for ( var i = 0; i < length - 1; i++ ) {
        var first = array[ i ];
        for ( var j = i + 1; j < length; j++ ) {
          result.push( [ first, array[ j ] ] );
        }
      }
    }
    return result;
  }

  phetCore.register( 'pairs', pairs );

  return pairs;
} );
