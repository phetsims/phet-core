// Copyright 2018-2020, University of Colorado Boulder

/**
 * IO type for phet-core Enumeration that supports serializing and deserializing values.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import ObjectIO from '../../tandem/js/types/ObjectIO.js';
import Enumeration from './Enumeration.js';
import phetCore from './phetCore.js';

// {Map.<enumeration:Enumeration, function(new:ObjectIO)>} - Cache each parameterized EnumerationIO so that it is
// only created once.
const cacheMap = new Map();

/**
 * This caching implementation should be kept in sync with the other parametric IO type caching implementations.
 * @param {Enumeration} enumeration
 * @returns {function(new:ObjectIO)}
 */
function EnumerationIO( enumeration ) {

  assert && assert( enumeration, 'enumeration must be supplied' );
  assert && assert( enumeration instanceof Enumeration, 'enumeration must be an Enumeration' );

  if ( !cacheMap.has( enumeration ) ) {
    cacheMap.set( enumeration, create( enumeration ) );
  }

  return cacheMap.get( enumeration );
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
     * @override
     * @public
     */
    static toStateObject( value ) {
      return toStateObjectImpl( value );
    }

    /**
     * Decodes a string into an Enumeration value.
     * @param {string} stateObject
     * @returns {Object}
     * @override
     * @public
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

  EnumerationIOImpl.validator = { valueType: enumeration };
  EnumerationIOImpl.documentation = `Possible values: ${valueNames}.${additionalDocs}`;
  EnumerationIOImpl.typeName = `EnumerationIO(${valueNames.join( '|' )})`;
  ObjectIO.validateSubtype( EnumerationIOImpl );

  return EnumerationIOImpl;
};

phetCore.register( 'EnumerationIO', EnumerationIO );
export default EnumerationIO;