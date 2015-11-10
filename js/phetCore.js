// Copyright 2013-2015, University of Colorado Boulder

define( function( require ) {
  'use strict';

  var Namespace = require( 'PHET_CORE/Namespace' );

  // no phetAllocation initialized, since we don't need it with just phet-core, and this file is required before that

  var phetCore = new Namespace( 'phetCore' );

  // Namespace can't require this file, so we register it as a special case.
  phetCore.register( 'Namespace', Namespace );

  return phetCore;
} );
