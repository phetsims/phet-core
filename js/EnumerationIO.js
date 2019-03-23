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
          return enumeration.values.map( v => v.name );
        },
        documentation: 'Gets the possible values of the enumeration.'
      }
    }, {
      validator: ObjectIO.validator,
      documentation: 'Enumeration pattern that provides a fixed set of possible values',

      // Used to generate the unique parametric typename for each EnumerationIO
      parameterTypes: [],

      events: [],

      /**
       * Encodes an Enumeration value to a string.
       * @param {Object} value from an Enumeration
       * @returns {Object} - a state object
       */
      toStateObject: function( value ) {
        return value.name;
      },

      /**
       * Decodes a string into an Enumeration value.
       * @param {Object} stateObject
       * @returns {Object}
       */
      fromStateObject: function( stateObject ) {
        return enumeration[ stateObject ];
      }
    } );
  }

  phetCore.register( 'EnumerationIO', EnumerationIO );

  return EnumerationIO;
} );