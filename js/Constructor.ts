// Copyright 2022, University of Colorado Boulder

/**
 * Simple generic Type for a Constructor.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

type Constructor<T = {}> = new ( ...args: any[] ) => T;
export default Constructor;
