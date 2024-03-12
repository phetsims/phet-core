// Copyright 2018-2022, University of Colorado Boulder

/**
 * Tracks object allocations for reporting using binder.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import phetCore from '../phetCore.js';

type NodeLike = {
  toDataURL: ( callback: ( data: string ) => void ) => void;
};

class InstanceRegistry {
  public static map: Record<string, string[]> = {};

  /**
   * Adds a screenshot of the given scenery Node
   */
  public static registerDataURL( repoName: string, typeName: string, instance: NodeLike ): void {
    if ( phet.chipper.queryParameters.binder ) {

      // Create the map if we haven't seen that component type before
      const key = `${repoName}/${typeName}`;
      InstanceRegistry.map[ key ] = InstanceRegistry.map[ key ] || [];

      try {
        instance.toDataURL( dataURL => {
          InstanceRegistry.map[ key ].push( dataURL );
        } );
      }
      catch( e ) {

        // Ignore nodes that don't draw anything
        // TODO https://github.com/phetsims/phet-core/issues/80 is this masking a problem?
      }
    }
  }
}


phetCore.register( 'InstanceRegistry', InstanceRegistry );

export default InstanceRegistry;