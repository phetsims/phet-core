// Copyright 2018, University of Colorado Boulder

/**
 * Creates a simple enumeration, with most of the boilerplate.
 *
 * When you create an enumeration object, it sets up a few things, e.g.:
 *
 *   const CardinalDirection = new Enumeration( [ 'NORTH', 'SOUTH', 'EAST', 'WEST' ] );
 *
 * Will provide the following:
 *
 *   CardinalDirection.NORTH; // 'NORTH'
 *   CardinalDirection.SOUTH; // 'SOUTH'
 *   CardinalDirection.EAST; // 'EAST'
 *   CardinalDirection.WEST; // 'WEST'
 *   CardinalDirection.VALUES; // [ 'NORTH', 'SOUTH', 'EAST', 'WEST' ]
 *
 * And support for checking whether any value is a value of the enumeration:
 *
 *   CardinalDirection.includes( 'NORTH' ); // true
 *   CardinalDirection.includes( 'YORKSHIRE_TERRIER_WITH_THE_CANDLE_STICK_IN_THE_BALLROOM' ); // false
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const phetCore = require( 'PHET_CORE/phetCore' );

  class Enumeration {
    /**
     * @param {Array.<string>} values - The string values for the enumeration. Customarily, these are uppercase, using
     *                                  underscores where there would be other punctuation. For example,
     *                                  `THIS_IS_AN_EXAMPLE` or `DOES_NOT_WANT_TO_BE_AN_EXAMPLE_TOO_BAD`.
     * @param {function} [beforeFreeze] - If provided, it will be called as beforeFreeze( enumeration ) just before the
     *                                    enumeration is frozen. Since it's not possible to modify the enumeration after
     *                                    it is frozen (e.g. adding convenience functions), and there is no reference to
     *                                    the enumeration object beforehand, this allows defining custom values/methods
     *                                    on the enumeration object itself.
     */
    constructor( values, beforeFreeze ) {
      assert && assert( Array.isArray( values ), 'Values should be an array' );
      assert && assert( _.uniq( values ).length === values.length, 'There should be no duplicated values provided' );
      assert && values.forEach( value => assert( typeof value === 'string', 'Each value should be a string' ) );
      assert && assert( !_.includes( values, 'VALUES' ),
        'This is the name of a built-in provided value, so it cannot be included as an enumeration value' );
      assert && assert( !_.includes( values, 'includes' ),
        'This is the name of a built-in provided value, so it cannot be included as an enumeration value' );

      for ( let value of values ) {
        // @public {string}
        this[ value ] = value;
      }

      // @public {Array.<string>}
      this.VALUES = values.slice(); // defensive copy

      beforeFreeze && beforeFreeze( this );
      assert && Object.freeze( this );
    }

    /**
     * Checks whether the given value is a value of this enumeration. Should generally be used for assertions
     * @public
     *
     * @param {string} value
     * @returns {boolean}
     */
    includes( value ) {
      return this.VALUES.includes( value );
    }
  }

  return phetCore.register( 'Enumeration', Enumeration );
} );
