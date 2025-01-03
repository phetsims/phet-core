// Copyright 2021-2025, University of Colorado Boulder

/**
 * EnumerationValue is the base class for enumeration value instances.
 * See https://github.com/phetsims/phet-info/blob/main/doc/phet-software-design-patterns.md#enumeration
 *
 * PhET's Enumeration pattern is:
 *
 * class MyEnumeration extends EnumerationValue {
 *   public static readonly VALUE_1 = new MyEnumeration();
 *   public static readonly VALUE_2 = new MyEnumeration();
 *
 *   // Make sure this is last, once all EnumerationValues have been declared statically.
 *   public static readonly enumeration = new Enumeration( MyEnumeration );
 * }
 *
 * // Usage
 * console.log( MyEnumeration.VALUE_1 );
 * const printValue = enumValue => {
 *   affirm( enumValue.enumeration.values.includes(enumValue));
 *   console.log( enumValue );
 * };
 * printValue( MyEnumeration.VALUE_2 );
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import affirm from '../../perennial-alias/js/browser-and-node/affirm.js';
import type Enumeration from './Enumeration.js';
import phetCore from './phetCore.js';
import Constructor from './types/Constructor.js';

class EnumerationValue {

  // null until set by Enumeration. Once set, cannot be changed.
  private _name: string | null;
  private _enumeration: Enumeration<this> | null;

  // After an Enumeration is constructed, no new instances of that exact type can be made (though it is OK to
  // create subtypes)
  public static sealedCache = new Set<Constructor<EnumerationValue>>();

  public toString(): string {
    return this.name;
  }

  // This method is unused, but needs to remain here so other types don't accidentally structurally match
  // enumeration values.  Without this, string satisfies the EnumerationValue interface, but we don't want it to.
  private isEnumerationValue(): boolean {return true;}

  public constructor() {
    const c = this.constructor as Constructor<EnumerationValue>;
    affirm( !EnumerationValue.sealedCache.has( c ), 'cannot create instanceof of a sealed constructor' );

    this._name = null;
    this._enumeration = null;
  }

  public set name( name: string ) {
    affirm( !this._name, 'name cannot be changed once defined.' );
    this._name = name;
  }

  public get name(): string {
    affirm( this._name, 'name cannot be retrieved until it has been filled in by Enumeration.' );
    return this._name;
  }

  public set enumeration( enumeration: Enumeration<this> ) {
    affirm( !this._enumeration, 'enumeration cannot be changed once defined.' );
    this._enumeration = enumeration;
  }

  public get enumeration(): Enumeration<this> {
    affirm( this._enumeration, 'enumeration cannot be retrieved until it has been filled in by Enumeration.' );
    return this._enumeration;
  }
}

phetCore.register( 'EnumerationValue', EnumerationValue );

export default EnumerationValue;