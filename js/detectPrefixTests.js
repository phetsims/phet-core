// Copyright 2017, University of Colorado Boulder

/**
 * detectPrefix tests
 *
 * @author Jonathan Olson (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const detectPrefix = require( 'PHET_CORE/detectPrefix' );

  QUnit.module( 'detectPrefix' );

  QUnit.test( 'detectPrefix', function( assert ) {
    const obj = {
      'main': false,
      'mozProp': ''
    };
    assert.equal( detectPrefix( obj, 'main' ), 'main' );
    assert.equal( detectPrefix( obj, 'prop' ), 'mozProp' );
    assert.equal( detectPrefix( obj, 'nothing' ), undefined );
  } );
} );