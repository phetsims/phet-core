// Copyright 2022, University of Colorado Boulder

/**
 * Empty Object Type that will replace all the {} in the PhET software.
 * TODO: For now, it is itself a {} with a eslint-disable-line, but in the future https://github.com/phetsims/chipper/issues/1252
 * it should become a more nuanced type that works with optionize.
 *
 * @author Agustín Vallejo (PhET Interactive Simulations)
 */

type EmptyObjectType = {}; // eslint-disable-line
export default EmptyObjectType;