// Copyright 2022-2023, University of Colorado Boulder

/**
 * Use PickRequired to pick properties of a type T and make them required.
 * This is useful when picking superclass options that you want to expose in a subclass API.
 * It makes life a little easier because you have to fiddle with fewer '<' and '>' characters.
 *
 * Example:
 * type MyClassOptions = PickRequired<PhetioObjectOptions, 'tandem' | 'phetioDocumentation'>;
 * Result:
 * { tandem: Tandem, phetioDocumentation: string }
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

type PickRequired<T, list extends keyof T> = Pick<Required<T>, list>;
export default PickRequired;