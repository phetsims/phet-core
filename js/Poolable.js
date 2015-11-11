// Copyright 2015, University of Colorado Boulder

/**
 * Object pooling mix-in, for cases where creating new objects is expensive, and we'd rather mark some objects as able
 * to be reused (i.e. 'in the pool'). This provides a pool of objects for each type it is invoked on. It allows for
 * getting "new" objects that can either be constructed OR pulled in from a pool, and requires that the objects are
 * essentially able to "re-run" the constructor.
 *
 * This is usually done by having an initialize() method on the objects with the same call signature as the constructor,
 * and the constructor basically forwards to initialize(). Thus most "construction" logic is in the initialize() call.
 * Then when putting the object back in the pool, references should be released, so memory isn't leaked. The initialize()
 * function needs to support being called multiple times, and generally shouldn't create additional objects on calls
 * after the first.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

define( function( require ) {
  'use strict';

  var phetCore = require( 'PHET_CORE/phetCore' );
  var extend = require( 'PHET_CORE/extend' );

  var Poolable = {
    /**
     * Adds the pool and some static methods to the type, and adds the instance method freeToPool() to the type's
     * prototype.
     * @public
     *
     * Options available:
     * - maxPoolSize {number} - Maximum number of items that can be allowed in the pool
     * - initialSize {number} - If non-zero, that many fresh items will be constructed if there is a defaultFactory
     * - defaultFactory {function() => Type} - Factory function with no parameters that creates an instance of the type.
     *     Allows Type.dirtyFromPool() and Type.fillPool()
     * - constructorDuplicateFactory { function( pool ) => function( ... ) => Type}
     *     Creates a factory function that takes the same parameters as the type's constructors. Allows
     *     Type.createFromPool( ... )
     *
     * @param {function} type - The constructor for the type
     * @param {Object} [options] -
     */
    mixin: function( type, options ) {
      var proto = type.prototype;

      // defaults
      options = extend( {
        maxPoolSize: 50, // since we don't want to blow too much memory
        initialSize: 0
      }, options );

      var pool = type.pool = [];

      /*
       * For example: defaultFactory: function() { return new Vector2(); }
       */
      if ( options.defaultFactory ) {
        // @public
        type.dirtyFromPool = function() {
          if ( pool.length ) {
            // return an instance in an arbitrary (dirty) state
            return pool.pop();
          }
          else {
            // else return a new default instance
            return options.defaultFactory();
          }
        };

        // @public - fills the object pool up to n instances
        type.fillPool = function( n ) {
          // fill up the object pool to the initial size
          while ( pool.length < n ) {
            pool.push( options.defaultFactory() );
          }
        };

        // fill the pool initially to the initial size
        type.fillPool( options.initialSize );
      }

      /*
       * For example: constructorDuplicateFactory:
       *                function( pool ) {
       *                  return function( x, y ) {
       *                    if ( pool.length ) {
       *                      return pool.pop().set( x, y );
       *                    } else {
       *                      return new Vector2( x, y );
       *                    }
       *                  }
       *                }
       * It allows arbitrary creation (from the constructor / etc) or mutation (from the pooled instance).
       */
      if ( options.constructorDuplicateFactory ) {
        // @public
        type.createFromPool = options.constructorDuplicateFactory( pool );
      }

      /*
       * @public
       * Frees the object to the pool (instance.freeToPool())
       */
      proto.freeToPool = function() {
        if ( pool.length < options.maxPoolSize ) {
          pool.push( this );
        }
      };
    }
  };
  phetCore.register( 'Poolable', Poolable );

  return Poolable;
} );