// Copyright 2022, University of Colorado Boulder

/**
 * Omits properties that are nested one level deep.
 *
 * Example: NestedStrictOmit<NumberControl, 'sliderOptions', 'trackNode' | 'thumbNode'>
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import StrictOmit from './StrictOmit.js';

/**
 * @param T - the type that has the nested properties
 * @param P - the name of the property containing the nested properties
 * @param K - the keys of the nested properties to be omitted
 */
type Omit2<T, P extends keyof T, K extends keyof Required<T>[P]> = Record<P, StrictOmit<Required<T>[P], K>>;
type NestedStrictOmit<T, P extends keyof T, K extends keyof Required<T>[P]> =
  StrictOmit<T, P> & ( undefined extends T[P] ? Partial<Omit2<T, P, K>> : Omit2<T, P, K> );

export default NestedStrictOmit;