// Copyright 2022, University of Colorado Boulder

/**
 * Concatenating tuple types, see https://stackoverflow.com/questions/64630803/concat-tuple-types-in-typescript
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

type Concat<T> = T extends [ infer A, ...infer Rest ] ? A extends any[] ? [ ...A, ...Concat<Rest> ] : A : T;
export default Concat;
