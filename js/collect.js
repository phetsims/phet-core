// Copyright 2002-2014, University of Colorado Boulder

/**
 * Creates an array of results from an iterator that takes a callback.
 *
 * For instance, if calling a function f( g ) will call g( 1 ), g( 2 ), and g( 3 ),
 * collect( function( callback ) { f( callback ); } );
 * will return [1,2,3].
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

define( function( require ) {
  'use strict';

  var core = require( 'PHET_CORE/core' );

  var collect = core.collect = function collect( iterate ) {
    assert && assert( typeof iterate === 'function' );
    var result = [];
    iterate( function( ob ) {
      result.push( ob );
    } );
    return result;
  };
  return collect;
} );
