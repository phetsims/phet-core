// Copyright 2017-2020, University of Colorado Boulder

/**
 * escapeHTML tests
 *
 * @author Jonathan Olson (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 */

import escapeHTML from './escapeHTML.js';

QUnit.module( 'escapeHTML' );

QUnit.test( 'escapeHTML', assert => {
  assert.equal( escapeHTML( 'A&B' ), 'A&amp;B', 'simple &' );
  assert.equal( escapeHTML( 'A<B' ), 'A&lt;B', 'simple <' );
  assert.equal( escapeHTML( 'A>B' ), 'A&gt;B', 'simple >' );
  assert.equal( escapeHTML( 'A"B' ), 'A&quot;B', 'simple "' );
  assert.equal( escapeHTML( 'A\'B' ), 'A&#x27;B', 'simple \'' );
  assert.equal( escapeHTML( 'A/B' ), 'A&#x2F;B', 'simple /' );

  assert.equal( escapeHTML( '&amp; & ""' ), '&amp;amp; &amp; &quot;&quot;', 'multiple escaping' );
} );