// Copyright 2015-2018, University of Colorado Boulder

/**
 * Object pooling mixin, for cases where creating new objects is expensive, and we'd rather mark some objects as able
 * to be reused (i.e. 'in the pool'). This provides a pool of objects for each type it is invoked on. It allows for
 * getting "new" objects that can either be constructed OR pulled in from a pool, and requires that the objects are
 * essentially able to "re-run" the constructor. Then when putting the object back in the pool, references should be
 * released, so memory isn't leaked.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

define( function( require ) {
  'use strict';

  var extend = require( 'PHET_CORE/extend' );
  var phetCore = require( 'PHET_CORE/phetCore' );

  var Poolable = {
    /**
     * Changes the given type (and its prototype) to support object pooling.
     * @public
     *
     * @param {function} type - The constructor for the type
     * @param {Object} [options]
     */
    mixInto: function( type, options ) {
      options = _.extend( {
        // {Array.<*>} - If an object needs to be created without a direct call (say, to fill the pool initially), these
        // are the arguments that will be passed into the constructor
        defaultArguments: [],

        // {function} - The function to call on the objects to reinitialize them (that is either the constructor, or
        // acts like the constructor).
        initialize: type,

        // {number} - A limit for the pool size (so we don't leak memory by growing the pool faster than we take things
        // from it).
        maxSize: 100,

        // {number} - The initial size of the pool. To fill it, objects will be created with the default arguments.
        initialSize: 0,

        // {boolean} - If true, when constructing the default arguments will always be used (and then initialized with
        // the initializer) instead of just providing the arguments straight to the constructor.
        useDefaultConstruction: false
      }, options );

      assert && assert( Array.isArray( options.defaultArguments ) );
      assert && assert( typeof options.maxSize === 'number' && options.maxSize >= 0 );
      assert && assert( typeof options.initialSize === 'number' && options.initialSize >= 0 );
      assert && assert( typeof options.initialize === 'function' );
      assert && assert( typeof options.useDefaultConstruction === 'boolean' );

      // {Array.<type>} - The actual array we store things in. Always push/pop.
      var pool = [];

      // {function} - There is a madness to this craziness. We'd want to use the method noted at
      // https://stackoverflow.com/questions/1606797/use-of-apply-with-new-operator-is-this-possible, but the type is
      // not provided in the arguments array below. By calling bind on itself, we're able to get a version of bind that
      // inserts the constructor as the first argument of the .apply called later so we don't create garbage by having
      // to pack `arguments` into an array AND THEN concatenate it with a new first element (the type itself).
      var partialConstructor = Function.prototype.bind.bind( type, type );

      // {function} - Basically our type constructor, but with the default arguments included already.
      var DefaultConstructor = partialConstructor.apply( null, options.defaultArguments );

      var initialize = options.initialize;
      var useDefaultConstruction = options.useDefaultConstruction;

      extend( type, {
        /**
         * @private {Array.<type>} - This should not be modified externally. In the future if desired, functions could
         * be added to help adding/removing poolable instances manually.
         */
        pool: pool,

        /**
         * Returns an object with arbitrary state (possibly constructed with the default arguments).
         * @public
         *
         * @returns {type}
         */
        dirtyFromPool: function() {
          return pool.length ? pool.pop() : new DefaultConstructor();
        },

        /**
         * Returns an object that behaves as if it was constructed with the given arguments. May result in a new object
         * being created (if the pool is empty), or it may use the constructor to mutate an object from the pool.
         * @public
         *
         * @param {...*} var_args - The arguments will be passed to the constructor.
         * @returns {type}
         */
        createFromPool: function() {
          var result;

          if ( pool.length ) {
            result = pool.pop();
            initialize.apply( result, arguments );
          }
          else if ( useDefaultConstruction ) {
            result = new DefaultConstructor();
            initialize.apply( result, arguments );
          }
          else {
            result = new ( partialConstructor.apply( null, arguments ) );
          }

          return result;
        }
      } );

      extend( type.prototype, {
        /**
         * Adds this object into the pool, so that it can be reused elsewhere. Generally when this is done, no other
         * references to the object should be held (since they should not be used at all).
         * @public
         */
        freeToPool: function() {
          if ( pool.length < options.maxSize ) {
            pool.push( this );
          }
        }
      } );

      // Initialize the pool (if it should have objects)
      while ( pool.length < options.initialSize ) {
        pool.push( new DefaultConstructor );
      }
    }
  };

  phetCore.register( 'Poolable', Poolable );

  return Poolable;
} );
