// Copyright 2018, University of Colorado Boulder

/**
 * Tracks object allocations for reporting using binder.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var phetCore = require( 'PHET_CORE/phetCore' );

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
     * @param {string} repoName
     * @param {string} typeName
     * @param {Node} instance
     * @public
     */
    registerDataURL: function( repoName, typeName, instance ) {
      if ( phet.chipper.queryParameters.binder ) {

        // Create the map if we haven't seen that component type before
        var key = repoName + '/' + typeName;
        map[ key ] = map[ key ] || [];

        try {
          instance.toDataURL( function( dataURL ) {
            map[ key ].push( dataURL );
          } );
        }
        catch( e ) {

          // Ignore nodes that don't draw anything
          // TODO: is this masking a problem?
        }
      }
    }
  } );
} );