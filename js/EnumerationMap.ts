// Copyright 2019-2022, University of Colorado Boulder

/**
 * An object that contains a value for each item in an enumeration.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import phetCore from './phetCore.js';

type TEnumeration<T> = {
  enumeration: {
    values: T[];
  };
};

// T = enumeration value type
// U = mapped value type
class EnumerationMap<T, U> {
  private readonly _enumeration: TEnumeration<T>;
  private _map = new Map<T, U>();
  private _values: T[];

  /**
   * @param enumeration
   * @param factory - function( {TEnumeration.*} ) => {*}, maps an enumeration value to any value.
   */
  public constructor( enumeration: TEnumeration<T>, factory: ( t: T ) => U ) {

    this._enumeration = enumeration;

    this._values = enumeration.enumeration.values;
    this._values.forEach( entry => {
      assert && assert( !this._map.has( entry ), 'Enumeration key override problem' );
      this._map.set( entry, factory( entry ) );
    } );
  }

  /**
   * Returns the value associated with the given enumeration entry.
   */
  public get( entry: T ): U {
    assert && assert( this._values.includes( entry ) );
    assert && assert( this._map.has( entry ) );
    return this._map.get( entry )!;
  }

  /**
   * Sets the value associated with the given enumeration entry.
   */
  public set( entry: T, value: U ): void {
    assert && assert( this._values.includes( entry ) );
    this._map.set( entry, value );
  }

  /**
   * Returns a new EnumerationMap with mapped values.
   *
   * @param mapFunction - function( {*}, {TEnumeration.*} ): {*}
   * @returns With the mapped values
   */
  public map( mapFunction: ( u: U, t: T ) => U ): EnumerationMap<T, U> {
    return new EnumerationMap( this._enumeration, entry => mapFunction( this.get( entry ), entry ) );
  }

  /**
   * Calls the callback on each item of the enumeration map.
   *
   * @param callback - function(value:*, enumerationValue:*)
   */
  public forEach( callback: ( u: U, t: T ) => void ): void {
    this._values.forEach( entry => callback( this.get( entry ), entry ) );
  }

  /**
   * Returns the values stored in the map, as an array
   *
   */
  public values(): U[] {
    return this._values.map( entry => this.get( entry ) );
  }
}

phetCore.register( 'EnumerationMap', EnumerationMap );
export default EnumerationMap;