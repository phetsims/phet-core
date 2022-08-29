// Copyright 2022, University of Colorado Boulder

/**
 * Finds keys of an object that do not match a specific type, see
 *
 * For instance, KeysMatching<{ foo: number; x: string; k: number; }, number> will be 'x'
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

type KeysNotMatching<T, V> = { [K in keyof T]-?: T[K] extends V ? never : K }[keyof T];
export default KeysNotMatching;
