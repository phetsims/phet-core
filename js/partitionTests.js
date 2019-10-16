// Copyright 2017-2019, University of Colorado Boulder

/**
 * partition tests
 *
 * @author Jonathan Olson (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const partition = require( 'PHET_CORE/partition' );

  QUnit.module( 'partition' );

  QUnit.test( 'partition', function( assert ) {
    const parityTest = partition( [ 1, 2, 3, 4 ], function( n ) { return n % 2 === 0; } );
    assert.equal( parityTest[ 0 ][ 0 ], 2 );
    assert.equal( parityTest[ 0 ][ 1 ], 4 );
    assert.equal( parityTest[ 1 ][ 0 ], 1 );
    assert.equal( parityTest[ 1 ][ 1 ], 3 );
  } );
} );