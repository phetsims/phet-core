// Copyright 2019, University of Colorado Boulder


define( require => {
  'use strict';

  // modules
  const phetCore = require( 'PHET_CORE/phetCore' );

  function merge( obj ) {
    _.each( Array.prototype.slice.call( arguments, 1 ), function( source ) {
      if ( source ) {
        for ( var prop in source ) {
          if ( prop.includes( 'Options' ) && obj.hasOwnProperty( prop ) ) {
            // ensure that the ...Options property is a POJSO
            assert && assert( Object.getPrototypeOf( source[ prop ] ) === Object.prototype, 'merge can only take place between Objects declared by {}' );
            assert && assert( !( Object.getOwnPropertyDescriptor( source, prop ).hasOwnProperty( 'get' ) ), 'cannot use merge with a getter' );
            Object.defineProperty( obj, prop, merge( obj[ prop ], source[ prop ] ) );
          }
          else {
            Object.defineProperty( obj, prop, Object.getOwnPropertyDescriptor( source, prop ) );
          }
        }
      }
    } );
    return obj;
  }

  return phetCore.register( 'merge', merge );
} );