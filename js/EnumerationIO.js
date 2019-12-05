// Copyright 2018-2019, University of Colorado Boulder

/**
 * IO type for phet-core Enumeration that supports serializing and deserializing values.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const Enumeration = require( 'PHET_CORE/Enumeration' );
  const phetCore = require( 'PHET_CORE/phetCore' );
  const ObjectIO = require( 'TANDEM/types/ObjectIO' );

  // {Object.<enumerationKeys:string, function(new:ObjectIO)>} - Cache each parameterized EnumerationIO so that it is
  // only created once.
  const cache = {};

  /**
   * This caching implementation should be kept in sync with the other parametric IO type caching implementations.
   * @param {Enumeration} enumeration
   * @returns {function(new:ObjectIO)}
   */
  function EnumerationIO( enumeration ) {

    assert && assert( enumeration, 'enumeration must be supplied' );
    assert && assert( enumeration instanceof Enumeration, 'enumeration must be an Enumeration' );

    const cacheKey = enumeration.KEYS.join( '' );

    if ( !cache.hasOwnProperty( cacheKey ) ) {
      cache[ cacheKey ] = create( enumeration );
    }

    return cache[ cacheKey ];
  }

  /**
   * Creates a Enumeration IOType
   * @param {Enumeration} enumeration
   * @returns {function(new:ObjectIO)}
   */
  const create = enumeration => {

    class EnumerationIOImpl extends ObjectIO {
      constructor( a, b ) {
        assert && assert( false, 'This constructor is not called, because enumeration values, like primitives, are never wrapped.' );
        super( a, b );
      }

      /**
       * Encodes an Enumeration value to a string.
       * @param {Object} value from an Enumeration instance
       * @returns {Object} - a state object
       */
      static toStateObject( value ) {
        return toStateObjectImpl( value );
      }

      /**
       * Decodes a string into an Enumeration value.
       * @param {string} stateObject
       * @returns {Object}
       */
      static fromStateObject( stateObject ) {
        assert && assert( typeof stateObject === 'string', 'unsupported EnumerationIO value type, expected string' );
        assert && assert( enumeration.KEYS.indexOf( stateObject ) >= 0, `Unrecognized value: ${stateObject}` );
        return enumeration[ stateObject ];
      }

    }

    const toStateObjectImpl = v => v.name;
    const valueNames = enumeration.VALUES.map( toStateObjectImpl );

    // Enumeration supports additional documentation, so the values can be described.
    const additionalDocs = enumeration.phetioDocumentation ? ` ${enumeration.phetioDocumentation}` : '';

    EnumerationIOImpl.validator = ObjectIO.validator; // TODO: is this redundant?
    EnumerationIOImpl.documentation = `Possible values: ${valueNames}.${additionalDocs}`;
    EnumerationIOImpl.typeName = `EnumerationIO(${valueNames.join( '|' )})`;
    ObjectIO.validateSubtype( EnumerationIOImpl );

    return EnumerationIOImpl;
  };

  return phetCore.register( 'EnumerationIO', EnumerationIO );
} );