// Copyright 2002-2014, University of Colorado Boulder

/**
 * Experimental prototype inheritance
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
define( function( require ) {
  'use strict';

  var core = require( 'PHET_CORE/core' );
  var extend = require( 'PHET_CORE/extend' );

  /**
   * Experimental inheritance prototype, similar to Inheritance.inheritPrototype, but maintains
   * supertype.prototype.constructor while properly copying ES5 getters and setters.
   *
   * TODO: find problems with this! It's effectively what is being used by Scenery
   * TODO: consider inspecting arguments to see whether they are functions or just objects, to support
   *       something like inherit( subtype, supertypeA, supertypeB, properties )
   *
   * Usage:
   * function A() { scenery.Node.call( this ); };
   * inherit( scenery.Node, A, {
   *   customBehavior: function() { ... },
   *   isAnA: true
   * } );
   * new A().isAnA // true
   * new scenery.Node().isAnA // undefined
   * new A().constructor.name // 'A'
   *
   * @param subtype             Constructor for the subtype. Generally should contain supertype.call( this, ... )
   * @param supertype           Constructor for the supertype.
   * @param prototypeProperties [optional] object containing properties that will be set on the prototype.
   * @param staticProperties [optional] object containing properties that will be set on the constructor function itself
   */
  var inherit = core.inherit = function inherit( supertype, subtype, prototypeProperties, staticProperties ) {
    assert && assert( typeof supertype === 'function' );

    function F() {}
    F.prototype = supertype.prototype; // so new F().__proto__ === supertype.prototype

    subtype.prototype = extend( // extend will combine the properties and constructor into the new F copy
      new F(),                  // so new F().__proto__ === supertype.prototype, and the prototype chain is set up nicely
      { constructor: subtype }, // overrides the constructor properly
      prototypeProperties       // [optional] additional properties for the prototype, as an object.
    );

    //Copy the static properties onto the subtype constructor so they can be accessed 'statically'
    extend( subtype, staticProperties );

    return subtype; // pass back the subtype so it can be returned immediately as a module export
  };

  return inherit;
} );
