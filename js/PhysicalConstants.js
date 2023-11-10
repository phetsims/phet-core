// Copyright 2019-2023, University of Colorado Boulder

/**
 * From wikipedia:
 *  > A physical constant, sometimes fundamental physical constant or universal constant, is a physical quantity that is
 *  > generally believed to be both universal in nature and have constant value in time. It is contrasted with a
 *  > mathematical constant, which has a fixed numerical value, but does not directly involve any physical
 *  > measurement.
 *
 * Here is a link to examples of these types of "universal constants"
 * https://cosmologist.info/teaching/Cosmology/Physical_constants.pdf
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import phetCore from './phetCore.js';

const PhysicalConstants = {

  /**
   * The coefficient in Newton's universal law of gravitation: F = G * m1 * m2 * r^-2
   * The value is described in:
   * https://en.wikipedia.org/wiki/Gravitational_constant
   * https://physics.nist.gov/cgi-bin/cuu/Value?bg
   * https://www.quora.com/What-is-the-value-of-gravitational-constant-G
   */
  GRAVITATIONAL_CONSTANT: 6.67430E-11, // m^3 kg^-1 s^-2

  /**
   * The amount of gravity on Earth.
   * m/s^2
   */
  GRAVITY_ON_EARTH: 9.81
};

phetCore.register( 'PhysicalConstants', PhysicalConstants );
export default PhysicalConstants;