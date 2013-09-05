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
  
  // taken from HomeScreen
  function isIE( version ) {
    var r = new RegExp( 'msie' + (!isNaN( version ) ? ('\\s' + version) : ''), 'i' );
    return r.test( navigator.userAgent );
  }
  
  return {
    get firefox() { return navigator.userAgent.toLowerCase().indexOf( 'firefox' ) > -1; },

    //see http://stackoverflow.com/questions/3007480/determine-if-user-navigated-from-mobile-safari
    get mobileSafari() { return navigator.userAgent.match( /(iPod|iPhone|iPad)/ ) && navigator.userAgent.match( /AppleWebKit/ ); },
    
    get ie9() { return isIE( 9 ); },
    get ie10() { return isIE( 10 ); },
    get ie() { return navigator.userAgent.indexOf( 'MSIE'); },
    
    // from HomeScreen
    get android() { return navigator.userAgent.indexOf( 'Android' ) > 0; }
  };
} );
