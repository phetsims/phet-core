// Copyright 2017-2019, University of Colorado Boulder

/**
 * Unit tests for phet-core. Please run once in phet brand and once in brand=phet-io to cover all functionality.
 *
 * @author Jonathan Olson (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 */

import './arrayDifferenceTests.js';
import './arrayRemoveTests.js';
import './assertMutuallyExclusiveOptionsTests.js';
import './cleanArrayTests.js';
import './detectPrefixEventTests.js';
import './detectPrefixTests.js';
import './dimensionForEachTests.js';
import './dimensionMapTests.js';
import './EnumerationTests.js';
import './escapeHTMLTests.js';
import './inheritTests.js';
import './interleaveTests.js';
import './isArrayTests.js';
import './mergeTests.js';
import './mixedWithTests.js';
import './pairsTests.js';
import './partitionTests.js';
import './swapObjectKeysTests.js';

// Since our tests are loaded asynchronously, we must direct QUnit to begin the tests
QUnit.start();