// Copyright 2019-2020, University of Colorado Boulder

/**
 * Swap the values of two keys on an object, but only if the value is defined
 *
 * @example
 * swapObjectKeys( { x: 4,y: 3 }, 'x', 'y' ) -> { x: 4, y:3 }
 * swapObjectKeys( { x: 4 }, 'x', 'y' ) -> { y:4 }
 * swapObjectKeys( { x: 4, y: undefined }, 'x', 'y' ) -> { x: undefined, y:4 }
 * swapObjectKeys( { otherStuff: 'hi' }, 'x', 'y' ) -> { otherStuff: 'hi' }
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import phetCore from './phetCore.js';

// Get a unique object reference to compare against. This is preferable to comparing against `undefined` because
// that doesn't differentiate between and object with a key that has a value of undefined, `{x:undefined}` verses
// `{}` in which `x === undefined` also.
const placeholderObject = {};

/**
 * @param {Object} object
 * @param {string} keyName1
 * @param {string} keyName2
 * @returns {Object} the passed in object
 */
const swapObjectKeys = ( object, keyName1, keyName2 ) => {

  // store both values into temp vars before trying to overwrite onto the object
  let value1 = placeholderObject;
  let value2 = placeholderObject;
  if ( object.hasOwnProperty( keyName1 ) ) {
    value1 = object[ keyName1 ];
  }
  if ( object.hasOwnProperty( keyName2 ) ) {
    value2 = object[ keyName2 ];
  }

  // If the value changed, then swap the keys
  if ( value1 !== placeholderObject ) {
    object[ keyName2 ] = value1;
  }
  else {

    // if not defined, then make sure it is removed
    delete object[ keyName2 ];
  }

  // If the value changed, then swap the keys
  if ( value2 !== placeholderObject ) {
    object[ keyName1 ] = value2;
  }
  else {

    // if not defined, then make sure it is removed
    delete object[ keyName1 ];
  }
  return object; // for chaining
};

phetCore.register( 'swapObjectKeys', swapObjectKeys );

export default swapObjectKeys;