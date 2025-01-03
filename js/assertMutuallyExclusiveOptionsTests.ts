// Copyright 2019-2025, University of Colorado Boulder

/**
 * Tests for assertMutuallyExclusiveOptions
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import { isAffirmEnabled } from '../../perennial-alias/js/browser-and-node/affirm.js';
import assertMutuallyExclusiveOptions from './assertMutuallyExclusiveOptions.js';

QUnit.module( 'assertMutuallyExclusiveOptions' );

QUnit.test( 'assertMutuallyExclusiveOptions', assert => {
  assert.ok( true, 'one test whether or not assertions are enabled' );

  if ( isAffirmEnabled() ) {

    // Should not throw error because options are all from one set.
    assertMutuallyExclusiveOptions( { a: true, b: false }, [ 'a', 'b' ], [ 'c' ] );

    // Should error because options are used from multiple sets
    assert.throws( () => assertMutuallyExclusiveOptions( { a: true, b: false }, [ 'a' ], [ 'b' ] ) );
  }
} );