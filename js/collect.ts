// Copyright 2013-2026, University of Colorado Boulder

/**
 * Creates an array of results from an iterator that takes a callback.
 *
 * For instance, if calling a function f( g ) will call g( 1 ), g( 2 ), and g( 3 ),
 * collect( function( callback ) { f( callback ); } );
 * will return [1,2,3].
 *
 * @author Jonathan Olson (PhET Interactive Simulations)
 */

import phetCore from './phetCore.js';

function collect<T>( iterate: ( func: ( item: T ) => void ) => void ): T[] {
  const result: T[] = [];
  iterate( ob => {
    result.push( ob );
  } );
  return result;
}

phetCore.register( 'collect', collect );

export default collect;