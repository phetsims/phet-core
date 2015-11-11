// Copyright 2014-2015, University of Colorado Boulder

/**
 * Scans through potential event properties on an object to detect prefixed forms, and returns the first match.
 *
 * E.g. currently:
 * phetCore.detectPrefixEvent( document, 'fullscreenchange' ) === 'webkitfullscreenchange'
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

define( function( require ) {
  'use strict';

  var phetCore = require( 'PHET_CORE/phetCore' );

  // @returns the best String str where obj['on'+str] !== undefined, or returns undefined if that is not available
  function detectPrefixEvent( obj, name, isEvent ) {
    if ( obj[ 'on' + name ] !== undefined ) { return name; }

    // Chrome planning to not introduce prefixes in the future, hopefully we will be safe
    if ( obj[ 'on' + 'moz' + name ] !== undefined ) { return 'moz' + name; }
    if ( obj[ 'on' + 'Moz' + name ] !== undefined ) { return 'Moz' + name; } // some prefixes seem to have all-caps?
    if ( obj[ 'on' + 'webkit' + name ] !== undefined ) { return 'webkit' + name; }
    if ( obj[ 'on' + 'ms' + name ] !== undefined ) { return 'ms' + name; }
    if ( obj[ 'on' + 'o' + name ] !== undefined ) { return 'o' + name; }
    return undefined;
  }

  phetCore.register( 'detectPrefixEvent', detectPrefixEvent );

  return detectPrefixEvent;
} );