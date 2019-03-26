// Copyright 2019, University of Colorado Boulder

/**
 * Preload file that sorts the keys in an object intended for JSON, using the strategy defined in
 * https://stackoverflow.com/questions/5467129/sort-javascript-object-by-key
 *
 * This is used in the simulation side to make sure the elements-baseline file is sorted, and used in the phet-io
 * wrapper side to make sure the elements-overrides file is sorted.
 *
 * Namespacing and naming are discussed in https://github.com/phetsims/phet-io/issues/1446#issuecomment-476842068 and below
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Chris Klusendorf (PhET Interactive Simulations)
 */
( () => {
  'use strict';

  // Support usage in the wrappers, where 'phet' hasn't been defined yet.
  window.phet = window.phet || {};
  window.phet.preloads = window.phet.preloads || {};
  window.phet.preloads.phetCore = window.phet.preloads.phetCore || {};

  /**
   * Creates a new object, recursively, by sorting the keys at each level.
   * @param {Object} unordered - jsonifiable object to be sorted by key name.  Sorting is recursive and hence.
   */
  window.phet.preloads.phetCore.copyWithSortedKeys = unordered => {
    const ordered = {};
    Object.keys( unordered ).sort().forEach( function( key ) {
      const value = unordered[ key ];
      ordered[ key ] = typeof value === 'object' ? window.phet.preloads.phetCore.copyWithSortedKeys( value ) : value;
    } );
    return ordered;
  };
} )();