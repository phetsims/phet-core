// Copyright 2018-2024, University of Colorado Boulder

/**
 * Tracks object allocations for reporting using binder.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import phetCore from '../phetCore.js';
import Bounds2 from '../../../dot/js/Bounds2.js';
import TReadOnlyProperty from '../../../axon/js/TReadOnlyProperty.js';

type NodeLike = {
  toDataURL: ( callback: ( data: string ) => void ) => void;
  boundsProperty: TReadOnlyProperty<Bounds2>;
};

type ComponentMap = Record<string, string[]>;

function registerImplementation( instance: NodeLike, key: string, map: ComponentMap ): void {
  instance.toDataURL( dataURL => {
    map[ key ].push( dataURL );
  } );
}

class InstanceRegistry {

  // Per named component, store image URIs of what their usages look like
  public static componentMap: ComponentMap = {};

  /**
   * Adds a screenshot of the given scenery Node
   */
  public static registerDataURL( repoName: string, typeName: string, instance: NodeLike ): void {
    if ( phet.chipper.queryParameters.binder ) {

      // Create the map if we haven't seen that component type before
      const key = `${repoName}/${typeName}`;
      InstanceRegistry.componentMap[ key ] = InstanceRegistry.componentMap[ key ] || [];

      try {
        if ( instance.boundsProperty.value.isFinite() ) {
          registerImplementation( instance, key, InstanceRegistry.componentMap );
        }
        else {
          const boundsListener = ( bounds: Bounds2 ) => {
            if ( bounds.isFinite() ) {
              registerImplementation( instance, key, InstanceRegistry.componentMap );
              instance.boundsProperty.unlink( boundsListener ); // less for memory, and more to not double add
            }
          };
          instance.boundsProperty.lazyLink( boundsListener );
        }
      }
      catch( e ) {

        // Ignore nodes that don't draw anything
        // TODO https://github.com/phetsims/phet-core/issues/80 is this masking a problem?
      }
    }
  }

  /**
   * Register a toolbox pattern node. There is no strict class for this, so this factored out method can be used by any constructor
   */
  public static registerToolbox( instance: NodeLike ): void {
    if ( phet.chipper.queryParameters.binder ) {
      InstanceRegistry.registerDataURL( 'sun', 'ToolboxPattern', instance );
    }
  }
}

phetCore.register( 'InstanceRegistry', InstanceRegistry );

export default InstanceRegistry;