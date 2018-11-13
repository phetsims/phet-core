// Copyright 2018, University of Colorado Boulder

/**
 * Tests for Enumeration
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( function( require ) {
  'use strict';

  // modules
  const Enumeration = require( 'PHET_CORE/Enumeration' );

  QUnit.module( 'Enumeration' );

  QUnit.test( 'Basic enumeration', function( assert ) {
    const CardinalDirection = new Enumeration( [ 'NORTH', 'SOUTH', 'EAST', 'WEST' ] );

    assert.equal( CardinalDirection.NORTH, 'NORTH', 'Equality for NORTH' );
    assert.equal( CardinalDirection.SOUTH, 'SOUTH', 'Equality for SOUTH' );
    assert.equal( CardinalDirection.EAST, 'EAST', 'Equality for EAST' );
    assert.equal( CardinalDirection.WEST, 'WEST', 'Equality for WEST' );

    assert.equal( CardinalDirection.includes( CardinalDirection.NORTH ), true, 'NORTH is in the enumeration' );
    assert.equal( CardinalDirection.includes( 'NORTH' ), false, 'Strings shouln\'t match' );
    assert.equal( CardinalDirection.includes( 'YORKSHIRE_TERRIER_WITH_THE_CANDLE_STICK_IN_THE_BALLROOM' ), false,
      'Not in the enumeration' );
    assert.equal( CardinalDirection.includes( { name: 'NORTH' } ), false, 'Should not be able to synthesize Enumeration values' );

    window.assert && assert.throws( function() {
      CardinalDirection.SOMETHING_AFTER_THE_FREEZE = 5;
    }, 'Should not be able to set things after initialization' );
  } );

  QUnit.test( 'Before freeze test', function( assert ) {
    const E = new Enumeration( [ 'A', 'B' ], E => {
      E.opposite = e => {
        window.assert && window.assert( E.includes( e ) );
        return e === E.A ? E.B : E.A;
      };
    } );

    assert.equal( E.A, 'A', 'Equality for A' );
    assert.equal( E.B, 'B', 'Equality for B' );
    assert.equal( E.opposite( E.A ), E.B, 'Custom function check 1' );
    assert.equal( E.opposite( E.B ), E.A, 'Custom function check 2' );

    window.assert && assert.throws( function() {
      E.SOMETHING_AFTER_THE_FREEZE = 5;
    }, 'Should not be able to set things after initialization' );
  } );
} );
