// Copyright 2017, University of Colorado Boulder

/**
 * pairs tests
 *
 * @author Jonathan Olson (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var pairs = require( 'PHET_CORE/pairs' );

  QUnit.module( 'pairs' );

  QUnit.test( 'pairs', function( assert ) {
    assert.equal( pairs( [] ).length, 0 );
    assert.equal( pairs( [ 'a' ] ).length, 0 );
    assert.equal( pairs( [ 'a', 'b' ] ).length, 1 );
    assert.equal( pairs( [ 'a', 'b', 'c' ] ).length, 3 );
    assert.equal( pairs( [ 'a', 'b', 'c' ] )[ 0 ][ 0 ], 'a' );
    assert.equal( pairs( [ 'a', 'b', 'c' ] )[ 0 ][ 1 ], 'b' );
    assert.equal( pairs( [ 'a', 'b', 'c' ] )[ 1 ][ 0 ], 'a' );
    assert.equal( pairs( [ 'a', 'b', 'c' ] )[ 1 ][ 1 ], 'c' );
    assert.equal( pairs( [ 'a', 'b', 'c' ] )[ 2 ][ 0 ], 'b' );
    assert.equal( pairs( [ 'a', 'b', 'c' ] )[ 2 ][ 1 ], 'c' );
  } );
} );