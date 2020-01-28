// Copyright 2016-2019, University of Colorado Boulder

/**
 * Strips embedding marks out of a string. Embedding marks are added to support directional languages and PhET i18n in
 * general.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

define( require => {
  'use strict';

  const phetCore = require( 'PHET_CORE/phetCore' );

  /**
   * @param {string} string
   * @returns {string}
   */
  function stripEmbeddingMarks( string ) {
    return string.replace( /\u202a|\u202b|\u202c/g, '' );
  }

  phetCore.register( 'stripEmbeddingMarks', stripEmbeddingMarks );

  return stripEmbeddingMarks;
} );
