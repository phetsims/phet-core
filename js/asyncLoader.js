// Copyright 2021, University of Colorado Boulder
/**
 * Singleton which keeps track of all async items currently loading, and doesn't proceed until all have been loaded.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 */

import arrayRemove from '../../phet-core/js/arrayRemove.js';
import phetCore from './phetCore.js';

class AsyncLoader {
  constructor() {

    // @private {Array.<*>} - Locks waiting to be resolved before we can move to the next phase after loading.
    // Lock objects can be arbitrary objects.
    this.pendingLocks = [];

    // @private {boolean} - Marked as true when there are no more locks and we try to proceed.  Helps protect against
    // new locks being created after they should be.
    this.loadComplete = false;

    // @private {function[]} - Listeners which will be invoked after everything has been loaded.
    this.listeners = [];
  }

  /**
   * @param {function} listener - called when load is complete
   * @public
   */
  addListener( listener ) {
    assert && assert( typeof listener === 'function' );
    this.listeners.push( listener );
  }

  /**
   * Attempts to proceed to the next phase if possible (otherwise it's a no-op).
   * @private
   */
  proceedIfReady() {
    if ( this.pendingLocks.length === 0 ) {
      assert && assert( !this.loadComplete, 'cannot complete load twice' );
      this.loadComplete = true;

      this.listeners.forEach( listener => listener() );
    }
  }

  /**
   * Creates a lock, which is a callback that needs to be run before we can proceed.
   * @public
   *
   * @param {*} object
   * @returns {function}
   */
  createLock( object ) {
    assert && assert( !this.loadComplete, 'Cannot create more locks after load-step has completed' );
    this.pendingLocks.push( object );
    return () => {
      assert && assert( this.pendingLocks.indexOf( object ) >= 0, 'invalid lock' );
      arrayRemove( this.pendingLocks, object );
      this.proceedIfReady();
    };
  }
}

const asyncLoader = new AsyncLoader();

phetCore.register( 'asyncLoader', asyncLoader );

export default asyncLoader;