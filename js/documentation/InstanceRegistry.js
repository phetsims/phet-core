// Copyright 2018-2019, University of Colorado Boulder

/**
 * Tracks object allocations for reporting using binder.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const inherit = require( 'PHET_CORE/inherit' );
  const phetCore = require( 'PHET_CORE/phetCore' );

  // constants
  const map = {};

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
        const key = repoName + '/' + typeName;
        map[ key ] = map[ key ] || [];

        try {
          instance.toDataURL( function( dataURL ) {
            map[ key ].push( dataURL );
          } );
        }
        catch( e ) {

          // Ignore nodes that don't draw anything
          // TODO https://github.com/phetsims/phet-core/issues/80 is this masking a problem?
        }
      }
    }
  } );
} );