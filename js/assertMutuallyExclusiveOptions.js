// Copyright 2019, University of Colorado Boulder

/**
 * Throws an assertion error if mutually exclusive options are specified.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const phetCore = require( 'PHET_CORE/phetCore' );

  const assertMutuallyExclusiveOptions = function( options, ...sets ) {
    if ( assert ) {

      // Determine which options are used from each set
      const usedElementsFromEachSet = sets.map( set => Object.keys( _.pick( options, ...set ) ) );

      // If any element is used from more than one set...
      if ( usedElementsFromEachSet.filter( usedElements => usedElements.length > 0 ).length > 1 ) {

        // Output the errant options.
        assert && assert( false, `Cannot simultaneously specify ${usedElementsFromEachSet.join( ' and ' )}` );
      }
    }
  };

  return phetCore.register( 'assertMutuallyExclusiveOptions', assertMutuallyExclusiveOptions );
} );