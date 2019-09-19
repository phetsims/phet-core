// Copyright 2017, University of Colorado Boulder

/**
 * detectPrefixEvent tests
 *
 * @author Jonathan Olson (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const detectPrefixEvent = require( 'PHET_CORE/detectPrefixEvent' );

  QUnit.module( 'detectPrefixEvent' );

  QUnit.test( 'detectPrefixEvent', function( assert ) {
    const obj = {
      'onmain': false,
      'onmozprop': ''
    };

    assert.equal( detectPrefixEvent( obj, 'main' ), 'main' );
    assert.equal( detectPrefixEvent( obj, 'prop' ), 'mozprop' );
    assert.equal( detectPrefixEvent( obj, 'nothing' ), undefined );
  } );
} );