// Copyright 2002-2014, University of Colorado Boulder

/**
 * If given an Array, removes all of its elements and returns it. Otherwise, if given a falsy value
 * (null/undefined/etc.), it will create and return a fresh Array.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

define( function( require ) {
  'use strict';

  var phetCore = require( 'PHET_CORE/phetCore' );

  phetCore.cleanArray = function cleanArray( arr ) {
    assert && assert( !arr || ( arr instanceof Array ), 'cleanArray either takes an Array' );

    if ( arr ) {
      // fastest way to clear an array (http://stackoverflow.com/questions/1232040/how-to-empty-an-array-in-javascript, http://jsperf.com/array-destroy/32)
      // also, better than length=0, since it doesn't create significant garbage collection (like length=0), tested on Chrome 34.
      while ( arr.length ) {
        arr.pop();
      }
      return arr;
    }
    else {
      return [];
    }
  };

  return phetCore.cleanArray;
} );