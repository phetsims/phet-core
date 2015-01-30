// Copyright 2002-2014, University of Colorado Boulder

require.config( {
  deps: [ 'main' ],

  paths: {
    underscore: '../../sherpa/lodash-2.4.1',
    PHET_CORE: '.'
  },

  urlArgs: new Date().getTime() // add cache buster query string to make browser refresh actually reload everything
} );
