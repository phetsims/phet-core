// Copyright 2020, University of Colorado Boulder

/**
 * Caches the results of previous single-argument function applications to the same object.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import phetCore from './phetCore.js';

/**
 * @param {function(*):*} func - Should take one argument
 *
 * @returns {function(*):*} - Returns a function that is equivalent, but caches values from previous keys
 */
function memoize<Key, Value>( func: ( k: Key ) => Value ) {
  assert && assert( typeof func === 'function' );

  const map = new Map<Key, Value>();

  return ( key: Key ): Value => {
    if ( map.has( key ) ) {
      return map.get( key )!;
    }
    else {
      const value = func( key );
      map.set( key, value );
      return value;
    }
  };
}

phetCore.register( 'memoize', memoize );
export default memoize;