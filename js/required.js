// Copyright 2019-2020, University of Colorado Boulder

/**
 * Validates that the passed in entry exists and returns that value if validation is successful.
 *
 * @author Denzell Barnett (PhET Interactive Simulations)
 */

import phetCore from './phetCore.js';

/**
 * Checks if the value passed is defined
 *
 * @param {*} entry - value to be checked
 * @returns {*} Returns the passed in value
 */
function required( entry ) {
  assert && assert( entry !== undefined, 'Required field is undefined.' );
  return entry;
}

phetCore.register( 'required', required );

export default required;