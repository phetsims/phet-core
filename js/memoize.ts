// Copyright 2020-2022, University of Colorado Boulder

/**
 * Caches the results of previous single-argument function applications to the same object.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import phetCore from './phetCore.js';

/**
 * @param func - Should take one argument
 * @returns - Returns a function that is equivalent, but caches values from previous keys
 */
function memoize<Key, Value>( func: ( k: Key ) => Value ): ( k: Key ) => Value {
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