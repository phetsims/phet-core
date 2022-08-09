// Copyright 2021-2022, University of Colorado Boulder

/**
 * This implementation auto-detects the enumeration values by Object.keys and instanceof. Every property that has a
 * type matching the enumeration type is marked as a value.  See sample usage in Orientation.ts.
 *
 * For general pattern see https://github.com/phetsims/phet-info/blob/master/doc/phet-software-design-patterns.md#enumeration
 *
 * This creates 2-way maps (key-to-value and value-to-key) for ease of use and to enable phet-io serialization.
 *
 * class T extends EnumerationValue {
 *     static a=new T();
 *     static b =new T();
 *     getName(){return 'he';}
 *     get thing(){return 'text';}
 *     static get age(){return 77;}
 *     static enumeration = new Enumeration( T );
 * }
 * T.enumeration.keys => ['a', 'b']
 * T.enumeration.values => [T, T]
 *
 * Note how `keys` only picks up 'a' and 'b'.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import phetCore from './phetCore.js';
import TEnumeration from './TEnumeration.js';
import EnumerationValue from './EnumerationValue.js';
import inheritance from './inheritance.js';
import Constructor from './types/Constructor.js';
import optionize from './optionize.js';

export type EnumerationOptions<T extends EnumerationValue> = {
  phetioDocumentation?: string;
  instanceType?: Constructor<T>;
};

class Enumeration<T extends EnumerationValue> implements TEnumeration<T> {
  public readonly values: T[]; // in the order that static instances are defined
  public readonly keys: string[];
  public readonly Enumeration: Constructor<T> & Record<string, T>;
  public readonly phetioDocumentation?: string;

  public constructor( Enumeration: Constructor<T>, providedOptions?: EnumerationOptions<T> ) {

    const options = optionize<EnumerationOptions<T>>()( {
      phetioDocumentation: '',

      // Values are plucked from the supplied Enumeration, but in order to support subtyping (augmenting) Enumerations,
      // you can specify the rule for what counts as a member of the enumeration. This should only be used in the
      // special case of augmenting existing enumerations.
      instanceType: Enumeration
    }, providedOptions );
    this.phetioDocumentation = options.phetioDocumentation;

    const instanceType = options.instanceType;

    // Iterate over the type hierarchy to support augmenting enumerations, but reverse so that newly added enumeration
    // values appear after previously existing enumeration values
    const types = _.reverse( inheritance( Enumeration ) );

    assert && assert( types.includes( instanceType ), 'the specified type should be in its own hierarchy' );

    this.keys = [];
    this.values = [];
    types.forEach( type => {
      Object.keys( type ).forEach( key => {
        const value = type[ key ];
        if ( value instanceof instanceType ) {
          assert && assert( key === key.toUpperCase(), 'keys should be upper case by convention' );
          this.keys.push( key );
          this.values.push( value );

          // Only assign this to the lowest Enumeration in the hierarchy. Otherwise this would overwrite the
          // supertype-assigned Enumeration. See https://github.com/phetsims/phet-core/issues/102
          if ( value instanceof Enumeration ) {
            value.name = key;
            value.enumeration = this;
          }
        }
      } );
    } );

    assert && assert( this.keys.length > 0, 'no keys found' );
    assert && assert( this.values.length > 0, 'no values found' );

    this.Enumeration = Enumeration as Constructor<T> & Record<string, T>;
    EnumerationValue.sealedCache.add( Enumeration );
  }

  public getKey( value: T ): string {
    return value.name;
  }

  public getValue( key: string ): T {
    return this.Enumeration[ key ];
  }

  public includes( value: T ): boolean {
    return this.values.includes( value );
  }
}

phetCore.register( 'Enumeration', Enumeration );

export default Enumeration;