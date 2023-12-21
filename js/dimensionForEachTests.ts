// Copyright 2018-2020, University of Colorado Boulder

/**
 * Tests for dimensionForEach
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import dimensionForEach from './dimensionForEach.js';

QUnit.module( 'dimensionForEach' );

QUnit.test( '1 dimensional', assert => {
  const normalValues = [];
  const ourValues = [];

  const arr = [ 1, 2, 4, 9 ];

  arr.forEach( ( element, index ) => {
    normalValues.push( {
      element: element,
      index: index
    } );
  } );

  dimensionForEach( 1, arr, ( element, index ) => {
    ourValues.push( {
      element: element,
      index: index
    } );
  } );

  assert.ok( _.isEqual( normalValues, ourValues ), '1-dimensional comparison' );
} );

QUnit.test( '2 dimensional', assert => {
  const arr = [
    [ 1, 2, 4 ],
    [ 9, 5 ]
  ];
  const values = [];
  const expectedValues = [
    { element: 1, idx1: 0, idx2: 0 },
    { element: 2, idx1: 0, idx2: 1 },
    { element: 4, idx1: 0, idx2: 2 },
    { element: 9, idx1: 1, idx2: 0 },
    { element: 5, idx1: 1, idx2: 1 }
  ];

  dimensionForEach( 2, arr, ( element, idx1, idx2 ) => {
    values.push( {
      element: element,
      idx1: idx1,
      idx2: idx2
    } );
  } );

  assert.ok( _.isEqual( values, expectedValues ), '2-dimensional comparison' );
} );

QUnit.test( '3 dimensional', assert => {
  const arr = [
    [
      [ 1, 5 ],
      [ 9, 2 ]
    ],
    [
      [ 3, 3, 4 ]
    ]
  ];
  const values = [];
  const expectedValues = [
    { element: 1, idx1: 0, idx2: 0, idx3: 0 },
    { element: 5, idx1: 0, idx2: 0, idx3: 1 },
    { element: 9, idx1: 0, idx2: 1, idx3: 0 },
    { element: 2, idx1: 0, idx2: 1, idx3: 1 },
    { element: 3, idx1: 1, idx2: 0, idx3: 0 },
    { element: 3, idx1: 1, idx2: 0, idx3: 1 },
    { element: 4, idx1: 1, idx2: 0, idx3: 2 }
  ];

  dimensionForEach( 3, arr, ( element, idx1, idx2, idx3 ) => {
    values.push( {
      element: element,
      idx1: idx1,
      idx2: idx2,
      idx3: idx3
    } );
  } );

  assert.ok( _.isEqual( values, expectedValues ), '3-dimensional comparison' );
} );