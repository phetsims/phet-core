// Copyright 2022, University of Colorado Boulder

/**
 * Converts either an entire object (or a subset of keys of it) into non-null forms.
 *
 * type T = {
 *   a: number | null;
 *   b: string | number[] | null;
 *   c: { x: number; };
 * };
 * type X = WithoutNull<T>; // { a: number, b: string | number[], c: { x: 5 } }
 * type Y = WithoutNull<T, 'a'>; // { a: number, b: string | number[] | null, c: { x: 5 } }
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import NotNull from './NotNull.js';

type WithoutNull<T extends object, keys extends keyof T = keyof T> = T & { [key in keys]: NotNull<T[ key ]> };
export default WithoutNull;
