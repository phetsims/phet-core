// Copyright 2022, University of Colorado Boulder

import IntentionalAny from './IntentionalAny.js';

/**
 * Converts an instance type to a constructor type.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

type ConstructorOf<T> = { new( ...args: IntentionalAny[] ): T; };
export default ConstructorOf;
