// Copyright 2018-2020, University of Colorado Boulder

/**
 * Returns a copy of an array, with generated elements interleaved (inserted in-between) every element. For example, if
 * you call `interleave( [ a, b, c ], Math.random )`, it will result in the equivalent:
 * `[ a, Math.random(), b, Math.random(), c ]`.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import phetCore from './phetCore.js';

/*
 * @public
 * @param {Array.<*>} arr - The array in which to interleave elements
 * @param {function} generator - function( index: {number} ):{*} - 0-based index for which "separator" it is for. e.g.
 *                               [ _, f(0), _, f(1), _, f(2), ..., _ ]
 * @returns {Array.<*>}
 */
function interleave( arr, generator ) {
  assert && assert( Array.isArray( arr ) );
  assert && assert( typeof generator === 'function' );

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