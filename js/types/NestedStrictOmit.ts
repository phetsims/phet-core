// Copyright 2022, University of Colorado Boulder

/**
 * Omits properties that are nested one level deep.
 *
 * Example: NestedStrictOmit<NumberControl, 'sliderOptions', 'trackNode' | 'thumbNode'>
 *
 * @author Chris Malley (PixelZoom, Inc.)
 * @author Sam Reid (PhET Interactive Simulations)
 */

import StrictOmit from './StrictOmit.js';

/**
 * @param T - the type that has the nested property
 * @param P - the name of the property containing the nested options
 * @param K - the keys of the nested options to be omitted
 */
type NestedStrictOmit<T, P extends keyof T, K extends keyof Required<T>[P]> =
  StrictOmit<T, P> &
  Partial<Record<P, StrictOmit<Required<T>[P], K>>>;

export default NestedStrictOmit;