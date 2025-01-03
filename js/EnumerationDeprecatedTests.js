// Copyright 2018-2025, University of Colorado Boulder

/**
 * Tests for EnumerationDeprecated
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import affirm, { isAffirmEnabled } from '../../perennial-alias/js/browser-and-node/affirm.js';
import EnumerationDeprecated from './EnumerationDeprecated.js';

QUnit.module( 'EnumerationDeprecated' );

QUnit.test( 'Basic enumeration', assert => {
  const CardinalDirection = EnumerationDeprecated.byKeys( [ 'NORTH', 'SOUTH', 'EAST', 'WEST' ] );

  assert.equal( CardinalDirection.NORTH, 'NORTH', 'Equality for NORTH' );
  assert.equal( CardinalDirection.SOUTH, 'SOUTH', 'Equality for SOUTH' );
  assert.equal( CardinalDirection.EAST, 'EAST', 'Equality for EAST' );
  assert.equal( CardinalDirection.WEST, 'WEST', 'Equality for WEST' );

  assert.equal( CardinalDirection.includes( CardinalDirection.NORTH ), true, 'NORTH is in the enumeration' );
  assert.equal( CardinalDirection.includes( 'NORTH' ), false, 'Strings shouln\'t match' );
  assert.equal( CardinalDirection.includes( 'YORKSHIRE_TERRIER_WITH_THE_CANDLE_STICK_IN_THE_BALLROOM' ), false,
    'Not in the enumeration' );
  assert.equal( CardinalDirection.includes( { name: 'NORTH' } ), false, 'Should not be able to synthesize EnumerationDeprecated values' );

  // Test toString
  const object = {};
  object[ CardinalDirection.NORTH ] = 'exit';
  assert.equal( object.NORTH, 'exit', 'toString should work seamlessly' );

  isAffirmEnabled() && assert.throws( () => {
    CardinalDirection.SOMETHING_AFTER_THE_FREEZE = 5;
  }, 'Should not be able to set things after initialization' );

  isAffirmEnabled() && assert.throws( () => {
    const X = EnumerationDeprecated.byKeys( [ 'lowercase', 'should', 'fail' ] );
    assert.ok( !!X, 'fake assertion so x is used' );
  }, 'EnumerationDeprecated should fail for lowercase values' );
} );

QUnit.test( 'Before freeze test', assert => {
  const E = EnumerationDeprecated.byKeys( [ 'A', 'B' ], {
    beforeFreeze: E => {
      E.opposite = e => {
        affirm( E.includes( e ) );
        return e === E.A ? E.B : E.A;
      };
    }
  } );

  assert.equal( E.A, 'A', 'Equality for A' );
  assert.equal( E.B, 'B', 'Equality for B' );
  assert.equal( E.opposite( E.A ), E.B, 'Custom function check 1' );
  assert.equal( E.opposite( E.B ), E.A, 'Custom function check 2' );

  isAffirmEnabled() && assert.throws( () => {
    E.SOMETHING_AFTER_THE_FREEZE = 5;
  }, 'Should not be able to set things after initialization' );
} );

QUnit.test( 'VALUES', assert => {
  const People = EnumerationDeprecated.byKeys( [ 'ALICE', 'BOB' ] );
  assert.ok( true, 'at least one assertion must run per test' );
  isAffirmEnabled() && assert.throws( () => {
    People.VALUES = 'something else';
  }, 'Setting values after initialization should throw an error.' );
} );

QUnit.test( 'Rich', assert => {
  class Planet {
    constructor( order ) {
      this.order = order;
    }

    // @public
    getString( name ) {
      return `${name} is a person from the ${this.order} planet.`;
    }
  }

  class Venus extends Planet {}

  const Planets = EnumerationDeprecated.byMap( {
    MARS: new Planet( 2 ),
    EARTH: new Planet( 3 )
  } );

  assert.ok( Planets.MARS.order === 2, 'mars order should match' );
  assert.ok( typeof Planets.EARTH.getString( 'bob' ) === 'string', 'should return a string' );
  isAffirmEnabled() && assert.throws( () => {
    Planets.MARS = 'hello'; // fails because enumeration values should not be reassignable
  } );

  isAffirmEnabled() && assert.throws( () => {
    Planets.MARS.name = 'not mars!'; // Should not be able to reassign enumeration value properties
  } );

  isAffirmEnabled() && assert.throws( () => {
    EnumerationDeprecated.byMap( {
      MARS: new Planet( 2 ),
      EARTH: new Planet( 3 ),
      VENUS: new Venus( 7 ) // Forbidden at the moment, see https://github.com/phetsims/phet-core/issues/50#issuecomment-575324970
    } );
  } );
} );