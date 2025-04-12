// Copyright 2021-2025, University of Colorado Boulder
/**
 * Singleton which keeps track of all async items currently loading, and doesn't proceed until all have been loaded.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 */

import affirm from '../../perennial-alias/js/browser-and-node/affirm.js';
import arrayRemove from '../../phet-core/js/arrayRemove.js';
import phetCore from './phetCore.js';
import IntentionalAny from './types/IntentionalAny.js';

type AsyncLoaderListener = () => void;
type AsyncLoaderLock = () => void;

class AsyncLoader {

  // Locks waiting to be resolved before we can move to the next stage after loading. Lock objects can be arbitrary
  // objects.
  private pendingLocks: IntentionalAny[];

  // Marked as true when there are no more locks and we try to proceed.  Helps protect against new locks being created
  // after they should be.
  private loadComplete: boolean;

  // Listeners which will be invoked after everything has been loaded.
  private listeners: AsyncLoaderListener[];

  // An auto-created lock that will auto-capture loading stages (created on startup, so we won't pre-emptively fire
  // listeners when an item finishes loading before other items are added). This lock can be run to indicate that we have
  // kicked off loading for everything needed for a particular stage. Then listeners will run for that stage, and
  // listeners will be cleared.
  public stageComplete: AsyncLoaderLock;

  public constructor() {
    this.pendingLocks = [];
    this.loadComplete = false;
    this.listeners = [];

    this.stageComplete = this.createLock( 'stage' );
  }

  // Allow resetting this for sandbox or other non-sim purposes. We'll want to be able to load resources AFTER
  // we've completed loading.
  public reset(): void {
    this.loadComplete = false;
    this.stageComplete = this.createLock( 'stage' );
  }

  /**
   * @param listener - called when load is complete
   */
  public addListener( listener: AsyncLoaderListener ): void {
    this.listeners.push( listener );
  }

  /**
   * Attempts to proceed to the next phase if possible (otherwise it's a no-op).
   *
   * NOTE: If potentially loading more resources, this should call reset().
   */
  private proceedIfReady(): void {
    if ( this.pendingLocks.length === 0 ) {
      affirm( !this.loadComplete, 'cannot complete load twice without a reset() in-between' );
      this.loadComplete = true;

      this.listeners.forEach( listener => listener() );
    }
  }

  /**
   * Creates a lock, which is a callback that needs to be run before we can proceed.
   */
  public createLock( object?: IntentionalAny ): AsyncLoaderLock {
    affirm( !this.loadComplete, 'Cannot create more locks after a stage has completed unless reset() is called' );
    this.pendingLocks.push( object );
    return () => {
      affirm( this.pendingLocks.includes( object ), 'invalid lock' );
      arrayRemove( this.pendingLocks, object );
      this.proceedIfReady();
    };
  }
}

const asyncLoader = new AsyncLoader();

phetCore.register( 'asyncLoader', asyncLoader );

export default asyncLoader;
export type { AsyncLoaderLock, AsyncLoaderListener };