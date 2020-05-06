// Copyright 2013-2020, University of Colorado Boulder

/* eslint-disable bad-text */
/**
 * Utility function for setting up prototypal inheritance.
 * Maintains supertype.prototype.constructor while properly copying ES5 getters and setters.
 * Supports adding functions to both the prototype itself and the constructor function.
 *
 * Usage:
 *
 * // Call the supertype constructor somewhere in the subtype's constructor.
 * function A() { scenery.Node.call( this ); };
 *
 * // Add prototype functions and/or 'static' functions
 * export default inherit( scenery.Node, A, {
 *   customBehavior: function() { ... },
 *   isAnA: true
 * }, {
 *   someStaticFunction: function() { ...}
 * } );
 *
 * // client calls
 * new A().isAnA; // true
 * new scenery.Node().isAnA; // undefined
 * new A().constructor.name; // 'A'
 * A.someStaticFunction();
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
/* eslint-enable bad-text */

import extend from './extend.js';
import phetCore from './phetCore.js';

/**
 * @param supertype           Constructor for the supertype.
 * @param subtype             Constructor for the subtype. Generally should contain supertype.call( this, ... )
 * @param prototypeProperties [optional] object containing properties that will be set on the prototype.
 * @param staticProperties [optional] object containing properties that will be set on the constructor function itself
 * @deprecated - please use ES6 class
 */
function inherit( supertype, subtype, prototypeProperties, staticProperties ) {
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
}

phetCore.register( 'inherit', inherit );

export default inherit;