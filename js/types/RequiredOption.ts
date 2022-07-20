// Copyright 2022, University of Colorado Boulder

/**
 * Allows grabbing *the type* of a required option out of a type. For example if we have
 *
 * type SelfOptions = { something?: number | string | Property<Ray2>; };
 *
 * This can be used in a field of the type as:
 *
 * something: RequiredOption<SelfOptions, 'something'>;
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import NotUndefined from './NotUndefined.js';

type RequiredOption<Options extends object, Name extends keyof Options> = NotUndefined<Options[ Name ]>;
export default RequiredOption;
