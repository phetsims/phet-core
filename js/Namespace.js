// Copyright 2015-2023, University of Colorado Boulder

/**
 * @author Jonathan Olson
 * @author Chris Malley (PixelZoom, Inc.)
 */

import isHMR from './isHMR.js';

class Namespace {
  /**
   * @param {string} name
   */
  constructor( name ) {

    this.name = name; // @public (read-only)

    if ( window.phet ) {
      // We already create the chipper namespace, so we just attach to it with the register function.
      if ( name === 'chipper' ) {
        window.phet.chipper.name = 'chipper';
        window.phet.chipper.register = this.register.bind( window.phet.chipper );
        return window.phet.chipper; // eslint-disable-line -- we want to provide the namespace API on something already existing
      }
      else {
        /* TODO: Ideally we should always assert this, but in PhET-iO wrapper code, multiple built modules define the
           TODO: same namespace, this should be fixed in https://github.com/phetsims/phet-io-wrappers/issues/477 */
        const ignoreAssertion = !_.hasIn( window, 'phet.chipper.brand' );
        assert && !ignoreAssertion && assert( !window.phet[ name ], `namespace ${name} already exists` );
        window.phet[ name ] = this;
      }
    }
  }

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
  register( key, value ) {

    // When using hot module replacement, a module will be loaded and initialized twice, and hence its namespace.register
    // function will be called twice.  This should not be an assertion error.

    // If the key isn't compound (doesn't contain '.'), we can just look it up on this namespace
    if ( key.indexOf( '.' ) < 0 ) {
      if ( !isHMR ) {
        assert && assert( !this[ key ], `${key} is already registered for namespace ${this.name}` );
      }
      this[ key ] = value;
    }
    // Compound (contains '.' at least once). x.register( 'A.B.C', C ) should set x.A.B.C.
    else {
      const keys = key.split( '.' ); // e.g. [ 'A', 'B', 'C' ]

      // Walk into the namespace, verifying that each level exists. e.g. parent => x.A.B
      let parent = this; // eslint-disable-line consistent-this
      for ( let i = 0; i < keys.length - 1; i++ ) { // for all but the last key

        if ( !isHMR ) {
          assert && assert( !!parent[ keys[ i ] ],
            `${[ this.name ].concat( keys.slice( 0, i + 1 ) ).join( '.' )} needs to be defined to register ${key}` );
        }

        parent = parent[ keys[ i ] ];
      }

      // Write into the inner namespace, e.g. x.A.B[ 'C' ] = C
      const lastKey = keys[ keys.length - 1 ];

      if ( !isHMR ) {
        assert && assert( !parent[ lastKey ], `${key} is already registered for namespace ${this.name}` );
      }

      parent[ lastKey ] = value;
    }

    return value;
  }
}

export default Namespace;