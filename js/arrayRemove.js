// Copyright 2014-2020, University of Colorado Boulder

/**
 * Removes a single (the first) matching object from an Array.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import phetCore from './phetCore.js';

/*
 * @param {Array} array
 * @param {*} item - the item to remove from the array
 */
function arrayRemove( array, item ) {
  assert && assert( Array.isArray( array ), 'arrayRemove takes an Array' );

  const index = _.indexOf( array, item );
  assert && assert( index >= 0, 'item not found in Array' );

  array.splice( index, 1 );
}

phetCore.register( 'arrayRemove', arrayRemove );

export default arrayRemove;