// Copyright 2018, University of Colorado Boulder

/**
 * Computes what elements are in both arrays, or only one array.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

define( function( require ) {
  'use strict';

  var phetCore = require( 'PHET_CORE/phetCore' );

  /**
   * Given two arrays, find the items that are only in one of them (mutates the aOnly/bOnly/inBopth parameters)
   * @public
   *
   * NOTE: Assumes there are no duplicate values in each individual array.
   *
   * For example:
   *   var a = [ 1, 2 ];
   *   var b = [ 5, 2, 0 ];
   *   var aOnly = [];
   *   var bOnly = [];
   *   var inBoth = [];
   *   arrayDifference( a, b, aOnly, bOnly, inBoth );
   *   // aOnly is [ 1 ]
   *   // bOnly is [ 5, 0 ]
   *   // inBoth is [ 2 ]
   *
   * @param {Array.<*>} a - Input array
   * @param {Array.<*>} b - Input array
   * @param {Array.<*>} [aOnly] - Output array (will be filled with all elements that are in `a` but NOT in `b`).
   *                              Ordered based on the order of `a`.
   * @param {Array.<*>} [bOnly] - Output array (will be filled with all elements that are in `b` but NOT in `a`).
   *                              Ordered based on the order of `b`.
   * @param {Array.<*>} [inBoth] - Output array (will be filled with all elements that are in both `a` AND `b`).
   *                               Ordered based on the order of `a`.
   * @returns {Array.<*>} - Returns the value of aOnly (the classic definition of difference)
   */
  function arrayDifference( a, b, aOnly, bOnly, inBoth ) {
    assert && assert( Array.isArray( a ) && _.uniq( a ).length === a.length, 'a is not an array of unique items' );
    assert && assert( Array.isArray( b ) && _.uniq( b ).length === b.length, 'b is not an array of unique items' );

    aOnly = aOnly || [];
    bOnly = bOnly || [];
    inBoth = inBoth || [];

    assert && assert( Array.isArray( aOnly ) && aOnly.length === 0 );
    assert && assert( Array.isArray( bOnly ) && bOnly.length === 0 );
    assert && assert( Array.isArray( inBoth ) && inBoth.length === 0 );

    Array.prototype.push.apply( aOnly, a );
    Array.prototype.push.apply( bOnly, b );

    outerLoop:
    for ( var i = 0; i < aOnly.length; i++ ) {
      var aItem = aOnly[ i ];

      for ( var j = 0; j < bOnly.length; j++ ) {
        var bItem = bOnly[ j ];

        if ( aItem === bItem ) {
          inBoth.push( aItem );
          aOnly.splice( i, 1 );
          bOnly.splice( j, 1 );
          j = 0;
          if ( i === aOnly.length ) {
            break outerLoop;
          }
          i -= 1;
        }
      }
    }

    // We return the classic meaning of "difference"
    return aOnly;
  }

  phetCore.register( 'arrayDifference', arrayDifference );

  return arrayDifference;
} );
