// Copyright 2022, University of Colorado Boulder

/**
 * Converts an instance type to a constructor type.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

type ConstructorOf<T> = { new( ...args: any[] ): T; };
export default ConstructorOf;
