// Copyright 2022, University of Colorado Boulder

import StrictOmit from './StrictOmit.js';
import PickRequired from './PickRequired.js';

/**
 * Creates a type like the input type T, but with all certain properties required.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 * @author Sam Reid (PhET Interactive Simulations)
 */

type WithRequired<T, list extends keyof T> = StrictOmit<T, list> & PickRequired<T, list>;
export default WithRequired;