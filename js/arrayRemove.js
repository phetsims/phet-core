// Copyright 2002-2014, University of Colorado Boulder

/**
 * Removes a single (the first) matching object from an Array.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

define( function( require ) {
  'use strict';

  var core = require( 'PHET_CORE/core' );

  /*
   * @param {Array} arr
   * @param {*} item - The item to remove from the array
   */
  core.arrayRemove = function arrayRemove( arr, item ) {
    assert && assert( arr instanceof Array, 'arrayRemove either takes an Array' );

    var index = _.indexOf( arr, item );
    assert && assert( index >= 0, 'item not found in Array' );

    arr.splice( index, 1 );
  };

  return core.arrayRemove;
} );