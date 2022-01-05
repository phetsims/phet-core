// Copyright 2021, University of Colorado Boulder

/**
 * Base type for enumeration value instances.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */
import phetCore from './phetCore.js';
import RichEnumeration from './RichEnumeration.js';

class EnumerationValue {

  // undefined until set by RichEnumeration
  name?: string;
  enumeration?: RichEnumeration<this>;

  toString() {
    return this.name;
  }

  // This method is unused, but needs to remain here so other types don't accidentally structurally match
  // enumeration values.  Without this, string satisfies the EnumerationValue interface, but we don't want it to.
  private isEnumerationValue() {return true;}
}

phetCore.register( 'EnumerationValue', EnumerationValue );

export default EnumerationValue;