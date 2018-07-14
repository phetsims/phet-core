// Copyright 2015, University of Colorado Boulder

/**
 * @author Jonathan Olson
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  /**
   * @param {string} name
   * @constructor
   */
  function Namespace( name ) {

    this.name = name; // @public (read-only)

    if ( window.phet ) {
      assert && assert( !window.phet[ name ], 'namespace ' + name + ' already exists' );
      window.phet[ name ] = this;
    }
  }

  Namespace.prototype = {

    constructor: Namespace,

    /**
     * Registers a key-value pair with the namespace.
     *
     * If there are no dots ('.') in the key, it will be assigned to the namespace. For example:
     * - x.register( 'A', A );
     * will set x.A = A.
     *
     * If the key contains one or more dots ('.'), it's treated somewhat like a path expression. For instance, if the
     * following is called:
     * - x.register( 'A.B.C', C );
     * then the register function will navigate to the object x.A.B and add x.A.B.C = C.
     *
     * @param {string} key
     * @param {*} value
     * @returns {*} value, for chaining
     * @public
     */
    register: function( key, value ) {

      // If the key isn't compound (doesn't contain '.'), we can just look it up on this namespace
      if ( key.indexOf( '.' ) < 0 ) {
        assert && assert( !this[ key ], key + ' is already registered for namespace ' + this.name );
        this[ key ] = value;
      }
      // Compound (contains '.' at least once). x.register( 'A.B.C', C ) should set x.A.B.C.
      else {
        var keys = key.split( '.' ); // e.g. [ 'A', 'B', 'C' ]

        // Walk into the namespace, verifying that each level exists. e.g. parent => x.A.B
        var parent = this; // eslint-disable-line consistent-this
        for ( var i = 0; i < keys.length - 1; i++ ) { // for all but the last key
          assert && assert( !!parent[ keys[ i ] ],
            [ this.name ].concat( keys.slice( 0, i + 1 ) ).join( '.' ) + ' needs to be defined to register ' + key );

          parent = parent[ keys[ i ] ];
        }

        // Write into the inner namespace, e.g. x.A.B[ 'C' ] = C
        var lastKey = keys[ keys.length - 1 ];
        assert && assert( !parent[ lastKey ], key + ' is already registered for namespace ' + this.name );
        parent[ lastKey ] = value;
      }

      return value;
    }
  };

  return Namespace;
} );
