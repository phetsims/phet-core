// Copyright 2018-2022, University of Colorado Boulder

/**
 * Creates a simple enumeration, with most of the boilerplate.
 *
 * An EnumerationDeprecated can be created like this:
 *
 *   const CardinalDirection = EnumerationDeprecated.byKeys( [ 'NORTH', 'SOUTH', 'EAST', 'WEST' ] );
 *
 * OR using rich values like so:
 *
 *   const CardinalDirection = EnumerationDeprecated.byMap( {NORTH: northObject, SOUTH: southObject, EAST: eastObject, WEST: westObject} );
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
 * Conventions for using EnumerationDeprecated, from https://github.com/phetsims/phet-core/issues/53:
 *
 * (1) Enumerations are named like classes/types. Nothing in the name needs to identify that they are Enumerations.
 *     See the example above: CardinalDirection, not CardinalDirectionEnum or CardinalDirectionEnumeration.
 *
 * (2) EnumerationDeprecated values are named like constants, using uppercase. See the example above.
 *
 * (3) If an EnumerationDeprecated is closely related to some class, then make it a static field of that class. If an
 *     EnumerationDeprecated is specific to a Property, then the EnumerationDeprecated should likely be owned by the class that
 *     owns that Property.
 *
 * (4) If an EnumerationDeprecated is not closely related to some class, then put the EnumerationDeprecated in its own .js file.
 *     Do not combine multiple Enumerations into one file.
 *
 * (5) If a Property takes an EnumerationDeprecated value, its validation typically looks like this:
 *
 *     const cardinalDirectionProperty = new Property( CardinalDirection.NORTH, {
 *       validValues: CardinalDirection.VALUES
 *     }
 *
 * (6) Values of the EnumerationDeprecated are considered instances of the EnumerationDeprecated in documentation. For example, a method
 *     that that takes an EnumerationDeprecated value as an argument would be documented like this:
 *
 *     // @param {Scene} mode - value from Scene EnumerationDeprecated
 *     setSceneMode( mode ) {
 *       assert && assert( Scene.includes( mode ) );
 *       //...
 *     }
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import deprecationWarning from './deprecationWarning.js';
import merge from './merge.js';
import phetCore from './phetCore.js';

/**
 * @deprecated
 */
class EnumerationDeprecated {

  /**
   * @param {Object} config - must provide keys such as {keys:['RED','BLUE]}
   *                          - or map such as {map:{RED: myRedValue, BLUE: myBlueValue}}
   *
   * @private - clients should use EnumerationDeprecated.byKeys or EnumerationDeprecated.byMap
   */
  constructor( config ) {
    deprecationWarning( 'EnumerationDeprecated should be exchanged for classes that extend EnumerationValue, see WilderEnumerationPatterns for examples.' );

    assert && assert( config, 'config must be provided' );

    const keysProvided = !!config.keys;
    const mapProvided = !!config.map;
    assert && assert( keysProvided !== mapProvided, 'must provide one or the other but not both of keys/map' );

    const keys = config.keys || Object.keys( config.map );
    const map = config.map || {};

    config = merge( {

      // {string|null} Will be appended to the EnumerationIO documentation, if provided
      phetioDocumentation: null,

      // {function(EnumerationDeprecated):|null} If provided, it will be called as beforeFreeze( enumeration ) just before the
      // enumeration is frozen. Since it's not possible to modify the enumeration after
      // it is frozen (e.g. adding convenience functions), and there is no reference to
      // the enumeration object beforehand, this allows defining custom values/methods
      // on the enumeration object itself.
      beforeFreeze: null
    }, config );

    assert && assert( Array.isArray( keys ), 'Values should be an array' );
    assert && assert( _.uniq( keys ).length === keys.length, 'There should be no duplicated values provided' );
    assert && keys.forEach( value => assert( typeof value === 'string', 'Each value should be a string' ) );
    assert && keys.forEach( value => assert( /^[A-Z][A-Z0-9_]*$/g.test( value ),
      'EnumerationDeprecated values should be uppercase alphanumeric with underscores and begin with a letter' ) );
    assert && assert( !_.includes( keys, 'VALUES' ),
      'This is the name of a built-in provided value, so it cannot be included as an enumeration value' );
    assert && assert( !_.includes( keys, 'KEYS' ),
      'This is the name of a built-in provided value, so it cannot be included as an enumeration value' );
    assert && assert( !_.includes( keys, 'includes' ),
      'This is the name of a built-in provided value, so it cannot be included as an enumeration value' );

    // @public (phet-io) - provides additional documentation for PhET-iO which can be viewed in studio
    // Note this uses the same term as used by PhetioObject, but via a different channel.
    this.phetioDocumentation = config.phetioDocumentation;

    // @public {string[]} (read-only) - the string keys of the enumeration
    this.KEYS = keys;

    // @public {Object[]} (read-only) - the object values of the enumeration
    this.VALUES = [];

    keys.forEach( key => {
      const value = map[ key ] || {};

      // Set attributes of the enumeration value
      assert && assert( value.name === undefined, '"rich" enumeration values cannot provide their own name attribute' );
      assert && assert( value.toString === Object.prototype.toString, '"rich" enumeration values cannot provide their own toString' );

      // @public {string} (read-only) - PhET-iO public API relies on this mapping, do not change it lightly
      value.name = key;

      // @public {function():string} (read-only)
      value.toString = () => key;

      // Assign to the enumeration
      this[ key ] = value;
      this.VALUES.push( value );
    } );

    config.beforeFreeze && config.beforeFreeze( this );
    assert && Object.freeze( this );
    assert && Object.freeze( this.VALUES );
    assert && Object.freeze( this.KEYS );
    assert && keys.forEach( key => assert && Object.freeze( map[ key ] ) );
  }

  /**
   * Based solely on the keys in EnumerationDeprecated.
   * @public
   *
   * @returns {String}
   */

  toString() {
    return this.KEYS.join( ', ' );
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

  /**
   * To support consistent API with Enumeration.
   * @public
   * @param {string} key
   * @returns {*}
   */
  getValue( key ) {
    return this[ key ];
  }

  /**
   * To support consistent API with Enumeration.
   * @public
   * @param {Object} enumerationValue
   * @returns {string}
   */
  getKey( enumerationValue ) {
    return enumerationValue.name;
  }

  /**
   * To support consistent API with Enumeration.
   * @public
   * @returns {Object[]}
   */
  get values() {
    return this.VALUES;
  }

  /**
   * To support consistent API with Enumeration.
   * @public
   * @returns {string[]}
   */
  get keys() {
    return this.KEYS;
  }

  /**
   * To support consistent API with Enumeration.
   * @public
   * @returns {EnumerationDeprecated}
   */
  get enumeration() {
    return this;
  }

  /**
   * Creates an enumeration based on the provided string array
   * @param {string[]} keys - such as ['RED','BLUE']
   * @param {Object} [options]
   * @returns {EnumerationDeprecated}
   * @public
   */
  static byKeys( keys, options ) {
    assert && assert( Array.isArray( keys ), 'keys must be an array' );
    assert && assert( !options || options.keys === undefined );
    return new EnumerationDeprecated( merge( { keys: keys }, options ) );
  }

  /**
   * Creates a "rich" enumeration based on the provided map
   * @param {Object} map - such as {RED: myRedValue, BLUE: myBlueValue}
   * @param {Object} [options]
   * @returns {EnumerationDeprecated}
   * @public
   */
  static byMap( map, options ) {
    assert && assert( !options || options.map === undefined );
    if ( assert ) {
      const values = _.values( map );
      assert && assert( values.length >= 1, 'must have at least 2 entries in an enumeration' );
      assert && assert( _.every( values, value => value.constructor === values[ 0 ].constructor ), 'Values must have same constructor' );
    }
    return new EnumerationDeprecated( merge( { map: map }, options ) );
  }
}

phetCore.register( 'EnumerationDeprecated', EnumerationDeprecated );
export default EnumerationDeprecated;