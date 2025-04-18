// Copyright 2022-2025, University of Colorado Boulder

/**
 * Creates a type like the input type T, but with all certain properties required.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 * @author Sam Reid (PhET Interactive Simulations)
 */

import PickRequired from './PickRequired.js';
import StrictOmit from './StrictOmit.js';


type WithRequired<T, list extends keyof T> = StrictOmit<T, list> & PickRequired<T, list>;
export default WithRequired;