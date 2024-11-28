// Copyright 2022-2024, University of Colorado Boulder

import PickRequired from './PickRequired.js';
import StrictOmit from './StrictOmit.js';

/**
 * Creates a type like the input type T, but with all certain properties required.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 * @author Sam Reid (PhET Interactive Simulations)
 */

type WithRequired<T, list extends keyof T> = StrictOmit<T, list> & PickRequired<T, list>;
export default WithRequired;