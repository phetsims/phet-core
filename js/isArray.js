// Copyright 2013-2015, University of Colorado Boulder

/**
 * Tests whether a reference is to an array.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

define( function( require ) {
  'use strict';

  var phetCore = require( 'PHET_CORE/phetCore' );

  function isArray( array ) {
    // yes, this is actually how to do this. see http://stackoverflow.com/questions/4775722/javascript-check-if-object-is-array
    return Object.prototype.toString.call( array ) === '[object Array]';
  }

  phetCore.register( 'isArray', isArray );

  return isArray;
} );