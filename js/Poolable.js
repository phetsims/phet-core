// Copyright 2002-2014, University of Colorado

/**
 * Experimental object pooling mix-in
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

define( function( require ) {
  'use strict';

  var core = require( 'PHET_CORE/core' );
  var extend = require( 'PHET_CORE/extend' );

  /*
   * For option details, please see documentation inside this constructor body for now
   */
  core.Poolable = function Poolable( type, options ) {
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

      // fills the object pool up to n instances
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
      type.createFromPool = options.constructorDuplicateFactory( pool );
    }

    /*
     * Frees the object to the pool (instance.freeToPool())
     */
    proto.freeToPool = function() {
      if ( pool.length < options.maxPoolSize ) {
        pool.push( this );
      }
    };
  };

  return core.Poolable;
} );