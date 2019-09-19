// Copyright 2013-2019, University of Colorado Boulder

define( require => {
  'use strict';

  const Namespace = require( 'PHET_CORE/Namespace' );

  const phetCore = new Namespace( 'phetCore' );

  // Namespace can't require this file, so we register it as a special case.
  phetCore.register( 'Namespace', Namespace );

  return phetCore;
} );
