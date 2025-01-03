// Copyright 2021-2025, University of Colorado Boulder

/**
 * Support gracefully getting a global object to itself. Returns null if the global doesn't exist.
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import affirm from '../../perennial-alias/js/browser-and-node/affirm.js';
import phetCore from './phetCore.js';
import IntentionalAny from './types/IntentionalAny.js';
import _ from '../../sherpa/js/lodash.js';

/**
 * If the path exists on the window global, return it, otherwise returns null
 * @param path a path to global, such as 'phet.joist.sim'
 */
const getGlobal = ( path: string ): IntentionalAny | null => {
  affirm( path.trim() === path, 'path must be trimmed' );
  const global = _.get( window, path );
  return global !== undefined ? global : null;
};

phetCore.register( 'getGlobal', getGlobal );

export default getGlobal;