// Copyright 2018-2024, University of Colorado Boulder

/**
 * Tracks object allocations for reporting using binder.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import phetCore from '../phetCore.js';
import IntentionalAny from '../types/IntentionalAny.js';

type NodeLike = {
  toDataURL: ( callback: ( data: string ) => void ) => void;
  boundsProperty: IntentionalAny;
};

type ComponentMap = Record<string, string[]>;

// A duck type for HotkeyData in scenery, which we cannot import into phet-core.
type HotkeyData = {
  keyStringProperties: IntentionalAny[];
  keyboardHelpDialogLabelStringProperty: IntentionalAny | null;
  serialize: () => SerializedHotkeyData;
};

// The expected serialized type for HotkeyData to pass over to binder.
type SerializedHotkeyData = {
  keyStrings: string[];
  repoName: string;
  binderName: string;
  global: boolean;
};

function registerImplementation( instance: NodeLike, key: string, map: ComponentMap ): void {
  instance.toDataURL( dataURL => {
    map[ key ].push( dataURL );
  } );
}

class InstanceRegistry {

  // Per named component, store image URIs of what their usages look like
  public static componentMap: ComponentMap = {};

  // An array of all Hotkeys that have been registered.
  public static hotkeys: SerializedHotkeyData[] = [];

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
          const boundsListener = ( bounds: IntentionalAny ) => {
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

  /**
   * Register a Hotkey for binder documentation.
   */
  public static registerHotkey( hotkeyData: HotkeyData ): void {
    if ( phet.chipper.queryParameters.binder ) {
      InstanceRegistry.hotkeys.push( hotkeyData.serialize() );
    }
  }
}

phetCore.register( 'InstanceRegistry', InstanceRegistry );

export default InstanceRegistry;