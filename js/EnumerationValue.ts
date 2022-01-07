// Copyright 2021-2022, University of Colorado Boulder

/**
 * Base type for enumeration value instances.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */
import phetCore from './phetCore.js';
import RichEnumeration from './RichEnumeration.js';

type Constructor = new ( ...args: any[] ) => EnumerationValue;

class EnumerationValue {

  // undefined until set by RichEnumeration
  name?: string;
  enumeration?: RichEnumeration<this>;

  // After a RichEnumeration is constructed, no new instances of that exact type can be made (though it is OK to
  // create subtypes)
  static sealedCache = new Set<Constructor>();

  toString() {
    return this.name;
  }

  // This method is unused, but needs to remain here so other types don't accidentally structurally match
  // enumeration values.  Without this, string satisfies the EnumerationValue interface, but we don't want it to.
  private isEnumerationValue() {return true;}

  constructor() {
    const c = this.constructor as Constructor;
    assert && assert( !EnumerationValue.sealedCache.has( c ), 'cannot create instanceof of a sealed constructor' );
  }
}

phetCore.register( 'EnumerationValue', EnumerationValue );

export default EnumerationValue;