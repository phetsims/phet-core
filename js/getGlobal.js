// Copyright 2021, University of Colorado Boulder

/**
 * Support gracefully getting a global object to itself. Returns null if the global doesn't exist.
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import phetCore from './phetCore.js';

/**
 * If the path exists on the window global, return it, otherwise returns null
 * @param {string} path a path to global, such as 'phet.joist.sim'
 * @returns {*|null}
 */
const getGlobal = path => {
  assert && assert( typeof path === 'string', 'path must be a string' );
  assert && assert( path.trim() === path, 'path must be trimmed' );
  const global = _.get( window, path );
  return global !== undefined ? global : null;
};

phetCore.register( 'getGlobal', getGlobal );

export default getGlobal;