// Copyright 2014-2023, University of Colorado Boulder

/**
 * Creates an array of arrays, which consists of pairs of objects from the input array without duplication.
 *
 * For example, phet.phetCore.pairs( [ 'a', 'b', 'c' ] ) will return:
 * [ [ 'a', 'b' ], [ 'a', 'c' ], [ 'b', 'c' ] ]
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import phetCore from './phetCore.js';

function pairs( array ) {
  const result = [];
  const length = array.length;
  if ( length > 1 ) {
    for ( let i = 0; i < length - 1; i++ ) {
      const first = array[ i ];
      for ( let j = i + 1; j < length; j++ ) {
        result.push( [ first, array[ j ] ] );
      }
    }
  }
  return result;
}

phetCore.register( 'pairs', pairs );

export default pairs;