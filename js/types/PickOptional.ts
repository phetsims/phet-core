// Copyright 2022, University of Colorado Boulder

/**
 * Use PickOptional to pick properties of a type T and make them optional.
 * This is useful when picking superclass options that you want to expose in a subclass API.
 * (Careful if you pick a required superclass option and make it optional - you'll need to provide a default!)
 * It makes life a little easier because you have to fiddle with fewer '<' and '>' characters,
 * and PickOptional makes a little more sense than Pick<Partial> in the context of options.
 *
 * Example:
 * type MyClassOptions = PickOptional<PathOptions, 'stroke', 'lineWidth'>;
 * Result:
 * { stroke?: ColorDef, lineWidth?: number }
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

type PickOptional<T, list extends keyof T> = Pick<Partial<T>, list>;
export default PickOptional;