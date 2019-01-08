// Copyright 2018, University of Colorado Boulder

/**
 * Map for multidimensional arrays.
 *
 * e.g. dimensionMap( 1, array, callback ) is equivalent to array.map( callback )
 * e.g. dimensionMap( 2, [ [ 1, 2 ], [ 3, 4 ] ], f ) will return
 *      [ [ f(1), f(2) ], [ f(3), f(4) ] ]
 *   OR more accurately (since it includes indices indicating how to reach that element:
 *      [ [ f(1,0,0), f(2,0,1) ], [ f(3,1,0), f(3,1,1) ] ]
 *   Notably, f(2,0,1) is called for the element 3 BECAUSE original[ 0 ][ 1 ] is the element 2
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( function( require ) {
  'use strict';

  var phetCore = require( 'PHET_CORE/phetCore' );

  /**
   * @typedef {Array.<MultidimensionalArray.<*>|*>} MultidimensionalArray.<*>
   */

  /**
   * @param {number} dimension - The dimension of the array (how many levels of nested arrays there are). For instance,
   *   [ 'a' ] is a 1-dimensional array, [ [ 'b' ] ] is a 2-dimensional array, etc.
   * @param {MultidimensionalArray.<*>} array - A multidimensional array of the specified dimension
   * @param {function} map - function( element: {*}, indices...: {Array.<number>} ): {*}. Called for each individual
   *   element. The indices are provided as the 2nd, 3rd, etc. parameters to the function (continues depending on the
   *   dimension). This is a generalization of the normal `map` function, which only provides the first index. Thus:
   *   array[ indices[ 0 ] ]...[ indices[ dimension - 1 ] ] === element
   * @returns {MultidimensionalArray.<*>} - A multidimensional array of the same dimension as our input, but with the
   *   values replaced with the return value of the map() calls for each element.
   */
  function dimensionMap( dimension, array, map ) {

    // Will get indices pushed when we go deeper into the multidimensional array, and popped when we go back, so that
    // this essentially represents our "position" in the multidimensional array during iteration.
    var indices = [];

    /**
     * Responsible for mapping a multidimensional array of the given dimension, while accumulating
     * indices.
     *
     * @param {number} dim
     * @param {MultidimensionalArray.<*>} arr
     * @returns {MultidimensionalArray.<*>}
     */
    function recur( dim, arr ) {
      return arr.map( function( element, index ) {

        // To process this element, we need to record our index (in case it is an array that we iterate through).
        indices.push( index );

        // If our dimension is 1, it's our base case (apply the normal map function), otherwise continue recursively.
        var result = dim === 1 ? map.apply( null, [ element ].concat( indices ) ) : recur( dim - 1, element );

        // We are done with iteration
        indices.pop();
        return result;
      } );
    }

    return recur( dimension, array );
  }

  phetCore.register( 'dimensionMap', dimensionMap );

  return dimensionMap;
} );
