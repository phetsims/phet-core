// Copyright 2017, University of Colorado Boulder

/**
 * Unit tests for phet-core. Please run once in phet brand and once in brand=phet-io to cover all functionality.
 *
 * @author Jonathan Olson (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  require( 'PHET_CORE/isArrayTests' );
  require( 'PHET_CORE/escapeHTMLTests' );
  require( 'PHET_CORE/inheritTests' );
  require( 'PHET_CORE/cleanArrayTests' );
  require( 'PHET_CORE/detectPrefixTests' );
  require( 'PHET_CORE/detectPrefixEventTests' );
  require( 'PHET_CORE/pairsTests' );
  require( 'PHET_CORE/partitionTests' );
  require( 'PHET_CORE/arrayRemoveTests' );
  require( 'PHET_CORE/mixedWithTests' );
  require( 'PHET_CORE/dimensionForEachTests' );
  require( 'PHET_CORE/dimensionMapTests' );
  require( 'PHET_CORE/arrayDifferenceTests' );
  require( 'PHET_CORE/interleaveTests' );
  require( 'PHET_CORE/EnumerationTests' );
  require( 'PHET_CORE/mergeTests' );

  // Since our tests are loaded asynchronously, we must direct QUnit to begin the tests
  QUnit.start();
} );