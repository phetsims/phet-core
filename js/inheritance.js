// Copyright 2017-2020, University of Colorado Boulder

/**
 * Given inheritance using inherit, this will give the full prototype chain.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import phetCore from './phetCore.js';

/*
 * @param {*} type - Constructor for the type in question.
 * @returns {Array.<*>}
 */
function inheritance( type ) {
  const types = [ type ];

  let proto = type.prototype;
  while ( proto && ( proto = Object.getPrototypeOf( proto ) ) ) {
    if ( proto.constructor ) {
      types.push( proto.constructor );
    }
  }
  return types;
}

phetCore.register( 'inheritance', inheritance );

export default inheritance;