// Copyright 2013-2024, University of Colorado Boulder

/**
 * Loads a script
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import phetCore from './phetCore.js';

type LoadScriptArgs = {
  src: string;
  callback?: VoidFunction;
  async?: boolean;
  cacheBust?: boolean;
};

/*
 * Load a script. The only required argument is src, and can be specified either as
 * loadScript( "<url>" ) or loadScript( { src: "<url>", ... other options ... } ).
 *
 * Arguments:
 *   src:         The source of the script to load
 *   callback:    A callback to call (with no arguments) once the script is loaded and has been executed
 *   async:       Whether the script should be loaded asynchronously. Defaults to true
 *   cacheBust: Whether the URL should have an appended query string to work around caches
 */
function loadScript( inputArgs: LoadScriptArgs | string ): void {

  // handle a string argument
  const args = typeof inputArgs === 'string' ? { src: inputArgs } : inputArgs;

  const src = args.src;
  const callback = args.callback;
  const async = args.async === undefined ? true : args.async;
  const cacheBust = args.cacheBust === undefined ? false : args.cacheBust;

  let called = false;

  const script = document.createElement( 'script' );
  script.type = 'text/javascript';
  script.async = async;

  // @ts-expect-error
  script.onload = script.onreadystatechange = function() {
    // @ts-expect-error
    const state = this.readyState;
    if ( state && state !== 'complete' && state !== 'loaded' ) {
      return;
    }

    if ( !called ) {
      called = true;

      if ( callback ) {
        callback();
      }
    }
  };

  // make sure things aren't cached, just in case
  script.src = src + ( cacheBust ? `?random=${Math.random().toFixed( 10 )}` : '' ); // eslint-disable-line phet/bad-sim-text

  const other = document.getElementsByTagName( 'script' )[ 0 ];
  other.parentNode!.insertBefore( script, other );
}

phetCore.register( 'loadScript', loadScript );

export default loadScript;