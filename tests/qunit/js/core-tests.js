
(function() {
  module( 'Phet-core' );
  
  test( 'isArray', function() {
    ok( core.isArray( [ 1, 2, 3 ] ) );
    ok( core.isArray( [] ) );
    ok( !core.isArray( 0 ) );
    ok( !core.isArray( {} ) );
    ok( !core.isArray( function() {} ) );
  } );
  
})();
