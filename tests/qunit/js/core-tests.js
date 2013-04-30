
(function() {
  module( 'Phet-core' );
  
  test( 'isArray', function() {
    ok( core.isArray( [ 1, 2, 3 ] ) );
    ok( core.isArray( [] ) );
    ok( !core.isArray( 0 ) );
    ok( !core.isArray( {} ) );
    ok( !core.isArray( function() {} ) );
  } );
  
  test( 'escapeHTML', function() {
    equal( core.escapeHTML( 'A&B' ), 'A&amp;B', 'simple &' );
    equal( core.escapeHTML( 'A<B' ), 'A&lt;B', 'simple <' )
    equal( core.escapeHTML( 'A>B' ), 'A&gt;B', 'simple >' )
    equal( core.escapeHTML( 'A"B' ), 'A&quot;B', 'simple "' )
    equal( core.escapeHTML( 'A\'B' ), 'A&#x27;B', 'simple \'' )
    equal( core.escapeHTML( 'A/B' ), 'A&#x2F;B', 'simple /' );
    
    equal( core.escapeHTML( '&amp; & ""' ), '&amp;amp; &amp; &quot;&quot;', 'multiple escaping' );
  } );
  
})();
