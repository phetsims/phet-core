// Copyright 2014-2015, University of Colorado Boulder

/**
 * Given inheritance using inherit, this will give the full prototype chain.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

define( function( require ) {
  'use strict';

  var phetCore = require( 'PHET_CORE/phetCore' );

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