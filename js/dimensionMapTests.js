// Copyright 2018-2020, University of Colorado Boulder

/**
 * Tests for dimensionMap
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import dimensionMap from './dimensionMap.js';

QUnit.module( 'dimensionMap' );

QUnit.test( '1 dimensional', assert => {
  function checkMap( values, map, message ) {
    assert.ok( _.isEqual( dimensionMap( 1, values, map ), values.map( map ) ), message );
  }

  checkMap( [ 1, 2, 4 ], x => x, 'Identity' );
  checkMap( [ 1, 2, 4 ], x => 2 * x, 'Simple map' );
  checkMap( [ 1, 2, 4 ], ( x, index ) => 2 * x + index, 'Indexed map' );
} );

QUnit.test( 'multidimensional', assert => {
  const dim2 = [
    [ 1, 4, 10 ],
    [ 5, 3, -1 ]
  ];

  const dim3 = [
    [
      [ 1, 9, 25 ],
      [ 23 ]
    ],
    [
      [ 5, 5, 5, 5 ],
      [ 2, 9 ],
      [ 1 ],
      [ 3, -10 ]
    ]
  ];

  assert.ok( _.isEqual( dimensionMap( 2, dim2, x => x ), dim2 ), '2-dimensional identity' );
  assert.ok( _.isEqual( dimensionMap( 3, dim3, x => x ), dim3 ), '3-dimensional identity' );
  assert.ok( _.isEqual( dimensionMap( 2, dim2, ( x, idx1, idx2 ) => dim2[ idx1 ][ idx2 ] ), dim2 ), '2-dimensional indexing-based' );
  assert.ok( _.isEqual( dimensionMap( 3, dim3, ( x, idx1, idx2, idx3 ) => dim3[ idx1 ][ idx2 ][ idx3 ] ), dim3 ), '3-dimensional indexing-based' );
  assert.ok( _.isEqual( dimensionMap( 2, dim2, x => 2 * x ), [
    [ 2, 8, 20 ],
    [ 10, 6, -2 ]
  ] ), '2-dimensional times 2' );
  assert.ok( _.isEqual( dimensionMap( 3, dim3, x => 2 * x ), [
    [
      [ 2, 18, 50 ],
      [ 46 ]
    ],
    [
      [ 10, 10, 10, 10 ],
      [ 4, 18 ],
      [ 2 ],
      [ 6, -20 ]
    ]
  ] ), '3-dimensional times 2' );
} );