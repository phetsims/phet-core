// Copyright 2020-2025, University of Colorado Boulder

/**
 * Throws an assertion error if specified object doesn't have all provided properties. This will also work for anything
 * defined on class prototypes (like Node.prototype.setOpacity)
 *
 * @example
 * assertHasProperties( { tree:1, flower:2 }, [ 'tree' ] ) => no error
 * assertHasProperties( { flower:2 }, [ 'tree' ] ) => error
 * assertHasProperties( { tree:1, flower:2 }, [ 'tree', 'flower' ] ) => no error
 * assertHasProperties( { tree:1 }, [ 'tree', 'flower' ] ) => error
 * assertHasProperties( new phet.scenery.Node(), [ 'getOpacity','opacity', '_opacity' ] ) => no error
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import affirm, { isAffirmEnabled } from '../../perennial-alias/js/browser-and-node/affirm.js';
import _ from '../../sherpa/js/lodash.js';
import inheritance from './inheritance.js';
import phetCore from './phetCore.js';
import IntentionalAny from './types/IntentionalAny.js';

const assertHasProperties = ( object: IntentionalAny, properties: string[] ): void => {
  if ( isAffirmEnabled() && object ) {


    properties.forEach( property => {

      affirm( Object.getOwnPropertyDescriptor( object, property ) || // support fields directly on the object

                        // test up the class hierarchy for if the property is defined on a prototype.
                        _.some( inheritance( object.constructor ).map( type => Object.getOwnPropertyDescriptor( type.prototype, property ) ) ),
        `property not defined: ${property}` );
    } );
  }
};

phetCore.register( 'assertHasProperties', assertHasProperties );
export default assertHasProperties;