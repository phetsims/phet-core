// Copyright 2017, University of Colorado Boulder
/* eslint-disable bad-sim-text */

/**
 * arrayDifference tests
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( function( require ) {
  'use strict';

  // modules
  var arrayDifference = require( 'PHET_CORE/arrayDifference' );
  var arrayRemove = require( 'PHET_CORE/arrayRemove' );

  QUnit.module( 'arrayDifference' );

  function assertDifferences( assert, a, b, expectedAOnly, expectedBOnly, expectedBoth ) {
    var aOnly = [];
    var bOnly = [];
    var inBoth = [];
    var result = arrayDifference( a, b, aOnly, bOnly, inBoth );

    assert.ok( _.isEqual( aOnly, expectedAOnly ), 'aOnly: ' + a.toString() + ' diff ' + b.toString() + ' expected: ' + expectedAOnly.toString() + ' actual: ' + aOnly.toString() );
    assert.ok( _.isEqual( bOnly, expectedBOnly ), 'bOnly: ' + a.toString() + ' diff ' + b.toString() + ' expected: ' + expectedBOnly.toString() + ' actual: ' + bOnly.toString() );
    assert.ok( _.isEqual( inBoth, expectedBoth ), 'inBoth: ' + a.toString() + ' diff ' + b.toString() + ' expected: ' + expectedBoth.toString() + ' actual: ' + inBoth.toString() );
    assert.ok( _.isEqual( aOnly, result ), 'return value: ' + a.toString() + ' diff ' + b.toString() );
  }

  function generatedTest( assert, maxNumber, aSize, bSize ) {
    var a = [];
    var b = [];
    var aOnly = [];
    var bOnly = [];
    var inBoth = [];
    var item;

    var range = _.range( 1, maxNumber );
    var aRange = range.slice();
    var bRange = range.slice();

    while ( a.length < aSize ) {
      item = _.sample( aRange );
      arrayRemove( aRange, item );
      a.push( item );
    }
    while ( b.length < bSize ) {
      item = _.sample( bRange );
      arrayRemove( bRange, item );
      b.push( item );
    }

    for ( var i = 0; i < range.length; i++ ) {
      item = range[ i ];

      var inA = _.includes( a, item );
      var inB = _.includes( b, item );

      if ( inA && inB ) {
        inBoth.push( item );
      }
      else if ( inA ) {
        aOnly.push( item );
      }
      else if ( inB ) {
        bOnly.push( item );
      }
    }

    aOnly.sort( function( x, y ) {
      return a.indexOf( x ) - a.indexOf( y );
    } );
    bOnly.sort( function( x, y ) {
      return b.indexOf( x ) - b.indexOf( y );
    } );
    inBoth.sort( function( x, y ) {
      return a.indexOf( x ) - a.indexOf( y );
    } );

    assertDifferences( assert, a, b, aOnly, bOnly, inBoth );
  }

  QUnit.test( 'Simple Usage 1', function( assert ) {
    var a = [ 1, 2 ];
    var b = [ 2, 3 ];
    assert.ok( _.isEqual( arrayDifference( a, b ), [ 1 ] ) );
  } );

  QUnit.test( 'General Usage 1', function( assert ) {
    assertDifferences( assert, [ 1, 2 ], [ 2, 3 ], [ 1 ], [ 3 ], [ 2 ] );
  } );

  QUnit.test( 'General Usage 2', function( assert ) {
    var a = [ 2, 19, 7, 12, 8, 6, 14, 5, 4, 9 ];
    var b = [ 17, 18, 9, 14, 20, 4, 3, 15 ];
    var aOnly = [ 2, 19, 7, 12, 8, 6, 5 ];
    var bOnly = [ 17, 18, 20, 3, 15 ];
    var inBoth = [ 14, 4, 9 ];
    assertDifferences( assert, a, b, aOnly, bOnly, inBoth );
  } );

  QUnit.test( 'General Usage 3', function( assert ) {
    assertDifferences( assert, [ 1, 2, 3, 4, 5 ], [ 3 ], [ 1, 2, 4, 5 ], [], [ 3 ] );
  } );

  QUnit.test( 'General Usage 4', function( assert ) {
    assertDifferences( assert, [ 1, 2, 3, 4, 5 ], [], [ 1, 2, 3, 4, 5 ], [], [] );
  } );

  QUnit.test( 'General Usage 5', function( assert ) {
    assertDifferences( assert, [], [ 1, 2, 3, 4, 5 ], [], [ 1, 2, 3, 4, 5 ], [] );
  } );

  QUnit.test( 'Generated tests', function( assert ) {
    _.times( 20, function() {
      generatedTest( assert, 20, 10, 10 );
    } );
    _.times( 4, function() {
      var size = 30;
      for ( var i = 0; i <= size; i++ ) {
        generatedTest( assert, size + 5, i, size - i );
      }
    } );
  } );
} );