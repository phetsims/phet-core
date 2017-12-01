// Copyright 2017, University of Colorado Boulder

/**
 * cleanArray tests
 *
 * @author Jonathan Olson (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var cleanArray = require( 'PHET_CORE/cleanArray' );

  QUnit.module( 'cleanArray' );

  QUnit.test( 'cleanArray', function( assert ) {
    assert.ok( cleanArray().length === 0, 'Given no argument, should return a fresh empty array' );
    assert.ok( cleanArray( undefined ).length === 0, 'Given undefined, should return a fresh empty array' );
    assert.ok( cleanArray( null ).length === 0, 'Given null, should return a fresh empty array' );
    var arr1 = [ '5' ];
    var arr2 = cleanArray( arr1 );
    assert.ok( arr1 === arr2, 'Should use the same array object provided' );
    assert.ok( arr2.length === 0, 'Should empty it out' );
    assert.ok( arr1.length === 0, 'Also empties the original (sanity check)' );
  } );
} );