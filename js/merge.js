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

  // constants
  const optionsSuffix = 'Options';

  //TODO phet-info#91 documentation, @param, @returns
  function merge( obj ) {
    assert && assert( obj && typeof obj === 'object' );

    // ensure that options keys are not ES5 setters
    assert && Object.keys( obj ).forEach( prop => {
      assert( !Object.getOwnPropertyDescriptor( obj, prop ).hasOwnProperty( 'set' ),
        'cannot use merge with a setter' );
    } );

    _.each( Array.prototype.slice.call( arguments, 1 ), function( source ) {
      if ( source ) {
        for ( var prop in source ) {
          const optionsIndex = prop.indexOf( optionsSuffix );
          const isOptions = optionsIndex >= 0 && optionsIndex === prop.length - optionsSuffix.length;

          // ensure that options keys are not ES5 getters
          assert && assert( !( Object.getOwnPropertyDescriptor( source, prop ).hasOwnProperty( 'get' ) ),
            'cannot use merge with a getter' );

          if ( isOptions ) {
            // ensure that the ...Options property is a POJSO
            assert && assert( Object.getPrototypeOf( source[ prop ] ) === Object.prototype,
              'merge can only take place between Objects declared by {}' );
            //TODO phet-info#91 by calling recursively, this mutates all except the last arg. Should only mutate the first arg, ala _.merge and _.extend.
            obj[ prop ] = merge( obj[ prop ] || {}, source[ prop ] );
          }
          else {
            obj[ prop ] = source[ prop ];
          }
        }
      }
    } );
    return obj;
  }

  return phetCore.register( 'merge', merge );
} );