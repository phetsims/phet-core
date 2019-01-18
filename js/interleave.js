// Copyright 2014-2015, University of Colorado Boulder
/* eslint-disable bad-sim-text */

/**
 * Returns a copy of an array, with generated elements interleaved (inserted in-between) every element. For example, if
 * you call `interleave( [ a, b, c ], Math.random )`, it will result in the equivalent:
 * `[ a, Math.random(), b, Math.random(), c ]`.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

define( function( require ) {
  'use strict';

  var phetCore = require( 'PHET_CORE/phetCore' );

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

    var result = [];
    var finalLength = arr.length * 2 - 1;

    for ( var i = 0; i < finalLength; i++ ) {
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

  return interleave;
} );