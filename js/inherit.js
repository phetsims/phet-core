// Copyright 2013, University of Colorado

/**
 * Experimental prototype inheritance
 *
 * @author Jonathan Olson <olsonsjc@gmail.com>
 */
define( function( require ) {
  'use strict';
  
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
   * inherit( A, scenery.Node, {
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
   */
  function inherit( subtype, supertype, prototypeProperties ) {
    function F() {}
    F.prototype = supertype.prototype; // so new F().__proto__ === supertype.prototype
    
    subtype.prototype = extend( // extend will combine the properties and constructor into the new F copy
      new F(),                  // so new F().__proto__ === supertype.prototype, and the prototype chain is set up nicely
      { constructor: subtype }, // overrides the constructor properly
      prototypeProperties       // [optional] additional properties for the prototype, as an object.
    );
  }

  return inherit;
} );
