// Copyright 2018, University of Colorado Boulder

/**
 * Creates a simple enumeration, with most of the boilerplate.
 *
 * An Enumeration can be created like this:
 *
 *   const CardinalDirection = new Enumeration( [ 'NORTH', 'SOUTH', 'EAST', 'WEST' ] );
 *
 * and values are referenced like this:
 *
 *   CardinalDirection.NORTH;
 *   CardinalDirection.SOUTH;
 *   CardinalDirection.EAST;
 *   CardinalDirection.WEST;
 *   
 *   CardinalDirection.VALUES;
 *   // returns [ CardinalDirection.NORTH, CardinalDirection.SOUTH, CardinalDirection.EAST, CardinalDirection.WEST ]
 *
 * And support for checking whether any value is a value of the enumeration:
 *
 *   CardinalDirection.includes( CardinalDirection.NORTH ); // true
 *   CardinalDirection.includes( CardinalDirection.SOUTHWEST ); // false
 *   CardinalDirection.includes( 'NORTH' ); // false, values are not strings
 *
 * Conventions for using Enumeration, from https://github.com/phetsims/phet-core/issues/53:
 *
 * (1) Enumerations are named like classes/types. Nothing in the name needs to identify that they are Enumerations.
 *     See the example above: CardinalDirection, not CardinalDirectionEum or CardinalDirectionEnumeration.
 *
 * (2) Enumeration values are named like constants, using uppercase. See the example above.
 *
 * (3) If an Enumeration is closely related to some class, then make it a static field of that class. If an
 *     Enumeration is specific to a Property, then the Enumeration should likely be owned by the class that
 *     owns that Property.
 *
 * (4) If an Enumeration is not closely related to some class, then put the Enumeration in its own .js file.
 *     Do not combine multiple Enumerations into one file.
 *
 * (5) If a Property takes an Enumeration value, its validation typically looks like this:
 *
 *     const cardinalDirectionProperty = new Property( CardinalDirection.NORTH, {
 *       validValues: CardinalDirection.VALUES
 *     }
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( require => {
  'use strict';

  // modules
  const phetCore = require( 'PHET_CORE/phetCore' );

  class Enumeration {
    /**
     * @param {Array.<string>} keys - The string keys for the enumeration. Customarily, these are uppercase, using
     *                                underscores where there would be other punctuation. For example,
     *                                `THIS_IS_AN_EXAMPLE` or `DOES_NOT_WANT_TO_BE_AN_EXAMPLE_TOO_BAD`.
     * @param {function} [beforeFreeze] - If provided, it will be called as beforeFreeze( enumeration ) just before the
     *                                    enumeration is frozen. Since it's not possible to modify the enumeration after
     *                                    it is frozen (e.g. adding convenience functions), and there is no reference to
     *                                    the enumeration object beforehand, this allows defining custom values/methods
     *                                    on the enumeration object itself.
     */
    constructor( keys, beforeFreeze ) {
      assert && assert( Array.isArray( keys ), 'Values should be an array' );
      assert && assert( _.uniq( keys ).length === keys.length, 'There should be no duplicated values provided' );
      assert && keys.forEach( value => assert( typeof value === 'string', 'Each value should be a string' ) );
      assert && keys.forEach( value => assert( /^[A-Z][A-Z0-9_]*$/g.test( value ),
        'Enumeration values should be uppercase alphanumeric with underscores and begin with a letter' ) );
      assert && assert( !_.includes( keys, 'VALUES' ),
        'This is the name of a built-in provided value, so it cannot be included as an enumeration value' );
      assert && assert( !_.includes( keys, 'includes' ),
        'This is the name of a built-in provided value, so it cannot be included as an enumeration value' );

      // @public {Object[]} (read-only) - the object values of the enumeration
      this.VALUES = [];

      // @public {string[]} (read-only) - the string keys of the enumeration
      this.KEYS = [];

      keys.forEach( key => {
        this[ key ] = {
          name: key,
          toString() {return key;}
        };
        this.VALUES.push( this[ key ] );
        this.KEYS.push( key );
      } );

      beforeFreeze && beforeFreeze( this );
      assert && Object.freeze( this );
      assert && Object.freeze( this.VALUES );
      assert && Object.freeze( this.KEYS );
    }

    /**
     * Checks whether the given value is a value of this enumeration. Should generally be used for assertions
     * @public
     *
     * @param {Object} value
     * @returns {boolean}
     */
    includes( value ) {
      return _.includes( this.VALUES, value );
    }
  }

  return phetCore.register( 'Enumeration', Enumeration );
} );
