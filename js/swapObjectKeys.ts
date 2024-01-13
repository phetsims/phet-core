// Copyright 2019-2024, University of Colorado Boulder

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
import IntentionalAny from './types/IntentionalAny.js';

// Get a unique object reference to compare against. This is preferable to comparing against `undefined` because
// that doesn't differentiate between and object with a key that has a value of undefined, `{x:undefined}` verses
// `{}` in which `x === undefined` also.
const placeholderObject: IntentionalAny = {};

function swapObjectKeys<T extends object>( object: T, keyName1: keyof T, keyName2: keyof T ): T {
  const placeholderWithType: T[keyof T] = placeholderObject;

  // store both values into temp vars before trying to overwrite onto the object
  let value1 = placeholderWithType;
  let value2 = placeholderWithType;
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
}

phetCore.register( 'swapObjectKeys', swapObjectKeys );

export default swapObjectKeys;