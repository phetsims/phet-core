// Copyright 2013-2015, University of Colorado Boulder

/**
 * Timer so that other modules can run timing related code through the simulation's requestAnimationFrame. Use its
 * Emitter interface for adding/removing listeners. Note: this is not specific to the running screen, it is global
 * across all screens.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const phetCore = require( 'PHET_CORE/phetCore' );
  const Emitter = require( 'AXON/Emitter' );

  class Timer extends Emitter {

    // @public - Add a listener (which can take a {number} dt argument) to be called back once after the specified time
    // (in milliseconds)
    setTimeout( listener, timeout ) {
      let elapsed = 0;
      const callback = dt => {
        elapsed += dt;

        //Convert seconds to ms and see if item has timed out
        if ( elapsed * 1000 >= timeout ) {
          listener();
          this.removeListener( callback );
        }
      };
      this.addListener( callback );

      //Return the callback so it can be removed with removeStepListener
      return callback;
    }

    // @public - Clear a scheduled timeout. If there was no timeout, nothing is done.
    clearTimeout( timeoutID ) {
      if ( this.hasListener( timeoutID ) ) {
        this.removeListener( timeoutID );
      }
    }

    // @public - Add a listener (which can take a {number} dt argument) to be called at specified intervals (in
    // milliseconds)
    setInterval( listener, interval ) {
      let elapsed = 0;
      const callback = dt => {
        elapsed += dt;

        //Convert seconds to ms and see if item has timed out
        while ( elapsed * 1000 >= interval && this.hasListener( callback ) !== -1 ) {
          listener();
          elapsed = elapsed - interval / 1000.0; //Save the leftover time so it won't accumulate
        }
      };
      this.addListener( callback );

      //Return the callback so it can be removed with removeListener
      return callback;
    }

    // @public - Clear a scheduled interval. If there was no interval, nothing is done.
    clearInterval( intervalID ) {
      if ( this.hasListener( intervalID ) ) {
        this.removeListener( intervalID );
      }
    }
  }

  // Register and return a singleton
  return phetCore.register( 'timer', new Timer() );
} );