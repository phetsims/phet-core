// Copyright 2019, University of Colorado Boulder

/**
 * swapIfDefined tests
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const swapIfDefined = require( 'PHET_CORE/swapIfDefined' );

  QUnit.module( 'swapIfDefined' );

  QUnit.test( 'swapIfDefined', assert => {
    let object = { x: 3, y: 4 };
    swapIfDefined( object, 'x', 'y' );
    assert.ok( object.x === 4 );
    assert.ok( object.y === 3 );

    object = { x: 3, y: undefined };
    swapIfDefined( object, 'x', 'y' );
    assert.ok( object.x === undefined );
    assert.ok( object.hasOwnProperty( 'x' ) );
    assert.ok( object.y === 3 );

    object = { x: 3, y: new RegExp( 'matchOnThis' ) };
    const regex = object.y; // store the reference
    swapIfDefined( object, 'x', 'y' );
    assert.ok( object.x === regex, 'reference to object' );
    assert.ok( object.y === 3, 'reference to primitive' );

    object = { x: 4 };
    swapIfDefined( object, 'x', 'y' );
    assert.ok( object.y === 4 );
    assert.ok( !Object.hasOwnProperty( 'x' ) );

    object = { otherStuff: 'hi' };
    swapIfDefined( object, 'x', 'y' );
    assert.ok( object.otherStuff === 'hi' );
    assert.ok( !Object.hasOwnProperty( 'x' ) );
    assert.ok( !Object.hasOwnProperty( 'y' ) );
  } );
} );