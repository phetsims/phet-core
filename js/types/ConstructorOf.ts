// Copyright 2022-2026, University of Colorado Boulder

/**
 * Converts an instance type to a constructor type.
 *
 * @author Jonathan Olson (PhET Interactive Simulations)
 */

import IntentionalAny from './IntentionalAny.js';

type ConstructorOf<T> = { new( ...args: IntentionalAny[] ): T };
export default ConstructorOf;