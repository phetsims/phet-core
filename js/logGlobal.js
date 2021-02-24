// Copyright 2021, University of Colorado Boulder

/**
 * Logs a global variable by converting it to JSON, then writing to phet.log. If the global is undefined,
 * the log will show 'undefined'.  This is currently used to log a collection of query parameters (which exist
 * as globals), but could be applied to other globals.  If phet.log is undefined, this is a no-op.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import phetCore from './phetCore.js';


/**
 * @param {string} globalString - the name of the global
 */
function logGlobal( globalString ) {
  assert && assert( typeof globalString === 'string', `invalid globalString: ${globalString}` );

  if ( phet.log ) {

    // Split the global string into tokens, separated by dot.
    const tokens = globalString.split( '.' );

    // Start at window, the root for all globals in the browser.
    const startIndex = ( tokens[ 0 ] === 'window' ) ? 1 : 0;
    let result = window;

    // Walk the global hierarchy until the desired global is found, or some node does not exist.
    for ( let i = startIndex; i < tokens.length && result; i++ ) {
      result = result[ tokens[ i ] ];
    }

    // Log the results
    phet.log && phet.log( `${globalString}: ${JSON.stringify( result, null, 2 )}` );
  }
}

phetCore.register( 'logGlobal', logGlobal );

export default logGlobal;