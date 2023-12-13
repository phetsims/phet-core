// Copyright 2018-2021, University of Colorado Boulder

/**
 * arrayDifference tests
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import arrayDifference from './arrayDifference.js';
import arrayRemove from './arrayRemove.js';

QUnit.module( 'arrayDifference' );

function assertDifferences( assert, a, b, expectedAOnly, expectedBOnly, expectedBoth ) {
  const aOnly = [];
  const bOnly = [];
  const inBoth = [];
  const result = arrayDifference( a, b, aOnly, bOnly, inBoth );

  assert.ok( _.isEqual( aOnly, expectedAOnly ), `aOnly: ${a.toString()} diff ${b.toString()} expected: ${expectedAOnly.toString()} actual: ${aOnly.toString()}` );
  assert.ok( _.isEqual( bOnly, expectedBOnly ), `bOnly: ${a.toString()} diff ${b.toString()} expected: ${expectedBOnly.toString()} actual: ${bOnly.toString()}` );
  assert.ok( _.isEqual( inBoth, expectedBoth ), `inBoth: ${a.toString()} diff ${b.toString()} expected: ${expectedBoth.toString()} actual: ${inBoth.toString()}` );
  assert.ok( _.isEqual( aOnly, result ), `return value: ${a.toString()} diff ${b.toString()}` );
}

function generatedTest( assert, maxNumber, aSize, bSize ) {
  const a = [];
  const b = [];
  const aOnly = [];
  const bOnly = [];
  const inBoth = [];
  let item;

  const range = _.range( 1, maxNumber );
  const aRange = range.slice();
  const bRange = range.slice();

  while ( a.length < aSize ) {
    item = _.sample( aRange ); // eslint-disable-line bad-sim-text
    arrayRemove( aRange, item );
    a.push( item );
  }
  while ( b.length < bSize ) {
    item = _.sample( bRange ); // eslint-disable-line bad-sim-text
    arrayRemove( bRange, item );
    b.push( item );
  }

  for ( let i = 0; i < range.length; i++ ) {
    item = range[ i ];

    const inA = _.includes( a, item );
    const inB = _.includes( b, item );

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

  aOnly.sort( ( x, y ) => a.indexOf( x ) - a.indexOf( y ) );
  bOnly.sort( ( x, y ) => b.indexOf( x ) - b.indexOf( y ) );
  inBoth.sort( ( x, y ) => a.indexOf( x ) - a.indexOf( y ) );

  assertDifferences( assert, a, b, aOnly, bOnly, inBoth );
}

QUnit.test( 'Simple Usage 1', assert => {
  const a = [ 1, 2 ];
  const b = [ 2, 3 ];
  assert.ok( _.isEqual( arrayDifference( a, b ), [ 1 ] ) );
} );

QUnit.test( 'General Usage 1', assert => {
  assertDifferences( assert, [ 1, 2 ], [ 2, 3 ], [ 1 ], [ 3 ], [ 2 ] );
} );

QUnit.test( 'General Usage 2', assert => {
  const a = [ 2, 19, 7, 12, 8, 6, 14, 5, 4, 9 ];
  const b = [ 17, 18, 9, 14, 20, 4, 3, 15 ];
  const aOnly = [ 2, 19, 7, 12, 8, 6, 5 ];
  const bOnly = [ 17, 18, 20, 3, 15 ];
  const inBoth = [ 14, 4, 9 ];
  assertDifferences( assert, a, b, aOnly, bOnly, inBoth );
} );

QUnit.test( 'General Usage 3', assert => {
  assertDifferences( assert, [ 1, 2, 3, 4, 5 ], [ 3 ], [ 1, 2, 4, 5 ], [], [ 3 ] );
} );

QUnit.test( 'General Usage 4', assert => {
  assertDifferences( assert, [ 1, 2, 3, 4, 5 ], [], [ 1, 2, 3, 4, 5 ], [], [] );
} );

QUnit.test( 'General Usage 5', assert => {
  assertDifferences( assert, [], [ 1, 2, 3, 4, 5 ], [], [ 1, 2, 3, 4, 5 ], [] );
} );

QUnit.test( 'Generated tests', assert => {
  _.times( 20, () => {
    generatedTest( assert, 20, 10, 10 );
  } );
  _.times( 4, () => {
    const size = 30;
    for ( let i = 0; i <= size; i++ ) {
      generatedTest( assert, size + 5, i, size - i );
    }
  } );
} );