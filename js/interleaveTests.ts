// Copyright 2018-2020, University of Colorado Boulder

/**
 * interleave tests
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import interleave from './interleave.js';

QUnit.module( 'interleave' );

QUnit.test( 'interleave', assert => {
  const result = interleave( [ 3, 5, 7, 8, 9 ], index => index );

  assert.ok( result.length === 9 );

  assert.ok( result[ 0 ] === 3 );
  assert.ok( result[ 2 ] === 5 );
  assert.ok( result[ 4 ] === 7 );
  assert.ok( result[ 6 ] === 8 );
  assert.ok( result[ 8 ] === 9 );

  assert.ok( result[ 1 ] === 0 );
  assert.ok( result[ 3 ] === 1 );
  assert.ok( result[ 5 ] === 2 );
  assert.ok( result[ 7 ] === 3 );
} );