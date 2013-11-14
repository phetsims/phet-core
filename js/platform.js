// Copyright 2002-2013, University of Colorado Boulder

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
  
  var core = require( 'PHET_CORE/core' );
  
  var ua = navigator.userAgent;
  
  // taken from HomeScreen
  function isIE( version ) {
    var r = new RegExp( 'msie' + (!isNaN( version ) ? ('\\s' + version) : ''), 'i' );
    return r.test( ua );
  }
  
  var platform = core.platform = {
    get firefox() { return ua.toLowerCase().indexOf( 'firefox' ) > -1; },

    //see http://stackoverflow.com/questions/3007480/determine-if-user-navigated-from-mobile-safari
    get mobileSafari() { return ua.match( /(iPod|iPhone|iPad)/ ) && ua.match( /AppleWebKit/ ); },
    get safari5() { return ua.match( /Version\/5\./ ) && ua.match( /Safari\// ) && ua.match( /AppleWebKit/ ); },
    get safari6() { return ua.match( /Version\/6\./ ) && ua.match( /Safari\// ) && ua.match( /AppleWebKit/ ); },
    get safari7() { return ua.match( /Version\/7\./ ) && ua.match( /Safari\// ) && ua.match( /AppleWebKit/ ); },
    
    get ie9() { return isIE( 9 ); },
    get ie10() { return isIE( 10 ); },
    get ie11() { return isIE( 11 ); },
    get ie() { return ua.indexOf( 'MSIE' ) !== -1; },
    
    // from HomeScreen
    get android() { return ua.indexOf( 'Android' ) > 0; }
  };
  return platform;
} );
