// Copyright 2013-2020, University of Colorado Boulder

/**
 * Tests whether a reference is to an array.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import phetCore from './phetCore.js';

function isArray( array ) {
  // yes, this is actually how to do this. see http://stackoverflow.com/questions/4775722/javascript-check-if-object-is-array
  return Object.prototype.toString.call( array ) === '[object Array]';
}

phetCore.register( 'isArray', isArray );

export default isArray;