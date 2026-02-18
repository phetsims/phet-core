// Copyright 2022-2026, University of Colorado Boulder

/**
 * Similar to the built-in NotNullable, but just for undefined
 *
 * @author Jonathan Olson (PhET Interactive Simulations)
 */

type NotUndefined<T> = T extends undefined ? never : T;
export default NotUndefined;