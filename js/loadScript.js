// Copyright 2013-2019, University of Colorado Boulder
/* eslint-disable bad-sim-text */

/**
 * Loads a script
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

define( require => {
  'use strict';

  const phetCore = require( 'PHET_CORE/phetCore' );

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
  function loadScript( args ) {
    // handle a string argument
    if ( typeof args === 'string' ) {
      args = { src: args };
    }

    var src = args.src;
    var callback = args.callback;
    var async = args.async === undefined ? true : args.async;
    var cacheBust = args.cacheBust === undefined ? false : args.cacheBust;

    var called = false;

    var script = document.createElement( 'script' );
    script.type = 'text/javascript';
    script.async = async;
    script.onload = script.onreadystatechange = function() {
      var state = this.readyState;
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
    script.src = src + ( cacheBust ? '?random=' + Math.random().toFixed( 10 ) : '' );

    var other = document.getElementsByTagName( 'script' )[ 0 ];
    other.parentNode.insertBefore( script, other );
  }

  phetCore.register( 'loadScript', loadScript );

  return loadScript;
} );