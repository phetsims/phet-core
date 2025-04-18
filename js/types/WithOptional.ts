// Copyright 2022-2025, University of Colorado Boulder

/**
 * Creates a type like the input type T, but with all certain properties optional.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 * @author Sam Reid (PhET Interactive Simulations)
 */

import PickOptional from './PickOptional.js';
import StrictOmit from './StrictOmit.js';


type WithOptional<T, list extends keyof T> = StrictOmit<T, list> & PickOptional<T, list>;
export default WithOptional;