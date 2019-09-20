// Copyright 2017-2019, University of Colorado Boulder

/**
 * isArray tests
 *
 * @author Jonathan Olson (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const isArray = require( 'PHET_CORE/isArray' );

  QUnit.module( 'isArray' );

  QUnit.test( 'isArray', function( assert ) {
    assert.ok( isArray( [ 1, 2, 3 ] ) );
    assert.ok( isArray( [] ) );
    assert.ok( !isArray( 0 ) );
    assert.ok( !isArray( {} ) );
    assert.ok( !isArray( function() {} ) );
  } );
} );