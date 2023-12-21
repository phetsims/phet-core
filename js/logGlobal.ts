// Copyright 2021, University of Colorado Boulder

/**
 * Logs a global variable by converting it to JSON, then writing to phet.log. If the global is undefined,
 * the log will show 'undefined'.  This is currently used to log a collection of query parameters (which exist
 * as globals), but could be applied to other globals.  If phet.log is undefined, this is a no-op.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import getGlobal from './getGlobal.js';
import phetCore from './phetCore.js';

/**
 * @param {string} globalString - the name of the global
 */
function logGlobal( globalString ) {
  assert && assert( typeof globalString === 'string', `invalid globalString: ${globalString}` );
  phet.log && phet.log( `${globalString}: ${JSON.stringify( getGlobal( globalString ), null, 2 )}` );
}

phetCore.register( 'logGlobal', logGlobal );

export default logGlobal;