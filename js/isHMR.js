// Copyright 2020, University of Colorado Boulder

/**
 * Hot module replacement (HMR) enabled reloading and replacing a single module within a running, stateful application.
 * When running with webpack-dev-server, a global "module" exists, but window.module does not.  In unbuilt mode,
 * neither "module" nor window.module exist.  This code factors out the check for the global "module".
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

let isHMR;

try {
  isHMR = module && module.hot;
}
catch( e ) {
  isHMR = false;
}

// Not namespaced because Namespace relies on this file

export default isHMR;