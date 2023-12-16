// Copyright 2014-2023, University of Colorado Boulder
/* eslint-disable no-useless-concat */

/**
 * Scans through potential event properties on an object to detect prefixed forms, and returns the first match.
 *
 * E.g. currently:
 * phet.phetCore.detectPrefixEvent( document, 'fullscreenchange' ) === 'webkitfullscreenchange'
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import phetCore from './phetCore.js';

// @returns the best String str where obj['on'+str] !== undefined, or returns undefined if that is not available
function detectPrefixEvent( obj: object, name: string ): string {
  // @ts-expect-error
  if ( obj[ `on${name}` ] !== undefined ) { return name; }

  // Chrome planning to not introduce prefixes in the future, hopefully we will be safe
  // @ts-expect-error
  if ( obj[ `${'on' + 'moz'}${name}` ] !== undefined ) { return `moz${name}`; }
  // @ts-expect-error
  if ( obj[ `${'on' + 'Moz'}${name}` ] !== undefined ) { return `Moz${name}`; } // some prefixes seem to have all-caps?
  // @ts-expect-error
  if ( obj[ `${'on' + 'webkit'}${name}` ] !== undefined ) { return `webkit${name}`; }
  // @ts-expect-error
  if ( obj[ `${'on' + 'ms'}${name}` ] !== undefined ) { return `ms${name}`; }
  // @ts-expect-error
  if ( obj[ `${'on' + 'o'}${name}` ] !== undefined ) { return `o${name}`; }
  // @ts-expect-error
  return undefined;
}

phetCore.register( 'detectPrefixEvent', detectPrefixEvent );

export default detectPrefixEvent;