// Copyright 2018-2025, University of Colorado Boulder

/**
 * Returns a copy of an array, with generated elements interleaved (inserted in-between) every element. For example, if
 * you call `interleave( [ a, b, c ], Math.random )`, it will result in the equivalent:
 * `[ a, Math.random(), b, Math.random(), c ]`.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import affirm from '../../perennial-alias/js/browser-and-node/affirm.js';
import phetCore from './phetCore.js';

/**
 * @param arr - The array in which to interleave elements
 * @param generator - function( index: {number} ):{*} - 0-based index for which "separator" it is for. e.g.
 *                               [ _, generator(0), _, generator(1), _, generator(2), ..., _ ]
 * @returns - The interleaved array
 */
function interleave<T>( arr: readonly T[], generator: ( element: number ) => T ): T[] {
  affirm( Array.isArray( arr ) );

  const result = [];
  const finalLength = arr.length * 2 - 1;

  for ( let i = 0; i < finalLength; i++ ) {
    if ( i % 2 === 0 ) {
      result.push( arr[ i / 2 ] );
    }
    else {
      result.push( generator( ( i - 1 ) / 2 ) );
    }
  }

  return result;
}

phetCore.register( 'interleave', interleave );

export default interleave;