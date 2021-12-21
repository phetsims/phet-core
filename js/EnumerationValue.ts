// Copyright 2021, University of Colorado Boulder

/**
 * @author Sam Reid (PhET Interactive Simulations)
 */

import phetCore from './phetCore.js';

class EnumerationValue {
  name?: string; // undefined until set by RichEnumeration

  toString() {
    return this.name;
  }
}

phetCore.register( 'EnumerationValue', EnumerationValue );

export default EnumerationValue;