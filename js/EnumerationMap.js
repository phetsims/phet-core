// Copyright 2019-2021, University of Colorado Boulder

/**
 * An object that contains a value for each item in an enumeration.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import phetCore from './phetCore.js';

class EnumerationMap {
  /**
   * @param {Enumeration} enumeration
   * @param {function} factory - function( {Enumeration.*} ) => {*}, maps an enumeration value to any value.
   */
  constructor( enumeration, factory ) {

    // @private {Enumeration}
    this._enumeration = enumeration;

    enumeration.VALUES.forEach( entry => {
      assert && assert( this[ entry ] === undefined, 'Enumeration key override problem' );
      this[ entry ] = factory( entry );
    } );
  }

  /**
   * Returns the value associated with the given enumeration entry.
   * @public
   *
   * @param {Object} entry
   * @returns {*}
   */
  get( entry ) {
    assert && assert( this._enumeration.includes( entry ) );
    return this[ entry ];
  }

  /**
   * Sets the value associated with the given enumeration entry.
   * @public
   *
   * @param {Object} entry
   * @param {*} value
   */
  set( entry, value ) {
    assert && assert( this._enumeration.includes( entry ) );
    this[ entry ] = value;
  }

  /**
   * Returns a new EnumerationMap with mapped values.
   * @public
   *
   * @param {Function} mapFunction - function( {*}, {Enumeration.*} ): {*}
   * @returns {EnumerationMap.<*>} - With the mapped values
   */
  map( mapFunction ) {
    return new EnumerationMap( this._enumeration, entry => mapFunction( this.get( entry ), entry ) );
  }

  /**
   * Calls the callback on each item of the enumeration map.
   * @public
   *
   * @param {Function} callback - function(value:*, enumerationValue:*)
   */
  forEach( callback ) {
    this._enumeration.VALUES.forEach( entry => callback( this.get( entry ), entry ) );
  }

  /**
   * Returns the values stored in the map, as an array
   * @public
   *
   * @returns {Array.<*>}
   */
  values() {
    return this._enumeration.VALUES.map( entry => this.get( entry ) );
  }
}

phetCore.register( 'EnumerationMap', EnumerationMap );
export default EnumerationMap;