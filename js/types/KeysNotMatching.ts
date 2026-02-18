// Copyright 2022-2026, University of Colorado Boulder

/**
 * Finds keys of an object that do not match a specific type, see
 *
 * For instance, KeysMatching<{ foo: number; x: string; k: number; }, number> will be 'x'
 *
 * @author Jonathan Olson (PhET Interactive Simulations)
 */

type KeysNotMatching<T, V> = { [K in keyof T]-?: T[K] extends V ? never : K }[keyof T];
export default KeysNotMatching;