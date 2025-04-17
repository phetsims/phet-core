// Copyright 2015-2025, University of Colorado Boulder

/**
 * For debugging or usage in the console, Namespace associates modules with a namespaced global for use in the browser.
 * This does not work in Node.js.
 *
 * @author Jonathan Olson
 * @author Chris Malley (PixelZoom, Inc.)
 */

import affirm, { isAffirmEnabled } from '../../perennial-alias/js/browser-and-node/affirm.js';
import IntentionalAny from './types/IntentionalAny.js';

// Experiment to allow accessing these off window. See https://stackoverflow.com/questions/12709074/how-do-you-explicitly-set-a-new-property-on-window-in-typescript
declare global {
  var phet: Record<string, IntentionalAny>; // eslint-disable-line no-var
}

class Namespace {
  public readonly name: string;

  public constructor( name: string ) {

    this.name = name;

    // Unsupported in Node.js
    if ( !globalThis.hasOwnProperty( 'window' ) ) {
      return;
    }

    if ( globalThis.phet ) {
      // We already create the chipper namespace, so we just attach to it with the register function.
      if ( name === 'chipper' ) {

        globalThis.phet.chipper = globalThis.phet.chipper || {};

        globalThis.phet.chipper.name = 'chipper';
        globalThis.phet.chipper.register = this.register.bind( globalThis.phet.chipper );
        return globalThis.phet.chipper; // eslint-disable-line -- we want to provide the namespace API on something already existing
      }
      else {
        // TODO: Ideally we should always assert this, but in PhET-iO wrapper code, multiple built modules define the
        //       same namespace, this should be fixed in https://github.com/phetsims/phet-io-wrappers/issues/631
        const ignoreAssertion = !( globalThis.phet?.chipper?.brand ) || name === 'joist'; // SceneryStack also needs to declare a joist object.
        isAffirmEnabled() && !ignoreAssertion && affirm( !globalThis.phet[ name ], `namespace ${name} already exists` );
        globalThis.phet[ name ] = this;
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
   */
  public register<T>( key: string, value: T ): T {

    // Unsupported in Node.js
    if ( !globalThis.hasOwnProperty( 'window' ) ) {
      return value;
    }

    // When using hot module replacement, a module will be loaded and initialized twice, and hence its namespace.register
    // function will be called twice.  This should not be an assertion error.

    // If the key isn't compound (doesn't contain '.'), we can just look it up on this namespace
    if ( key.includes( '.' ) ) {

      // @ts-expect-error
      affirm( !this[ key ], `${key} is already registered for namespace ${this.name}` );

      // @ts-expect-error
      this[ key ] = value;
    }
    // Compound (contains '.' at least once). x.register( 'A.B.C', C ) should set x.A.B.C.
    else {
      const keys = key.split( '.' ); // e.g. [ 'A', 'B', 'C' ]

      // Walk into the namespace, verifying that each level exists. e.g. parent => x.A.B
      let parent = this; // eslint-disable-line consistent-this, @typescript-eslint/no-this-alias
      for ( let i = 0; i < keys.length - 1; i++ ) { // for all but the last key

        // @ts-expect-error
        affirm( !!parent[ keys[ i ] ],
          `${[ this.name ].concat( keys.slice( 0, i + 1 ) ).join( '.' )} needs to be defined to register ${key}` );

        // @ts-expect-error
        parent = parent[ keys[ i ] ];
      }

      // Write into the inner namespace, e.g. x.A.B[ 'C' ] = C
      const lastKey = keys[ keys.length - 1 ];

      // @ts-expect-error
      affirm( !parent[ lastKey ], `${key} is already registered for namespace ${this.name}` );

      // @ts-expect-error
      parent[ lastKey ] = value;
    }

    return value;
  }
}

export default Namespace;