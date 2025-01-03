// Copyright 2014-2025, University of Colorado Boulder

/**
 * Removes a single (the first) matching object from an Array.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import affirm from '../../perennial-alias/js/browser-and-node/affirm.js';
import phetCore from './phetCore.js';
import _ from '../../sherpa/js/lodash.js';

function arrayRemove<T>( array: T[], toRemove: T ): void {
  affirm( Array.isArray( array ), 'arrayRemove takes an Array' );

  const index = _.indexOf( array, toRemove );
  affirm( index >= 0, 'item not found in Array' );

  array.splice( index, 1 );
}

phetCore.register( 'arrayRemove', arrayRemove );

export default arrayRemove;