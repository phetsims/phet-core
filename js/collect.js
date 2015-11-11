// Copyright 2013-2015, University of Colorado Boulder

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

  var phetCore = require( 'PHET_CORE/phetCore' );

  function collect( iterate ) {
    assert && assert( typeof iterate === 'function' );
    var result = [];
    iterate( function( ob ) {
      result.push( ob );
    } );
    return result;
  }

  phetCore.register( 'collect', collect );

  return collect;
} );