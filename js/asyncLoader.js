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

    // @private - mark that readyToProceed() has been called, and callback has been set. This step in the lifecycle should
    // only happen once.
    this.readyToProceedCalled = false;

    // @private {function|null} - The callback which should be invoked after everything has been loaded.
    this.callback = null;
  }

  /**
   * Once all the locks needed have been created, call this to signify that once all pending items have been loaded,
   * this callback should be called.
   * @public
   * @param {function} callback - the callback function which should create and start the sim, given that the images
   *                              are loaded
   */
  readyToProceed( callback ) {
    assert && assert( !this.readyToProceedCalled, 'Already called readyToProceed' );
    assert && assert( typeof callback === 'function' );

    this.callback = callback;

    this.readyToProceedCalled = true;

    // See if we are already loaded by the time that we originally signify ready to proceed.
    this.proceedIfReady();
  }

  /**
   * Attempts to proceed to the next phase if possible (otherwise it's a no-op).
   * @private
   */
  proceedIfReady() {
    if ( this.pendingLocks.length === 0 && this.readyToProceedCalled ) {
      assert && assert( !this.loadComplete, 'cannot complete load twice' );
      assert && assert( this.callback, 'callback should be set if we are readyToProceed');
      this.loadComplete = true;

      this.callback();
    }
  }

  /**
   * Creates a lock, which returns a callback that needs to be run before we can proceed.
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