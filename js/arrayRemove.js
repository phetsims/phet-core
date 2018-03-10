// Copyright 2014-2015, University of Colorado Boulder

/**
 * Removes a single (the first) matching object from an Array.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

define( function( require ) {
  'use strict';

  var phetCore = require( 'PHET_CORE/phetCore' );

  /*
   * @param {Array} arr
   * @param {*} item - The item to remove from the array
   */
  function arrayRemove( arr, item ) {
    assert && assert( Array.isArray( arr ), 'arrayRemove either takes an Array' );

    var index = _.indexOf( arr, item );
    assert && assert( index >= 0, 'item not found in Array' );

    arr.splice( index, 1 );
  }

  phetCore.register( 'arrayRemove', arrayRemove );

  return arrayRemove;
} );