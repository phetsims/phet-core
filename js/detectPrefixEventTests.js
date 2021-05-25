// Copyright 2017-2021, University of Colorado Boulder

/**
 * detectPrefixEvent tests
 *
 * @author Jonathan Olson (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 */

import detectPrefixEvent from './detectPrefixEvent.js';

QUnit.module( 'detectPrefixEvent' );

QUnit.test( 'detectPrefixEvent', assert => {
  const obj = {
    onmain: false,
    onmozprop: ''
  };

  assert.equal( detectPrefixEvent( obj, 'main' ), 'main' );
  assert.equal( detectPrefixEvent( obj, 'prop' ), 'mozprop' );
  assert.equal( detectPrefixEvent( obj, 'nothing' ), undefined );
} );