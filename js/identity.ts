// Copyright 2022, University of Colorado Boulder

/**
 * Function that returns its input. This was added as an alternative to _.identity because WebStorm did
 * not provide as good navigation for _.identity.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import phetCore from './phetCore.js';

export default function identity<T>( t: T ): T {
  return t;
}

phetCore.register( 'identity', identity );