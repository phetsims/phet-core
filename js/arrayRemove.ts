// Copyright 2014-2020, University of Colorado Boulder

/**
 * Removes a single (the first) matching object from an Array.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import phetCore from './phetCore.js';

function arrayRemove<T>( array: T[], toRemove: T ): void {
  assert && assert( Array.isArray( array ), 'arrayRemove takes an Array' );

  const index = _.indexOf( array, toRemove );
  assert && assert( index >= 0, 'item not found in Array' );

  array.splice( index, 1 );
}

phetCore.register( 'arrayRemove', arrayRemove );

export default arrayRemove;