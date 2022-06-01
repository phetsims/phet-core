// Copyright 2022, University of Colorado Boulder

/**
 * Converts an instance type to a constructor type.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import IntentionalAny from './IntentionalAny.js';

type ConstructorOf<T> = { new( ...args: IntentionalAny[] ): T };
export default ConstructorOf;
