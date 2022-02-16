// Copyright 2021-2022, University of Colorado Boulder

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
 * Note how keys only picks up 'a' and 'b'.  Therefore, we can use Object.keys to infer the Enumeration values
 * rather than having to re-list them in values or equivalent.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import phetCore from './phetCore.js';
import IEnumeration from './IEnumeration.js';
import EnumerationValue from './EnumerationValue.js';
import inheritance from './inheritance.js';
import merge from './merge.js';
import Constructor from './Constructor.js';

type EnumerationOptions = {
  phetioDocumentation?: string,
  instanceType?: any
}

class Enumeration<T extends EnumerationValue> implements IEnumeration<T> {
  readonly values: T[]; // in the order that static instances are defined
  readonly keys: string[];
  readonly Enumeration: any;
  readonly phetioDocumentation?: string;

  constructor( Enumeration: Constructor<T>, providedOptions?: EnumerationOptions ) {

    const options = merge( {
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

    this.Enumeration = Enumeration;
    EnumerationValue.sealedCache.add( Enumeration );
  }

  getKey( value: T ): string {
    return value.name!;
  }

  getValue( key: string ): T {
    return this.Enumeration[ key ];
  }

  includes( value: T ): boolean {
    return this.values.includes( value );
  }
}

phetCore.register( 'Enumeration', Enumeration );

export default Enumeration;