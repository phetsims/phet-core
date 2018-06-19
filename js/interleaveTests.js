// Copyright 2017, University of Colorado Boulder

/**
 * interleave tests
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( function( require ) {
  'use strict';

  // modules
  var interleave = require( 'PHET_CORE/interleave' );

  QUnit.module( 'interleave' );

  QUnit.test( 'interleave', function( assert ) {
    var result = interleave( [ 3, 5, 7, 8, 9 ], function( index ) {
      return index;
    } );

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
} );