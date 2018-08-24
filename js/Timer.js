// Copyright 2013-2015, University of Colorado Boulder

/**
 * Timer so that other modules can run timing related code through the simulation's requestAnimationFrame.
 * Note: this is not specific to the running screen, it is global across all screens.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var phetCore = require( 'PHET_CORE/phetCore' );
  var Emitter = require( 'AXON/Emitter' );

  // Emitter used to send notifications when the timer ticks.
  var stepEmitter = new Emitter();

  var Timer = {

    // @public {Emitter} - the emitter that sends {number} dt events
    stepEmitter: stepEmitter,

    // @public (joist-internal) - Trigger a step event, called by Sim.js in the animation loop
    step: function( dt ) {
      stepEmitter.emit1( dt );
    },

    // @public - Add a listener to be called back once after the specified time (in milliseconds)
    setTimeout: function( listener, timeout ) {
      var elapsed = 0;
      var self = this;
      var callback = function( dt ) {
        elapsed += dt;

        //Convert seconds to ms and see if item has timed out
        if ( elapsed * 1000 >= timeout ) {
          listener();
          self.removeStepListener( callback );
        }
      };
      this.addStepListener( callback );

      //Return the callback so it can be removed with removeStepListener
      return callback;
    },

    // @public - Clear a scheduled timeout. If there was no timeout, nothing is done.
    clearTimeout: function( timeoutID ) {
      if ( this.hasStepListener( timeoutID ) ) {
        this.removeStepListener( timeoutID );
      }
    },

    // @public - Add a listener to be called at specified intervals (in milliseconds)
    setInterval: function( listener, interval ) {
      var elapsed = 0;
      var self = this;
      var callback = function( dt ) {
        elapsed += dt;

        //Convert seconds to ms and see if item has timed out
        while ( elapsed * 1000 >= interval && self.hasStepListener( callback ) !== -1 ) {
          listener();
          elapsed = elapsed - interval / 1000.0; //Save the leftover time so it won't accumulate
        }
      };
      this.addStepListener( callback );

      //Return the callback so it can be removed with removeStepListener
      return callback;
    },

    // @public - Clear a scheduled interval. If there was no interval, nothing is done.
    clearInterval: function( intervalID ) {
      if ( this.hasStepListener( intervalID ) ) {
        this.removeStepListener( intervalID );
      }
    },

    // @public - Add a listener to be called back on every animationFrame with a dt value
    addStepListener: function( listener ) {
      stepEmitter.addListener( listener );
    },

    // @public - Remove a step listener from being called back
    removeStepListener: function( listener ) {
      stepEmitter.removeListener( listener );
    },

    // @public
    hasStepListener: function( listener ) {
      return stepEmitter.hasListener( listener );
    }
  };

  phetCore.register( 'Timer', Timer );

  return Timer;
} );