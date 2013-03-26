// Copyright 2013, University of Colorado

/**
 * A method of calling an overridden super-type method.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  /**
   * A somewhat ugly method of calling an overridden super-type method.
   * <p>
   * Example:
   * <code>
   * function SuperType() {
   * }
   *
   * SuperType.prototype.reset = function() {...}
   *
   * function SubType() {
   *    SuperType.call( this ); // constructor stealing
   * }
   *
   * SubType.prototype = new SuperType(); // prototype chaining
   *
   * SubType.prototype.reset = function() {
   *     Inheritance.callSuper( SuperType, "reset", this ); // call overridden super method
   *     // do subtype-specific stuff
   * }
   * </code>
   *
   * @param supertype
   * @param {String} name
   * @param context typically this
   * @return {Function}
   */
  function callSuper( supertype, name, context ) {
    (function () {
      var fn = supertype.prototype[name];
      Function.call.apply( fn, arguments );
    })( context );
  };

  return callSuper;
} );
