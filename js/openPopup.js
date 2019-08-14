// Copyright 2019, University of Colorado Boulder

/**
 * Opens a URL in a popup window or tab if possible.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

define( require => {
  'use strict';

  const phetCore = require( 'PHET_CORE/phetCore' );

  /**
   * Opens the URL in a new window or tab.
   *
   * @param {string} url
   */
  function openPopup( url ) {
    const popupWindow = window.open( url, '_blank' ); // open in a new window/tab

    // We can't guarantee the presence of a window object, since if it isn't opened then it will return null.
    // See https://github.com/phetsims/phet-ios-app/issues/508#issuecomment-520891177 and documentation at
    // https://developer.mozilla.org/en-US/docs/Web/API/Window/open.
    popupWindow && popupWindow.focus();
  }

  return phetCore.register( 'openPopup', openPopup );
} );
