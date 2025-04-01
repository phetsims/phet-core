// Copyright 2024-2025, University of Colorado Boulder

/**
 * Start Qunit while all runtime modalities (debugging/headless puppeteer).
 * To be used in cases where you should not depend on PhET-iO repos (via phetioEngine).
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import affirm from '../../perennial-alias/js/browser-and-node/affirm.js';
import _ from '../../sherpa/js/lodash.js';

affirm( QUnit, 'QUnit global needed to start QUnit' );

// PRIVATE!! - Don't import this, it is just to be used by qunitStart()
export const qunitStartImplementation = ( ready: VoidFunction ): void => {

  const start = () => {

    // Uncomment for a debugger whenever a test fails
    if ( _.hasIn( window, 'phet.chipper.queryParameters' ) && phet.chipper.queryParameters.debugger ) {
      QUnit.log( context => { if ( !context.result ) { debugger; }} ); // eslint-disable-line no-debugger
    }

    ready();
  };

  // When running in the puppeteer harness, we need the opportunity to wire up listeners before QUnit begins.
  if ( new URLSearchParams( window.location.search ).has( 'qunitHooks' ) ) {

    // @ts-expect-error - global that is listened to by out puppeteer harness, don't worry about it.
    window.qunitLaunchAfterHooks = start;
  }
  else {
    start();
  }
};

const qunitStartWithoutPhetioTests = (): void => qunitStartImplementation( () => QUnit.start() );

export default qunitStartWithoutPhetioTests;