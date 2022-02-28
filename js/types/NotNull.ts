// Copyright 2022, University of Colorado Boulder

/**
 * Similar to the built-in NotNullable, but just for null
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

type NotNull<T> = T extends null ? never : T;
export default NotNull;
