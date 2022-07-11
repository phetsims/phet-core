// Copyright 2022, University of Colorado Boulder

/**
 * Finds keys of an object that match a specific type, see
 * https://stackoverflow.com/questions/54520676/in-typescript-how-to-get-the-keys-of-an-object-type-whose-values-are-of-a-given
 *
 * For instance, KeysMatching<{ foo: number; x: string; k: number; }, number> will be 'foo' | 'k'
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

type KeysMatching<T, V> = { [K in keyof T]-?: T[K] extends V ? K : never }[keyof T];
export default KeysMatching;
