// Copyright 2020-2023, University of Colorado Boulder

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

import inheritance from './inheritance.js';
import phetCore from './phetCore.js';

/**
 * @param {Object|null|undefined|any} object - an object to test property existence
 * @param {string[]} properties - a list of properties to assert exist
 */
const assertHasProperties = ( object, properties ) => {
  if ( assert && object ) {


    properties.forEach( property => {

      assert && assert( Object.getOwnPropertyDescriptor( object, property ) || // support fields directly on the object

                        // test up the class hierarchy for if the property is defined on a prototype.
                        _.some( inheritance( object.constructor ).map( type => Object.getOwnPropertyDescriptor( type.prototype, property ) ) ),
        `property not defined: ${property}` );
    } );
  }
};

phetCore.register( 'assertHasProperties', assertHasProperties );
export default assertHasProperties;