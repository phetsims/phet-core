// Copyright 2021-2022, University of Colorado Boulder

/**
 * Base type for enumeration value instances.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */
import phetCore from './phetCore.js';
import Enumeration from './Enumeration.js';

type Constructor = new ( ...args: any[] ) => EnumerationValue;

class EnumerationValue {

  // undefined until set by Enumeration
  name?: string;
  enumeration?: Enumeration<this>;

  // After a Enumeration is constructed, no new instances of that exact type can be made (though it is OK to
  // create subtypes)
  static sealedCache = new Set<Constructor>();

  toString() {
    return this.name;
  }

  constructor() {
    const c = this.constructor as Constructor;
    assert && assert( !EnumerationValue.sealedCache.has( c ), 'cannot create instanceof of a sealed constructor' );
  }
}

phetCore.register( 'EnumerationValue', EnumerationValue );

export default EnumerationValue;