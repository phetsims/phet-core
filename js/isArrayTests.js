// Copyright 2017-2020, University of Colorado Boulder

/**
 * isArray tests
 *
 * @author Jonathan Olson (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 */

import isArray from './isArray.js';

QUnit.module( 'isArray' );

QUnit.test( 'isArray', assert => {
  assert.ok( isArray( [ 1, 2, 3 ] ) );
  assert.ok( isArray( [] ) );
  assert.ok( !isArray( 0 ) );
  assert.ok( !isArray( {} ) );
  assert.ok( !isArray( () => {} ) );
} );