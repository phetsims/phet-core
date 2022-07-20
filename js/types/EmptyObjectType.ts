// Copyright 2022, University of Colorado Boulder

/**
 * Empty Object Type that will replace all the {} in the PhET software.
 * it should become a more nuanced type that works with optionize.
 *
 * @author Agustín Vallejo (PhET Interactive Simulations)
 */

// TODO: Reuse this key in optionize, see https://github.com/phetsims/chipper/issues/1252
// TODO: Rename to EmptySelfOptions, see https://github.com/phetsims/chipper/issues/1252
// TODO: Rename key to _emptySelfOptionsKey, see https://github.com/phetsims/chipper/issues/1252
type EmptyObjectType = {
  _emptySelfOptionsKey?: never;
};
export default EmptyObjectType;