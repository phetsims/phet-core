// Copyright 2020, University of Colorado Boulder

/**
 * Output deprecation warnings to console.warn when ?deprecationWarnings is specified
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import phetCore from './phetCore.js';

const deprecationWarning = message => {
  if ( phet.chipper.queryParameters.deprecationWarnings ) {
    console.warn( `Deprecation warning: ${message}` );
  }
};

phetCore.register( 'deprecationWarning', deprecationWarning );

export default deprecationWarning;