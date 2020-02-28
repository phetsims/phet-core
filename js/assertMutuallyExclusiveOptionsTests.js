// Copyright 2019-2020, University of Colorado Boulder

/**
 * Tests for assertMutuallyExclusiveOptions
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import assertMutuallyExclusiveOptions from './assertMutuallyExclusiveOptions.js';

QUnit.module( 'assertMutuallyExclusiveOptions' );

QUnit.test( 'assertMutuallyExclusiveOptions', assert => {
  assert.ok( true, 'one test whether or not assertions are enabled' );

  if ( window.assert ) {

    // Should not throw error because options are all from one set.
    assertMutuallyExclusiveOptions( { a: true, b: false }, [ 'a', 'b' ], [ 'c' ] );

    // Should error because options are used from multiple sets
    assert.throws( () => assertMutuallyExclusiveOptions( { a: true, b: false }, [ 'a' ], [ 'b' ] ) );
  }
} );