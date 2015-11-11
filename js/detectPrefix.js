// Copyright 2014-2015, University of Colorado Boulder

/**
 * Scans through potential properties on an object to detect prefixed forms, and returns the first match.
 *
 * E.g. currently:
 * phetCore.detectPrefix( document.createElement( 'div' ).style, 'transform' ) === 'webkitTransform'
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

define( function( require ) {
  'use strict';

  var phetCore = require( 'PHET_CORE/phetCore' );

  // @returns the best String str where obj[str] !== undefined, or returns undefined if that is not available
  function detectPrefix( obj, name ) {
    if ( obj[ name ] !== undefined ) { return name; }

    // prepare for camelCase
    name = name.charAt( 0 ).toUpperCase() + name.slice( 1 );

    // Chrome planning to not introduce prefixes in the future, hopefully we will be safe
    if ( obj[ 'moz' + name ] !== undefined ) { return 'moz' + name; }
    if ( obj[ 'Moz' + name ] !== undefined ) { return 'Moz' + name; } // some prefixes seem to have all-caps?
    if ( obj[ 'webkit' + name ] !== undefined ) { return 'webkit' + name; }
    if ( obj[ 'ms' + name ] !== undefined ) { return 'ms' + name; }
    if ( obj[ 'o' + name ] !== undefined ) { return 'o' + name; }
    return undefined;
  }

  phetCore.register( 'detectPrefix', detectPrefix );

  return detectPrefix;
} );