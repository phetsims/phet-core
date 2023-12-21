// Copyright 2019-2020, University of Colorado Boulder

/**
 * swapObjectKeys tests
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import swapObjectKeys from './swapObjectKeys.js';

QUnit.module( 'swapObjectKeys' );

QUnit.test( 'swapObjectKeys', assert => {
  let object = { x: 3, y: 4 };
  swapObjectKeys( object, 'x', 'y' );
  assert.ok( object.x === 4 );
  assert.ok( object.y === 3 );

  object = { x: 3, y: undefined };
  swapObjectKeys( object, 'x', 'y' );
  assert.ok( object.x === undefined );
  assert.ok( object.hasOwnProperty( 'x' ) );
  assert.ok( object.y === 3 );

  object = { x: 3, y: new RegExp( 'matchOnThis' ) };
  const regex = object.y; // store the reference
  swapObjectKeys( object, 'x', 'y' );
  assert.ok( object.x === regex, 'reference to object' );
  assert.ok( object.y === 3, 'reference to primitive' );

  object = { x: 4 };
  swapObjectKeys( object, 'x', 'y' );
  assert.ok( object.y === 4 );
  assert.ok( !Object.hasOwnProperty( 'x' ) );

  object = { otherStuff: 'hi' };
  swapObjectKeys( object, 'x', 'y' );
  assert.ok( object.otherStuff === 'hi' );
  assert.ok( !Object.hasOwnProperty( 'x' ) );
  assert.ok( !Object.hasOwnProperty( 'y' ) );
} );