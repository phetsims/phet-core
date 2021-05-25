// Copyright 2017-2021, University of Colorado Boulder

/**
 * detectPrefix tests
 *
 * @author Jonathan Olson (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 */

import detectPrefix from './detectPrefix.js';

QUnit.module( 'detectPrefix' );

QUnit.test( 'detectPrefix', assert => {
  const obj = {
    main: false,
    mozProp: ''
  };
  assert.equal( detectPrefix( obj, 'main' ), 'main' );
  assert.equal( detectPrefix( obj, 'prop' ), 'mozProp' );
  assert.equal( detectPrefix( obj, 'nothing' ), undefined );
} );