// Copyright 2019, University of Colorado Boulder

/**
 * Like LoDash's _.merge, this will recursively merge nested options objects provided that the keys end in 'Options'
 * (case sensitive) and they are pure objects. That is, they must be defined by `... = { ... }` or `someProp: { ... }`;
 * arrays, functions, and inherited types will all throw assertion errors.
 * TODO phet-info#91 param names don't match implementation, and should be above function merge, not here
 * @param  {Object} target
 * @param  {Object} ...sources
 * @returns {Object}
 * TODO phet-info#91 @author
 */
define( require => {
  'use strict';

  // modules
  const phetCore = require( 'PHET_CORE/phetCore' );

  //TODO phet-info#91 documentation, @param, @returns
  function merge( obj ) {
    _.each( Array.prototype.slice.call( arguments, 1 ), function( source ) {
      if ( source ) {
        for ( var prop in source ) {
          if ( prop.includes( 'Options' ) && obj.hasOwnProperty( prop ) ) {
            // ensure that the ...Options property is a POJSO
            assert && assert( Object.getPrototypeOf( source[ prop ] ) === Object.prototype,
              'merge can only take place between Objects declared by {}' );
            // ensure that the ...Options property is not set by a getter
            assert && assert( !( Object.getOwnPropertyDescriptor( source, prop ).hasOwnProperty( 'get' ) ),
              'cannot use merge with a getter' );
            //TODO phet-info#91 by calling recursively, this mutates all except the last arg. Should only mutate the first arg, ala _.merge and _.extend.
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