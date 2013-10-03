// Copyright 2002-2013, University of Colorado Boulder

/**
 * Escaping of HTML content that will be placed in the body, inside an element as a node.
 *
 * This is NOT for escaping something in other HTML contexts, for example as an attribute value
 *
 * @author Jonathan Olson <olsonsjc@gmail.com>
 */
define( function( require ) {
  'use strict';
  
  var core = require( 'PHET_CORE/core' );
  
  var escapeHTML = core.escapeHTML = function escapeHTML( str ) {
    // see https://www.owasp.org/index.php/XSS_(Cross_Site_Scripting)_Prevention_Cheat_Sheet
    // HTML Entity Encoding
    return str.replace( /&/g, '&amp;' )
              .replace( /</g, '&lt;' )
              .replace( />/g, '&gt;' )
              .replace( /\"/g, '&quot;' )
              .replace( /\'/g, '&#x27;' )
              .replace( /\//g, '&#x2F;' );
  };
  return escapeHTML;
} );
