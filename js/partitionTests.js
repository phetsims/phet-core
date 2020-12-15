// Copyright 2017-2020, University of Colorado Boulder

/**
 * partition tests
 *
 * @author Jonathan Olson (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 */

import partition from './partition.js';

QUnit.module( 'partition' );

QUnit.test( 'partition', assert => {
  const parityTest = partition( [ 1, 2, 3, 4 ], n => n % 2 === 0 );
  assert.equal( parityTest[ 0 ][ 0 ], 2 );
  assert.equal( parityTest[ 0 ][ 1 ], 4 );
  assert.equal( parityTest[ 1 ][ 0 ], 1 );
  assert.equal( parityTest[ 1 ][ 1 ], 3 );
} );