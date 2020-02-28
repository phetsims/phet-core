// Copyright 2013-2020, University of Colorado Boulder

/**
 * Escaping of HTML content that will be placed in the body, inside an element as a node.
 *
 * This is NOT for escaping something in other HTML contexts, for example as an attribute value
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import phetCore from './phetCore.js';

function escapeHTML( str ) {
  // see https://www.owasp.org/index.php/XSS_(Cross_Site_Scripting)_Prevention_Cheat_Sheet
  // HTML Entity Encoding
  return str
    .replace( /&/g, '&amp;' )
    .replace( /</g, '&lt;' )
    .replace( />/g, '&gt;' )
    .replace( /"/g, '&quot;' )
    .replace( /'/g, '&#x27;' )
    .replace( /\//g, '&#x2F;' );
}

phetCore.register( 'escapeHTML', escapeHTML );

export default escapeHTML;