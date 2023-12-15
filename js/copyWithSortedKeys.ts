// Copyright 2019-2021, University of Colorado Boulder

/**
 * Preload file that sorts the keys in an object intended for JSON, using the strategy defined in
 * https://stackoverflow.com/questions/5467129/sort-javascript-object-by-key
 *
 * This is used in the simulation side to make sure the elements-baseline file is sorted, and used in the phet-io
 * wrapper side to make sure the elements-overrides file is sorted.
 *
 * Namespacing and naming are discussed in https://github.com/phetsims/phet-io/issues/1446#issuecomment-476842068 and below
 * NOTE: Please be mindful of the copy in formatPhetioAPI, see https://github.com/phetsims/phet-io/issues/1733
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Chris Klusendorf (PhET Interactive Simulations)
 */
import phetCore from './phetCore.js';

/**
 * Creates a new object, recursively, by sorting the keys at each level.
 * @param {Object} unordered - jsonifiable object to be sorted by key name.  Sorting is recursive and hence.
 */
const copyWithSortedKeys = unordered => {
  if ( Array.isArray( unordered ) ) {
    return unordered.map( copyWithSortedKeys );
  }
  else if ( typeof unordered !== 'object' || unordered === null ) {
    return unordered;
  }

  const ordered = {};
  Object.keys( unordered ).sort().forEach( key => {
    const value = unordered[ key ];
    ordered[ key ] = copyWithSortedKeys( value );
  } );
  return ordered;
};

phetCore.register( 'copyWithSortedKeys', copyWithSortedKeys );

export default copyWithSortedKeys;