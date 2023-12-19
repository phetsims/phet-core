// Copyright 2017-2023, University of Colorado Boulder

/**
 * arrayRemove tests
 *
 * @author Jonathan Olson (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 */

import arrayRemove from './arrayRemove.js';

QUnit.module( 'arrayRemove' );

QUnit.test( 'arrayRemove', assert => {
  const arr = [ 4, 3, 2, 1, 3 ];
  arrayRemove( arr, 3 );

  assert.equal( arr[ 0 ], 4 );
  assert.equal( arr[ 1 ], 2 );
  assert.equal( arr[ 2 ], 1 );
  assert.equal( arr[ 3 ], 3 ); // doesn't remove the second instance
  assert.equal( arr.length, 4 );

  // check reference removal
  const a = {};
  const b = {};
  const c = {};

  const arr2 = [ a, b, c ];
  arrayRemove( arr2, b );

  assert.equal( arr2[ 0 ], a );
  assert.equal( arr2[ 1 ], c );
  assert.equal( arr2.length, 2 );
} );