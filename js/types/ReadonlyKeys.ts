// Copyright 2023, University of Colorado Boulder

/**
 * Returns the writable keys of an object type.
 *
 * See https://stackoverflow.com/questions/49579094/typescript-conditional-types-filter-out-readonly-properties-pick-only-requir
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

// NOTE: Did not refactor out this IfEquals, because it doesn't handle all cases correctly
type IfEquals<X, Y, A=X, B=never> =
  ( <T>() => T extends X ? 1 : 2 ) extends
  ( <T>() => T extends Y ? 1 : 2 ) ? A : B;

type ReadonlyKeys<T> = {
  [P in keyof T]-?: IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, never, P>
}[keyof T];
export default ReadonlyKeys;
