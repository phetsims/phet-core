// Copyright 2013-2015, University of Colorado Boulder

/**
 * Helps create a one-of subtype that mixes in certain mixins.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

define( function( require ) {
  'use strict';

  var inherit = require( 'PHET_CORE/inherit' );
  var phetCore = require( 'PHET_CORE/phetCore' );

  /**
   * Returns a new subtype of the passed in type that has mixins applied.
   * @public
   *
   * Each mixin should be a function that takes a type as a parameter, mixes it into the type when called, and
   * optionally returns a function that should be called at the end of the constructor. Additionally, its function name
   * is used as part of the returned type name.
   *
   * For example:
   *
   * | // Our basic type that we'll want to extend with a mixin
   * | function Simulation() {
   * |   this.name = 'phet-core-sim';
   * | }
   * | phetCore.inherit( Object, Simulation );
   * |
   * | // Mixin that doesn't require initialization during construction
   * | function Playable( type ) {
   * |   type.prototype.play = function() {
   * |     console.log( 'many fun, such entertain' );
   * |   }
   * | }
   * |
   * | // Mixin that does require initialization during construction (returned)
   * | function Runnable( type ) {
   * |   type.prototype.run = function() {
   * |     this.running = true;
   * |   };
   * |   return function() {
   * |     // @private
   * |     this.running = false;
   * |   };
   * | }
   * |
   * | // Easily create a "subtype" of Simulation that is both playable and runnable.
   * | // For debugging purposes, its name is overridden as Simulation_Playable_Runnable (indicating the type and mixins
   * | // that were applied). Further mixing would concatenate.
   * | var PhETSimulation = phetCore.mixedWith( Simulation, Playable, Runnable );
   * |
   * | // Instantiation shows both mixins are applied to the prototype, and the initializer ran
   * | var mixedSim = new PhETSimulation();
   * | mixedSim.name; // 'phet-core-sim'
   * | mixedSim.play(); // >> many fun, such entertain
   * | mixedSim.running; // false
   * | mixedSim.run();
   * | mixedSim.running; // true
   * |
   * | // The original type is unaffected
   * | var basicSim = new Simulation();
   * | basicSim.play(); // errors
   *
   * @param {Function} supertype - This is the type you want with mixins, without modifying this original type.
   * @param {...Function} mixins - Zero or more (var-args style) of function( type: {Function} ) => {Function|undefined}
   *                               which, when called with a type, will mix in the type. If a return value is provided,
   *                               it should be a function that will be called in the constructor (with the
   *                               constructor's arguments).
   * @returns {Function} - The subtype
   */
  function mixedWith( supertype, mixins ) {
    assert && assert( typeof supertype === 'function' );

    // Support an arbitrary number of mixins with varargs. Strips off the first argument (the supertype).
    mixins = Array.prototype.slice.call( arguments, 1 );

    // Figure out the preferred type name for our subtype constructor
    var name = supertype.name;
    mixins.forEach( function( mixin ) {
      // A common pattern for mixins with type-scope parameters should be:
      //   mixedWith( super, someMixin.bind( null, someParameter ) )
      // with someMixin( someParameter, type ). This allows mixing in custom function parameters, etc. defined at the
      // type level.
      // Chrome prepends 'bound ' for every time a function is bound, so we filter that out with global replacement.
      name = name + '_' + mixin.name.replace( /bound /g, '_' );
    } );

    // Holds all initializer functions that need to be called during construction
    var initializers = [];

    // Creates the constructor.
    // The 'new Function' pattern is used so that we can have a useful type/constructor name that is type-specific.
    // This is not "essential", but it is highly preferred so that types in devtools are understandable.
    // The inner closure runs the "wrapped" implicit function. We then call the inner function with our supertype
    // and initializer array. Initializers don't have to be appended to the array yet.
    var subtype = ( new Function( 'return function( suptype, inits ) {' +
                                  '  return function ' + name + '() {' +
                                  '    var self = this;' +
                                  '    var args = Array.prototype.slice.call( arguments );' +
                                  '    suptype.apply( this, args );' +
                                  '    inits.forEach( function( init ) { init.apply( self, args ); } );' +
                                  '  };' +
                                  '};' )() )( supertype, initializers );

    // Inherit, so that our prototype and other nice properties carry over.
    inherit( supertype, subtype );

    // Apply the mixins in order, and process initializers
    mixins.forEach( function( mixin ) {
      var optionalInitializer = mixin( subtype );
      if ( typeof optionalInitializer === 'function' ) {
        initializers.push( optionalInitializer );
      }
    } );

    return subtype;
  }

  phetCore.register( 'mixedWith', mixedWith );

  return mixedWith;
} );
