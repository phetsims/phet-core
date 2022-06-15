// Copyright 2022, University of Colorado Boulder

/**
 * Simple generic Type for a Constructor.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import IntentionalAny from './IntentionalAny.js';
import EmptyObjectType from './EmptyObjectType.js';

type Constructor<T = EmptyObjectType, K extends IntentionalAny[] = IntentionalAny[]> = new ( ...args: K ) => T;
export default Constructor;
