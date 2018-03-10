// Copyright 2014-2015, University of Colorado Boulder

/**
 * Partitions an array into two arrays: the first contains all elements that satisfy the predicate, and the second
 * contains all the (other) elements that do not satisfy the predicate.
 *
 * e.g. partition( [1,2,3,4], function( n ) { return n % 2 === 0; } ) will return [[2,4],[1,3]]
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

define( function( require ) {
  'use strict';

  var phetCore = require( 'PHET_CORE/phetCore' );

  function partition( array, predicate ) {
    assert && assert( Array.isArray( array ) );
    assert && assert( typeof predicate === 'function' );

    var satisfied = [];
    var unsatisfied = [];
    var length = array.length;
    for ( var i = 0; i < length; i++ ) {
      if ( predicate( array[ i ] ) ) {
        satisfied.push( array[ i ] );
      }
      else {
        unsatisfied.push( array[ i ] );
      }
    }

    return [ satisfied, unsatisfied ];
  }

  phetCore.register( 'partition', partition );

  return partition;
} );