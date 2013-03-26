// Copyright 2013, University of Colorado

/**
 * Prototype chaining using Parasitic Combination Inheritance
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  /**
   * Use this function to do prototype chaining using Parasitic Combination Inheritance.
   * Instead of calling the supertype's constructor to assign a prototype (as is done
   * in Combination Inheritance), you create a copy of the supertype's prototype.
   * <br>
   * Here's the basic pattern:
   * <br>
   * <code>
   * function Supertype(...) {...}
   *
   * function Subtype(...) {
           *     Supertype.call(this, ...); // constructor stealing, called second
           *     ...
           * }
   *
   * inheritPrototype( Subtype, Supertype ); // prototype chaining, called first
   * </code>
   * <br>
   * (source: JavaScript for Web Developers, N. Zakas, Wrox Press, p. 212-215)
   */
  function inheritPrototype( subtype, supertype ) {
    var prototype = Object( supertype.prototype ); // create a clone of the supertype's prototype
    prototype.constructor = subtype; // account for losing the default constructor when prototype is overwritten
    subtype.prototype = prototype; // assign cloned prototype to subtype
  }

  return inheritPrototype;
} );
