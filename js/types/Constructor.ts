// Copyright 2022, University of Colorado Boulder

/**
 * Simple generic Type for a Constructor.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import IntentionalAny from './IntentionalAny.js';

type Constructor<T=object, K extends IntentionalAny[] = IntentionalAny[]> = new ( ...args: K ) => T;
export default Constructor;
