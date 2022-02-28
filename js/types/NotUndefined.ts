// Copyright 2022, University of Colorado Boulder

/**
 * Similar to the built-in NotNullable, but just for undefined
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

type NotUndefined<T> = T extends undefined ? never : T;
export default NotUndefined;
