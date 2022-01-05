// Copyright 2019-2021, University of Colorado Boulder

/**
 * An object that contains a value for each item in an enumeration.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import phetCore from './phetCore.js';

type IEnumeration<T> = {
  VALUES: T[]
};

// T = enumeration value type
// U = mapped value type
class EnumerationMap<T, U> {
  private _enumeration: IEnumeration<T>;
  private _map = new Map<T, U>();

  /**
   * @param {Enumeration} enumeration
   * @param {function} factory - function( {Enumeration.*} ) => {*}, maps an enumeration value to any value.
   */
  constructor( enumeration: IEnumeration<T>, factory: ( t: T ) => U ) {

    // @private {Enumeration}
    this._enumeration = enumeration;

    enumeration.VALUES.forEach( entry => {
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
   * @param {Function} mapFunction - function( {*}, {Enumeration.*} ): {*}
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