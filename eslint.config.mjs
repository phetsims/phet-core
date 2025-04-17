// Copyright 2024, University of Colorado Boulder

import browserAndNodeEslintConfig from '../perennial-alias/js/eslint/config/browser-and-node.eslint.config.mjs';

/**
 * ESLint configuration for phet-core.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

const actuallyJustBrowserFiles = [
  '**/*Tests.{js,ts}',
  'js/gracefulBind.ts',
  'js/deprecationWarning.ts',
  'js/documentation/InstanceRegistry.ts',
  'js/getGlobal.ts',
  'js/isPhetioEnabled.ts',
  'js/loadScript.ts',
  'js/logGlobal.ts'
];

export default [
  ...browserAndNodeEslintConfig,
  {
    files: actuallyJustBrowserFiles,
    languageOptions: {
      globals: {
        window: 'readonly',
        document: 'readonly',
        phet: 'readonly'
      }
    }
  }
];