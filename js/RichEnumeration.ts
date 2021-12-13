// Copyright 2021, University of Colorado Boulder

/**
 * This implementation auto-detects the enumeration values by Object.keys and instanceof.  Every property that has a
 * type matching the enumeration type is marked as a value.  See sample usage in Orientation.ts
 *
 * This creates 2-way maps (key-to-value and value-to-key) that enable phet-io serialization.
 *
 * class T{
 *     static a=new T();
 *     static b =new T();
 *     constructor(){}
 *     getName(){return 'he';}
 *     get thing(){return 'text';}
 *     static get age(){return 77;}
 * }
 * Object.keys(T) => ['a', 'b']
 * Object.values(T) => [T, T]
 *
 * Note how keys only picks up 'a' and 'b'.  Therefore, we can use Object.keys to infer the RichEnumeration values
 * rather than having to re-list them in values or equivalent.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import phetCore from './phetCore.js';
import IRichEnumeration from './IRichEnumeration.js';

type RichEnumerationOptions = {
  phetioDocumentation?: string
}

class RichEnumeration<T> implements IRichEnumeration<T> {
  readonly values: T[];
  readonly keys: string[];
  private readonly valueToKeyMap = new Map<T, string>();
  readonly Enumeration: any;
  readonly phetioDocumentation?: string;

  constructor( Enumeration: any, providedOptions?: RichEnumerationOptions ) {

    this.phetioDocumentation = providedOptions ? providedOptions.phetioDocumentation : undefined;
    Object.keys( Enumeration ).forEach( key => {
      const value = Enumeration[ key ];
      if ( value instanceof Enumeration ) {
        this.valueToKeyMap.set( value, key );
      }
    } );

    this.keys = Array.from( this.valueToKeyMap.values() );
    this.values = Array.from( this.valueToKeyMap.keys() );

    assert && assert( this.keys.length > 0, 'no keys found' );
    assert && assert( this.values.length > 0, 'no values found' );

    this.Enumeration = Enumeration;
  }

  getKey( value: T ): string {
    assert && assert( this.valueToKeyMap.has( value ) );
    return this.valueToKeyMap.get( value )!;
  }

  getValue( key: string ): T {
    return this.Enumeration[ key ];
  }

  includes( value: T ): boolean {
    return this.values.includes( value );
  }
}

phetCore.register( 'RichEnumeration', RichEnumeration );

export default RichEnumeration;