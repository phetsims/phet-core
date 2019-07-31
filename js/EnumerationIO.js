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

    // Enumeration supports additional documentation, so the values can be described.
    const additionalDocs = enumeration.phetioDocumentation ? `, ${enumeration.phetioDocumentation}` : '';

    const toStateObjectImpl = v => v.name;
    const valueNames = enumeration.VALUES.map( toStateObjectImpl );

    return phetioInherit( ObjectIO, 'EnumerationIO', EnumerationIOImpl, {
      getValues: {
        returnType: ArrayIO( StringIO ),
        parameterTypes: [],
        implementation: function() {
          return valueNames;
        },
        documentation: 'Gets the possible values of the enumeration.'
      }
    }, {
      validator: ObjectIO.validator,

      enumerationValues: valueNames,

      documentation: `Enumeration pattern that provides a fixed set of possible values: ${valueNames}${additionalDocs}`,

      events: [], // TODO: is this necessary?

      /**
       * Encodes an Enumeration value to a string.
       * @param {Object} value from an Enumeration instance
       * @returns {Object} - a state object
       */
      toStateObject: function( value ) {
        return toStateObjectImpl( value );
      },

      /**
       * Decodes a string into an Enumeration value.
       * @param {string} stateObject
       * @returns {Object}
       */
      fromStateObject: function( stateObject ) {
        assert && assert( typeof stateObject === 'string', 'unsupported EnumerationIO value type, expected string' );
        assert && assert( enumeration.KEYS.indexOf( stateObject ) >= 0, `Unrecognized value: ${stateObject}` );
        return enumeration[ stateObject ];
      }
    } );
  }

  phetCore.register( 'EnumerationIO', EnumerationIO );

  return EnumerationIO;
} );