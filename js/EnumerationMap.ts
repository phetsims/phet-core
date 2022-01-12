// Copyright 2019-2022, University of Colorado Boulder

/**
 * An object that contains a value for each item in an enumeration.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import phetCore from './phetCore.js';

type IEnumeration<T> = {

  // EnumerationDeprecated API
  VALUES: T[],
  enumeration: never
} | {

  // RichEnumeration API
  VALUES: never,
  enumeration: {
    values: T[]
  }
};

// T = enumeration value type
// U = mapped value type
class EnumerationMap<T, U> {
  private _enumeration: IEnumeration<T>;
  private _map = new Map<T, U>();

  /**
   * @param enumeration
   * @param factory - function( {IEnumeration.*} ) => {*}, maps an enumeration value to any value.
   */
  constructor( enumeration: IEnumeration<T>, factory: ( t: T ) => U ) {

    // @private
    this._enumeration = enumeration;

    const values = enumeration.VALUES || enumeration.enumeration.values;
    values.forEach( entry => {
      assert && assert( !this._map.has( entry ), 'Enumeration key override problem' );
      this._map.set( entry, factory( entry ) );
    } );
  }

  /**
   * Returns the value associated with the given enumeration entry.
   */
  get( entry: T ): U {
    assert && assert( this._enumeration.VALUES.includes( entry ) );
    assert && assert( this._map.has( entry ) );
    return this._map.get( entry )!;
  }

  /**
   * Sets the value associated with the given enumeration entry.
   * @public
   *
   * @param {Object} entry
   * @param {*} value
   */
  set( entry: T, value: U ) {
    assert && assert( this._enumeration.VALUES.includes( entry ) );
    this._map.set( entry, value );
  }

  /**
   * Returns a new EnumerationMap with mapped values.
   * @public
   *
   * @param {Function} mapFunction - function( {*}, {IEnumeration.*} ): {*}
   * @returns {EnumerationMap.<*>} - With the mapped values
   */
  map( mapFunction: ( u: U, t: T ) => U ) {
    return new EnumerationMap( this._enumeration, entry => mapFunction( this.get( entry ), entry ) );
  }

  /**
   * Calls the callback on each item of the enumeration map.
   * @public
   *
   * @param {Function} callback - function(value:*, enumerationValue:*)
   */
  forEach( callback: ( u: U, t: T ) => void ) {
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