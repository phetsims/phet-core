// Copyright 2018-2020, University of Colorado Boulder

/**
 * IO Type for phet-core Enumeration that supports serializing and deserializing values.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import IOType from '../../tandem/js/types/IOType.js';
import Enumeration from './Enumeration.js';
import phetCore from './phetCore.js';

// {Map.<enumeration:Enumeration, function(new:ObjectIO)>} - Cache each parameterized EnumerationIO so that it is
// only created once.
const cacheMap = new Map();

/**
 * This caching implementation should be kept in sync with the other parametric IO Type caching implementations.
 * @param {Enumeration} enumeration
 * @returns {function(new:ObjectIO)}
 */
const EnumerationIO = enumeration => {
  assert && assert( enumeration, 'enumeration must be supplied' );
  assert && assert( enumeration instanceof Enumeration, 'enumeration must be an Enumeration' );

  if ( !cacheMap.has( enumeration ) ) {
    const toStateObjectImpl = v => v.name;
    const valueNames = enumeration.VALUES.map( toStateObjectImpl );

    // Enumeration supports additional documentation, so the values can be described.
    const additionalDocs = enumeration.phetioDocumentation ? ` ${enumeration.phetioDocumentation}` : '';

    cacheMap.set( enumeration, new IOType( `EnumerationIO(${valueNames.join( '|' )})`, {
      valueType: enumeration,
      documentation: `Possible values: ${valueNames}.${additionalDocs}`,
      toStateObject( value ) {
        return toStateObjectImpl( value );
      },
      fromStateObject( stateObject ) {
        assert && assert( typeof stateObject === 'string', 'unsupported EnumerationIO value type, expected string' );
        assert && assert( enumeration.KEYS.indexOf( stateObject ) >= 0, `Unrecognized value: ${stateObject}` );
        return enumeration[ stateObject ];
      }
    } ) );
  }

  return cacheMap.get( enumeration );
};

phetCore.register( 'EnumerationIO', EnumerationIO );
export default EnumerationIO;