// Copyright 2020, University of Colorado Boulder

/**
 * Output deprecation warnings to console.warn when ?deprecationWarnings is specified
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import phetCore from './phetCore.js';

// contains all messages printed for deprecation warnings so that we do not print the same message multiple times
const deprecatedMessages = {};

const deprecationWarning = message => {
  if ( window.phet && window.phet.chipper && window.phet.chipper.queryParameters && phet.chipper.queryParameters.deprecationWarnings ) {
    if ( !deprecatedMessages.hasOwnProperty( message ) ) {
      deprecatedMessages[ message ] = true;
      console.warn( `Deprecation warning: ${message}` );
    }
  }
};

phetCore.register( 'deprecationWarning', deprecationWarning );

export default deprecationWarning;