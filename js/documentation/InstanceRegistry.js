// Copyright 2018, University of Colorado Boulder

/**
 * Tracks object allocations for reporting using binder.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var phetCore = require( 'PHET_CORE/phetCore' );
  var inherit = require( 'PHET_CORE/inherit' );

  // constants
  var map = {};

  /**
   * @constructor
   */
  function InstanceRegistry() {
  }

  phetCore.register( 'InstanceRegistry', InstanceRegistry );

  return inherit( Object, InstanceRegistry, {}, {

    /**
     * @public (read-only) - used by puppeteer in binder
     */
    map: map,

    /**
     * Adds a screenshot of the given scenery Node
     * @param {string} typeName
     * @param {Node} instance
     * @public
     */
    registerDataURL: function( typeName, instance ) {
      if ( phet.chipper.queryParameters.binder ) {

        // Create the map if
        map[ typeName ] = map[ typeName ] || [];
        instance.toDataURL( function( dataURL ) {
          map[ typeName ].push( dataURL );
        } );
      }
    }
  } );
} );