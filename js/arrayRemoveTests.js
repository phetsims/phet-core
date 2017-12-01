// Copyright 2017, University of Colorado Boulder

/**
 * arrayRemove tests
 *
 * @author Jonathan Olson (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var arrayRemove = require( 'PHET_CORE/arrayRemove' );

  QUnit.module( 'arrayRemove' );

  QUnit.test( 'arrayRemove', function( assert ) {
    var arr = [ 4, 3, 2, 1, 3 ];
    arrayRemove( arr, 3 );

    assert.equal( arr[ 0 ], 4 );
    assert.equal( arr[ 1 ], 2 );
    assert.equal( arr[ 2 ], 1 );
    assert.equal( arr[ 3 ], 3 ); // doesn't remove the second instance
    assert.equal( arr.length, 4 );

    // check reference removal
    var a = {};
    var b = {};
    var c = {};

    arr = [ a, b, c ];
    arrayRemove( arr, b );

    assert.equal( arr[ 0 ], a );
    assert.equal( arr[ 1 ], c );
    assert.equal( arr.length, 2 );
  } );
} );