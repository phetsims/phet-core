// Copyright 2014-2023, University of Colorado Boulder

/**
 * Scans through potential properties on an object to detect prefixed forms, and returns the first match.
 *
 * E.g. currently:
 * phet.phetCore.detectPrefix( document.createElement( 'div' ).style, 'transform' ) === 'webkitTransform'
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import phetCore from './phetCore.js';

// @returns the best String str where obj[str] !== undefined, or returns undefined if that is not available
function detectPrefix( obj: object, name: string ): string {

  // @ts-expect-error
  if ( obj[ name ] !== undefined ) { return name; }

  // prepare for camelCase
  name = name.charAt( 0 ).toUpperCase() + name.slice( 1 );

  // Chrome planning to not introduce prefixes in the future, hopefully we will be safe
  // @ts-expect-error
  if ( obj[ `moz${name}` ] !== undefined ) { return `moz${name}`; }
  // @ts-expect-error
  if ( obj[ `Moz${name}` ] !== undefined ) { return `Moz${name}`; } // some prefixes seem to have all-caps?
  // @ts-expect-error
  if ( obj[ `webkit${name}` ] !== undefined ) { return `webkit${name}`; }
  // @ts-expect-error
  if ( obj[ `ms${name}` ] !== undefined ) { return `ms${name}`; }
  // @ts-expect-error
  if ( obj[ `o${name}` ] !== undefined ) { return `o${name}`; }
  // @ts-expect-error
  return undefined;
}

phetCore.register( 'detectPrefix', detectPrefix );

export default detectPrefix;