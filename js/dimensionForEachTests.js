// Copyright 2018, University of Colorado Boulder

/**
 * Tests for dimensionForEach
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( function( require ) {
  'use strict';

  // modules
  var dimensionForEach = require( 'PHET_CORE/dimensionForEach' );

  QUnit.module( 'dimensionForEach' );

  QUnit.test( '1 dimensional', function( assert ) {
    var normalValues = [];
    var ourValues = [];

    var arr = [ 1, 2, 4, 9 ];

    arr.forEach( function( element, index ) {
      normalValues.push( {
        element: element,
        index: index
      } );
    } );

    dimensionForEach( 1, arr, function( element, index ) {
      ourValues.push( {
        element: element,
        index: index
      } );
    } );

    assert.ok( _.isEqual( normalValues, ourValues ), '1-dimensional comparison' );
  } );

  QUnit.test( '2 dimensional', function( assert ) {
    var arr = [
      [ 1, 2, 4 ],
      [ 9, 5 ]
    ];
    var values = [];
    var expectedValues = [
      { element: 1, idx1: 0, idx2: 0 },
      { element: 2, idx1: 0, idx2: 1 },
      { element: 4, idx1: 0, idx2: 2 },
      { element: 9, idx1: 1, idx2: 0 },
      { element: 5, idx1: 1, idx2: 1 }
    ];

    dimensionForEach( 2, arr, function( element, idx1, idx2 ) {
      values.push( {
        element: element,
        idx1: idx1,
        idx2: idx2
      } );
    } );

    assert.ok( _.isEqual( values, expectedValues ), '2-dimensional comparison' );
  } );

  QUnit.test( '3 dimensional', function( assert ) {
    var arr = [
      [
        [ 1, 5 ],
        [ 9, 2 ]
      ],
      [
        [ 3, 3, 4 ]
      ]
    ];
    var values = [];
    var expectedValues = [
      { element: 1, idx1: 0, idx2: 0, idx3: 0 },
      { element: 5, idx1: 0, idx2: 0, idx3: 1 },
      { element: 9, idx1: 0, idx2: 1, idx3: 0 },
      { element: 2, idx1: 0, idx2: 1, idx3: 1 },
      { element: 3, idx1: 1, idx2: 0, idx3: 0 },
      { element: 3, idx1: 1, idx2: 0, idx3: 1 },
      { element: 4, idx1: 1, idx2: 0, idx3: 2 }
    ];

    dimensionForEach( 3, arr, function( element, idx1, idx2, idx3 ) {
      values.push( {
        element: element,
        idx1: idx1,
        idx2: idx2,
        idx3: idx3
      } );
    } );

    assert.ok( _.isEqual( values, expectedValues ), '3-dimensional comparison' );
  } );

} );