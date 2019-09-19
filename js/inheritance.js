// Copyright 2017-2019, University of Colorado Boulder

/**
 * Given inheritance using inherit, this will give the full prototype chain.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

define( require => {
  'use strict';

  const phetCore = require( 'PHET_CORE/phetCore' );

  /*
   * @param {*} type - Constructor for the type in question.
   * @returns {Array.<*>}
   */
  function inheritance( type ) {
    var types = [ type ];

    var proto = type.prototype;
    while ( proto && ( proto = Object.getPrototypeOf( proto ) ) ) {
      if ( proto.constructor ) {
        types.push( proto.constructor );
      }
    }
    return types;
  }

  phetCore.register( 'inheritance', inheritance );

  return inheritance;
} );