// Copyright 2018-2019, University of Colorado Boulder

/**
 * IO type for phet-core Enumeration that supports serializing and deserializing values.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  const Enumeration = require( 'PHET_CORE/Enumeration' );
  const phetCore = require( 'PHET_CORE/phetCore' );
  const ObjectIO = require( 'TANDEM/types/ObjectIO' );
  const phetioInherit = require( 'TANDEM/phetioInherit' );
  const ArrayIO = require( 'TANDEM/types/ArrayIO' );
  const StringIO = require( 'TANDEM/types/StringIO' );

  /**
   * @param {Enumeration} enumeration
   * @module EnumerationIO
   * @constructor
   */
  function EnumerationIO( enumeration ) {
    assert && assert( enumeration, 'enumeration must be supplied' );
    assert && assert( enumeration instanceof Enumeration, 'enumeration must be an Enumeration' );

    /**
     * @param {Object} value
     * @param {string} phetioID
     * @constructor
     */
    const EnumerationIOImpl = function EnumerationIOImpl( value, phetioID ) {
      assert && assert( false, 'This constructor is not called, because enumeration values, like primitives, are never wrapped.' );
    };

    return phetioInherit( ObjectIO, 'EnumerationIO', EnumerationIOImpl, {
      getValues: {
        returnType: ArrayIO( StringIO ),
        parameterTypes: [],
        implementation: function() {
          return enumeration.values.map( v => EnumerationIOImpl.toStateObject( v ) );
        },
        documentation: 'Gets the possible values of the enumeration.'
      }
    }, {
      validator: ObjectIO.validator,
      documentation: 'Enumeration pattern that provides a fixed set of possible values: ' + enumeration.KEYS, // TODO: should call toStateObject on these

      // Used to generate the unique parametric typename for each EnumerationIO
      parameterTypes: [],

      events: [],

      /**
       * Encodes an Enumeration value to a string.
       * @param {Object} value from an Enumeration instance
       * @returns {Object} - a state object
       */
      toStateObject: function( value ) {
        return {
          value: value.toString().toLowerCase(),

          // TODO: this is a bit of a hack, how do we get EnumerationIO.getValues to work? https://github.com/phetsims/phet-io-wrappers/issues/290
          values: enumeration.VALUES.map( v => v.toString().toLowerCase() )
        };
      },

      /**
       * Decodes a string into an Enumeration value.
       * @param {string} stateObject - Enumeration value call with `toString()`
       * @returns {Object}
       */
      fromStateObject: function( stateObject ) {
        assert && assert( typeof stateObject === 'string', 'unsupported EnumerationIO value type, expected string' );
        const upperCase = stateObject.toUpperCase();
        assert && assert( enumeration.KEYS.indexOf( upperCase ) >= 0, `Unrecognized value: ${stateObject}` );
        return enumeration[ upperCase ];
      }
    } );
  }

  phetCore.register( 'EnumerationIO', EnumerationIO );

  return EnumerationIO;
} );