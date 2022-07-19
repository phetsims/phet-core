// Copyright 2022, University of Colorado Boulder

import IntentionalAny from './IntentionalAny.js';

/**
 * Concatenating tuple types, see https://stackoverflow.com/questions/64630803/concat-tuple-types-in-typescript
 *
 * For instance, Concat<[A, B], [C, D]> is equivalent to [A, B, C, D]. This can also flatten an array with
 * Concat<...types>.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

type Concat<T> = T extends [ infer A, ...infer Rest ] ? A extends IntentionalAny[] ? [ ...A, ...Concat<Rest> ] : A : T;
export default Concat;
