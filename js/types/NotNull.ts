// Copyright 2022-2026, University of Colorado Boulder

/**
 * Similar to the built-in NotNullable, but just for null
 *
 * @author Jonathan Olson (PhET Interactive Simulations)
 */

type NotNull<T> = T extends null ? never : T;
export default NotNull;