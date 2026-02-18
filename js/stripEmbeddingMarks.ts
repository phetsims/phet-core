// Copyright 2020-2026, University of Colorado Boulder

/**
 * Strips embedding marks out of a string. Embedding marks are added to support directional languages and PhET i18n in
 * general.
 *
 * @author Jonathan Olson (PhET Interactive Simulations)
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import phetCore from './phetCore.js';

function stripEmbeddingMarks( string: string ): string {
  return string.replace( /\u202a|\u202b|\u202c/g, '' );
}

phetCore.register( 'stripEmbeddingMarks', stripEmbeddingMarks );

export default stripEmbeddingMarks;