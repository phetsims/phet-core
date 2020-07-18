// Copyright 2020, University of Colorado Boulder

/**
 * Hot module replacement (HMR) enables reloading and replacing a single module within a running, stateful application.
 * The general pattern is to listen for a module replacement and re-run downstream code that uses the module.
 * For example:
 *
 *  // In a constructor
 *  const initializeWavesNode = () => {
 *   this.wavesNode && this.removeChild( this.wavesNode );
 *   this.wavesNode = new WavesNode( model, this.layoutBounds );
 *   this.addChild( this.wavesNode );
 *  };
 *
 *  initializeWavesNode();
 *
 * // Enable hot module replacement for fast iteration
 * isHMR && module.hot.accept( './WavesNode.js', initializeWavesNode );
 *
 * This can be used in concert with `grunt webpack-dev-server` from a simulation directory to launch a server that
 * supports hot module replacement.
 *
 * Note that when using HMR with a model module, you must pass re-instantiated model elements to corresponding view
 * elements, which can be prohibitively difficult. On the other hand, using HMR on a view can be simpler because often a
 * view element only needs to be swapped out in one place (say, replacing a node). Likewise, using HMR for static or
 * utility functions/modules works very well, since no instances need to be swapped out.
 *
 * When running with webpack-dev-server, a global "module" exists, but window.module does not.  In unbuilt mode,
 * neither "module" nor window.module exist.  This code factors out the check for the global "module".
 *
 * Since this code relies on a try/catch block, you probably should blackbox it in chrome dev tools, see
 * https://developer.chrome.com/devtools/docs/blackboxing#how-to-blackbox
 *
 * TODO: Make sure this gets stripped out on builds, see https://github.com/phetsims/chipper/issues/953
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