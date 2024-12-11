// Copyright 2024, University of Colorado Boulder

/**
 * ESLint configuration for phet-core.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import phetLibraryEslintConfig from '../perennial-alias/js/eslint/config/phet-library.eslint.config.mjs';

// TODO: support browser-and-node linting, https://github.com/phetsims/chipper/issues/1523
export default [
  ...phetLibraryEslintConfig
];