// Copyright 2019, University of Colorado Boulder

/**
 * Throws an assertion error if mutually exclusive options are specified.
 *
 * @example
 * assertMutuallyExclusiveOptions( { tree:1, flower:2 }, [ 'tree' ], [ 'flower' ] ) => error
 * assertMutuallyExclusiveOptions( { flower:2 }, [ 'tree' ], [ 'flower' ] ) => no error
 * assertMutuallyExclusiveOptions( { tree:1 }, [ 'tree' ], [ 'flower' ] ) => no error
 * assertMutuallyExclusiveOptions( { tree:1, mountain:2 }, [ 'tree', 'mountain' ], [ 'flower' ] ) => no error
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const phetCore = require( 'PHET_CORE/phetCore' );

  /**
   * @param {Object|null|undefined} options - an options object.  Could be before or after _.extend, and may therefore
   *                                        - be null or undefined
   * @param {string[][]} sets - families of mutually exclusive option keys, see examples above.
   */
  const assertMutuallyExclusiveOptions = function( options, ...sets ) {
    if ( assert && options ) {

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