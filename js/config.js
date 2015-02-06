// Copyright 2002-2014, University of Colorado Boulder

require.config( {
  deps: [ 'main' ],

  paths: {
    underscore: '../../sherpa/lodash-2.4.1',
    PHET_CORE: '.'
  },

  // optional cache buster to make browser refresh load all included scripts, can be disabled with ?cacheBuster=false
  urlArgs: phet.phetcommon.getCacheBusterArgs()
} );
