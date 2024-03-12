// Copyright 2018-2022, University of Colorado Boulder

/**
 * Tracks object allocations for reporting using binder.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import phetCore from '../phetCore.js';

// constants
const map = {};

class InstanceRegistry {
  /**
   * Adds a screenshot of the given scenery Node
   * @param {string} repoName
   * @param {string} typeName
   * @param {../../../scenery/js/nodes/Node} instance
   * @public
   */
  static registerDataURL( repoName, typeName, instance ) {
    if ( phet.chipper.queryParameters.binder ) {

      // Create the map if we haven't seen that component type before
      const key = `${repoName}/${typeName}`;
      map[ key ] = map[ key ] || [];

      try {
        instance.toDataURL( dataURL => {
          map[ key ].push( dataURL );
        } );
      }
      catch( e ) {

        // Ignore nodes that don't draw anything
        // TODO https://github.com/phetsims/phet-core/issues/80 is this masking a problem?
      }
    }
  }
}

/**
 * @public (read-only) - used by puppeteer in binder
 */
InstanceRegistry.map = map;

phetCore.register( 'InstanceRegistry', InstanceRegistry );

export default InstanceRegistry;