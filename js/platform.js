// Copyright 2002-2014, University of Colorado Boulder

/**
 * Code for testing which platform is running.  Use sparingly, if at all!
 *
 * Sample usage:
 * if (platform.firefox) {node.renderer = 'canvas';}
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  var phetCore = require( 'PHET_CORE/phetCore' );

  var ua = navigator.userAgent;

  // taken from HomeScreen
  function isIE( version ) {
    return getInternetExplorerVersion() === version;
  }

  //IE11 no longer reports MSIE in the user agent string, see https://github.com/phetsims/phet-core/issues/12
  //This code is adapted from http://stackoverflow.com/questions/17907445/how-to-detect-ie11
  function getInternetExplorerVersion() {
    var rv = -1;
    var re = null;
    if ( navigator.appName === 'Microsoft Internet Explorer' ) {
      re = new RegExp( 'MSIE ([0-9]{1,}[.0-9]{0,})' );
      if ( re.exec( ua ) !== null ) {
        rv = parseFloat( RegExp.$1 );
      }
    }
    else if ( navigator.appName === 'Netscape' ) {
      re = new RegExp( 'Trident/.*rv:([0-9]{1,}[.0-9]{0,})' );
      if ( re.exec( ua ) !== null ) {
        rv = parseFloat( RegExp.$1 );
      }
    }
    return rv;
  }

  phetCore.platform = {
    get firefox() { return ua.toLowerCase().indexOf( 'firefox' ) > -1; },

    //see http://stackoverflow.com/questions/3007480/determine-if-user-navigated-from-mobile-safari
    get mobileSafari() { return ua.match( /(iPod|iPhone|iPad)/ ) && ua.match( /AppleWebKit/ ); },
    get safari5() { return ua.match( /Version\/5\./ ) && ua.match( /Safari\// ) && ua.match( /AppleWebKit/ ); },
    get safari6() { return ua.match( /Version\/6\./ ) && ua.match( /Safari\// ) && ua.match( /AppleWebKit/ ); },
    get safari7() { return ua.match( /Version\/7\./ ) && ua.match( /Safari\// ) && ua.match( /AppleWebKit/ ); },

    get ie9() { return isIE( 9 ); },
    get ie10() { return isIE( 10 ); },
    get ie11() { return isIE( 11 ); },
    get ie() { return getInternetExplorerVersion() !== -1; },

    // from HomeScreen
    get android() { return ua.indexOf( 'Android' ) > 0; },

    get chromium() { return (/chrom(e|ium)/).test( ua.toLowerCase() ); }
  };

  return phetCore.platform;
} );