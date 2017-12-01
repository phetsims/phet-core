// Copyright 2017, University of Colorado Boulder

/**
 * escapeHTML tests
 *
 * @author Jonathan Olson (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var escapeHTML = require( 'PHET_CORE/escapeHTML' );

  QUnit.module( 'escapeHTML' );

  QUnit.test( 'escapeHTML', function( assert ) {
    assert.equal( escapeHTML( 'A&B' ), 'A&amp;B', 'simple &' );
    assert.equal( escapeHTML( 'A<B' ), 'A&lt;B', 'simple <' );
    assert.equal( escapeHTML( 'A>B' ), 'A&gt;B', 'simple >' );
    assert.equal( escapeHTML( 'A"B' ), 'A&quot;B', 'simple "' );
    assert.equal( escapeHTML( 'A\'B' ), 'A&#x27;B', 'simple \'' );
    assert.equal( escapeHTML( 'A/B' ), 'A&#x2F;B', 'simple /' );

    assert.equal( escapeHTML( '&amp; & ""' ), '&amp;amp; &amp; &quot;&quot;', 'multiple escaping' );
  } );
} );