// Copyright 2018-2025, University of Colorado Boulder

/**
 * Computes what elements are in both arrays, or only one array.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import affirm from '../../perennial-alias/js/browser-and-node/affirm.js';
import phetCore from './phetCore.js';
import _ from '../../sherpa/js/lodash.js';

/**
 * Given two arrays, find the items that are only in one of them (mutates the aOnly/bOnly/inBoth parameters)
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
 * @param a - Input array
 * @param b - Input array
 * @param [aOnly] - Output array (will be filled with all elements that are in `a` but NOT in `b`).
 *                              Ordered based on the order of `a`.
 * @param [bOnly] - Output array (will be filled with all elements that are in `b` but NOT in `a`).
 *                              Ordered based on the order of `b`.
 * @param [inBoth] - Output array (will be filled with all elements that are in both `a` AND `b`).
 *                               Ordered based on the order of `a`.
 * @returns - Returns the value of aOnly (the classic definition of difference)
 */
function arrayDifference<T>( a: T[], b: T[], aOnly?: T[], bOnly?: T[], inBoth?: T[] ): T[] {
  affirm( Array.isArray( a ) && _.uniq( a ).length === a.length, 'a is not an array of unique items' );
  affirm( Array.isArray( b ) && _.uniq( b ).length === b.length, 'b is not an array of unique items' );

  aOnly = aOnly || [];
  bOnly = bOnly || [];
  inBoth = inBoth || [];

  affirm( Array.isArray( aOnly ) && aOnly.length === 0 );
  affirm( Array.isArray( bOnly ) && bOnly.length === 0 );
  affirm( Array.isArray( inBoth ) && inBoth.length === 0 );

  Array.prototype.push.apply( aOnly, a );
  Array.prototype.push.apply( bOnly, b );

  outerLoop: // eslint-disable-line no-labels
    for ( let i = 0; i < aOnly.length; i++ ) {
      const aItem = aOnly[ i ];

      for ( let j = 0; j < bOnly.length; j++ ) {
        const bItem = bOnly[ j ];

        if ( aItem === bItem ) {
          inBoth.push( aItem );
          aOnly.splice( i, 1 );
          bOnly.splice( j, 1 );
          j = 0;
          if ( i === aOnly.length ) {
            break outerLoop; // eslint-disable-line no-labels
          }
          i -= 1;
        }
      }
    }

  // We return the classic meaning of "difference"
  return aOnly;
}

phetCore.register( 'arrayDifference', arrayDifference );

export default arrayDifference;