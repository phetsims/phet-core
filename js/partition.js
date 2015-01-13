// Copyright 2002-2014, University of Colorado Boulder

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

  var core = require( 'PHET_CORE/core' );

  core.partition = function partition( array, predicate ) {
    assert && assert( array instanceof Array );
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
  };
  return core.partition;
} );