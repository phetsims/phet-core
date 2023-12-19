// Copyright 2019-2023, University of Colorado Boulder

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

import phetCore from './phetCore.js';

/**
 * @param options - an options object.  Could be before or after merge, and may therefore
 *                                        - be null or undefined
 * @param sets - families of mutually exclusive option keys, see examples above.
 */
const assertMutuallyExclusiveOptions = function( options: object | null | undefined, ...sets: string[][] ): void {
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

phetCore.register( 'assertMutuallyExclusiveOptions', assertMutuallyExclusiveOptions );
export default assertMutuallyExclusiveOptions;