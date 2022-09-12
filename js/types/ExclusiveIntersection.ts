// Copyright 2022, University of Colorado Boulder

/**
 * Returns the intersection of up to 4 types, ensuring that none of them have any keys in common.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 * @author Sam Reid (PhET Interactive Simulations)
 */

type ExclusiveIntersection<A,
  B extends { [K in keyof B]: K extends keyof A ? never : B[K] },

  // assumes A and B have something, so we don't end up with {} & {} & {}
  C extends { [K in keyof C]: K extends keyof A ? never : K extends keyof B ? never : C[K] } = {}, // eslint-disable-line @typescript-eslint/ban-types
  D extends { [K in keyof D]: K extends keyof A ? never : K extends keyof B ? never : K extends keyof C ? never : D[K] } = {}> // eslint-disable-line @typescript-eslint/ban-types
  = A & B & C & D;

export default ExclusiveIntersection;
