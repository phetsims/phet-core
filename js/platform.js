// Copyright 2002-2013, University of Colorado Boulder

/**
 * Code for testing which platform is running.  Use sparingly, if at all!
 *
 * Sample usage:
 * if (platform.firefox) {node.renderer = 'canvas';}
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  return {
    get firefox() { return navigator.userAgent.toLowerCase().indexOf( 'firefox' ) > -1; }
  };
} );