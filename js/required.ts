// Copyright 2019-2025, University of Colorado Boulder

/**
 * Validates that the passed in entry exists and returns that value if validation is successful.
 *
 * @author Denzell Barnett (PhET Interactive Simulations)
 */

import affirm from '../../perennial-alias/js/browser-and-node/affirm.js';
import phetCore from './phetCore.js';

/**
 * Checks if the value passed is defined
 */
function required<T>( entry: T ): T {
  affirm( entry !== undefined, 'Required field is undefined.' );
  return entry;
}

phetCore.register( 'required', required );

export default required;