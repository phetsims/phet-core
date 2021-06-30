// Copyright 2013-2021, University of Colorado Boulder

/**
 * Like Underscore's _.extend and PHET_CORE/merge, but with hardcoded support for ES5 getters/setters. In general this
 * type shouldn't be used for phet's options pattern, and instead was designed to support extension for defining
 * mixins and object prototypes.
 *
 * See https://github.com/documentcloud/underscore/pull/986.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import phetCore from './phetCore.js';

function extend( obj ) {
  // eslint-disable-next-line prefer-rest-params
  _.each( Array.prototype.slice.call( arguments, 1 ), source => {
    if ( source ) {
      for ( const prop in source ) {
        Object.defineProperty( obj, prop, Object.getOwnPropertyDescriptor( source, prop ) );
      }
    }
  } );
  return obj;
}

phetCore.register( 'extend', extend );

export default extend;