
// Copyright 2002-2014, University of Colorado Boulder

define( function( require ) {
  'use strict';
  
  window.assert = window.assert || require( 'ASSERT/assert' )( 'basic' );
  window.assertSlow = window.assertSlow || require( 'ASSERT/assert' )( 'slow', true );
  
  // no phetAllocation initialized, since we don't need it with just phet-core, and this file is required before that
  
  // will be filled in by other modules
  return {};
} );
