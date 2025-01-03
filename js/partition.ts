// Copyright 2014-2025, University of Colorado Boulder

/**
 * Partitions an array into two arrays: the first contains all elements that satisfy the predicate, and the second
 * contains all the (other) elements that do not satisfy the predicate.
 *
 * e.g. partition( [1,2,3,4], function( n ) { return n % 2 === 0; } ) will return [[2,4],[1,3]]
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import affirm from '../../perennial-alias/js/browser-and-node/affirm.js';
import phetCore from './phetCore.js';

function partition<T>( array: T[], predicate: ( element: T ) => boolean ): readonly[ T[], T[] ] {
  affirm( Array.isArray( array ) );

  const satisfied = [];
  const unsatisfied = [];
  const length = array.length;
  for ( let i = 0; i < length; i++ ) {
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

export default partition;