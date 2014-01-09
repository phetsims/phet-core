// Copyright 2002-2013, University of Colorado Boulder

if ( window.has ) {
  // default config only enables basic assertions
  window.has.add( 'assert.basic', function( global, document, anElement ) { 'use strict'; return true; } );
  // window.has.add( 'assert.slow', function( global, document, anElement ) { 'use strict'; return true; } );
}

window.loadedPhetCoreConfig = true;

require.config( {
  deps: [ 'main' ],

  paths: {
    underscore: '../../sherpa/lodash-2.4.1',
    PHET_CORE: '.',
    ASSERT: '../../assert/js'
  },
  
  // shim: {
  //   underscore: { exports: '_' }
  // },

  urlArgs: new Date().getTime() // add cache buster query string to make browser refresh actually reload everything
} );
