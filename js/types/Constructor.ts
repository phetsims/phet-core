// Copyright 2022, University of Colorado Boulder

import IntentionalAny from '../IntentionalAny.js';

/**
 * Simple generic Type for a Constructor.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

type Constructor<T = {}, K extends IntentionalAny[] = IntentionalAny[]> = new ( ...args: K ) => T;
export default Constructor;
