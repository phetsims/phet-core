// Copyright 2017, University of Colorado Boulder

/**
 * mixedWith tests
 *
 * @author Jonathan Olson (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var mixedWith = require( 'PHET_CORE/mixedWith' );

  QUnit.module( 'mixedWith' );

  QUnit.test( 'mixedWith', function( assert ) {
    var NAME = 'phet-core-sim';

    // Our basic type that we'll want to extend with a mixin
    function Simulation() {
      this.name = NAME;
    }

    inherit( Object, Simulation );

    // Mixin that doesn't require initialization during construction
    function Playable( type ) {
      type.prototype.play = function() {
        window.thisIsProbablyNotDefinedDoNotLogInTests && console.log( 'many fun, such entertain' );
      };
    }

    // Mixin that does require initialization during construction (returned)
    function Runnable( type ) {
      type.prototype.run = function() {
        this.running = true;
      };
      return function() {
        // @private
        this.running = false;
      };
    }

    // Easily create a "subtype" of Simulation that is both playable and runnable.
    // For debugging purposes, its name is overridden as Simulation_Playable_Runnable (indicating the type and mixins
    // that were applied). Further mixing would concatenate.
    var PhETSimulation = mixedWith( Simulation, Playable, Runnable );

    // Instantiation shows both mixins are applied to the prototype, and the initializer ran
    var mixedSim = new PhETSimulation();
    assert.equal( mixedSim.name, NAME ); // 'phet-core-sim'
    mixedSim.play(); // >> many fun, such entertain
    assert.equal( mixedSim.running, false ); // false
    mixedSim.run();
    assert.equal( mixedSim.running, true ); // true

    // The original type is unaffected
    var basicSim = new Simulation();
    assert.equal( basicSim.play, undefined ); // does not exist
    assert.equal( basicSim.running, undefined ); // does not exist
    assert.equal( basicSim.run, undefined ); // does not exist
  } );
} );