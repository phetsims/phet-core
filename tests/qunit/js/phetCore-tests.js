(function() {
  module( 'Phet-core' );

  test( 'isArray', function() {
    ok( phetCore.isArray( [ 1, 2, 3 ] ) );
    ok( phetCore.isArray( [] ) );
    ok( !phetCore.isArray( 0 ) );
    ok( !phetCore.isArray( {} ) );
    ok( !phetCore.isArray( function() {} ) );
  } );

  test( 'escapeHTML', function() {
    equal( phetCore.escapeHTML( 'A&B' ), 'A&amp;B', 'simple &' );
    equal( phetCore.escapeHTML( 'A<B' ), 'A&lt;B', 'simple <' );
    equal( phetCore.escapeHTML( 'A>B' ), 'A&gt;B', 'simple >' );
    equal( phetCore.escapeHTML( 'A"B' ), 'A&quot;B', 'simple "' );
    equal( phetCore.escapeHTML( 'A\'B' ), 'A&#x27;B', 'simple \'' );
    equal( phetCore.escapeHTML( 'A/B' ), 'A&#x2F;B', 'simple /' );

    equal( phetCore.escapeHTML( '&amp; & ""' ), '&amp;amp; &amp; &quot;&quot;', 'multiple escaping' );
  } );

  test( 'inherit', function() {
    var Person = function( name ) {
      this.name = name;
    };
    var Warrior = function( name, strength ) {
      Person.call( this, name );
      this.strength = strength;
    };
    var attacked = false;
    phetCore.inherit( Person, Warrior,

      //Instance Methods
      {
        attack: function() {
          attacked = true;
        }
      },

      //Static Methods and fields
      {
        warriorType: 'swordsman',
        getWarriorCastle: function() {return 'camelot';},
        get totalWarriorCount() {return 1234;}
      }
    );
    var galahad = new Warrior( 'galahad', 95 );
    equal( attacked, false, 'Dont call methods before they are invoked' );
    galahad.attack();
    equal( attacked, true, 'call a method added with inherit' );
    equal( Warrior.warriorType, 'swordsman', 'access static field on the constructor method' );
    equal( Warrior.getWarriorCastle(), 'camelot', 'access static method on the constructor method' );
    equal( Warrior.totalWarriorCount, 1234, 'es5 get/set should work on statics' );
  } );

  test( 'cleanArray', function() {
    ok( phetCore.cleanArray().length === 0, 'Given no argument, should return a fresh empty array' );
    ok( phetCore.cleanArray( undefined ).length === 0, 'Given undefined, should return a fresh empty array' );
    ok( phetCore.cleanArray( null ).length === 0, 'Given null, should return a fresh empty array' );
    var arr1 = [ '5' ];
    var arr2 = phetCore.cleanArray( arr1 );
    ok( arr1 === arr2, 'Should use the same array object provided' );
    ok( arr2.length === 0, 'Should empty it out' );
    ok( arr1.length === 0, 'Also empties the original (sanity check)' );
  } );

  test( 'detectPrefix', function() {
    var obj = {
      'main': false,
      'mozProp': ''
    };

    equal( phetCore.detectPrefix( obj, 'main' ), 'main' );
    equal( phetCore.detectPrefix( obj, 'prop' ), 'mozProp' );
    equal( phetCore.detectPrefix( obj, 'nothing' ), undefined );
  } );

  test( 'detectPrefixEvent', function() {
    var obj = {
      'onmain': false,
      'onmozprop': ''
    };

    equal( phetCore.detectPrefixEvent( obj, 'main' ), 'main' );
    equal( phetCore.detectPrefixEvent( obj, 'prop' ), 'mozprop' );
    equal( phetCore.detectPrefixEvent( obj, 'nothing' ), undefined );
  } );

  test( 'pairs', function() {
    equal( phetCore.pairs( [] ).length, 0 );
    equal( phetCore.pairs( [ 'a' ] ).length, 0 );
    equal( phetCore.pairs( [ 'a', 'b' ] ).length, 1 );
    equal( phetCore.pairs( [ 'a', 'b', 'c' ] ).length, 3 );
    equal( phetCore.pairs( [ 'a', 'b', 'c' ] )[ 0 ][ 0 ], 'a' );
    equal( phetCore.pairs( [ 'a', 'b', 'c' ] )[ 0 ][ 1 ], 'b' );
    equal( phetCore.pairs( [ 'a', 'b', 'c' ] )[ 1 ][ 0 ], 'a' );
    equal( phetCore.pairs( [ 'a', 'b', 'c' ] )[ 1 ][ 1 ], 'c' );
    equal( phetCore.pairs( [ 'a', 'b', 'c' ] )[ 2 ][ 0 ], 'b' );
    equal( phetCore.pairs( [ 'a', 'b', 'c' ] )[ 2 ][ 1 ], 'c' );
  } );

  test( 'partition', function() {
    var parityTest = phetCore.partition( [ 1, 2, 3, 4 ], function( n ) { return n % 2 === 0; } );
    equal( parityTest[ 0 ][ 0 ], 2 );
    equal( parityTest[ 0 ][ 1 ], 4 );
    equal( parityTest[ 1 ][ 0 ], 1 );
    equal( parityTest[ 1 ][ 1 ], 3 );
  } );

  test( 'arrayRemove', function() {
    var arr = [ 4, 3, 2, 1, 3 ];
    phetCore.arrayRemove( arr, 3 );

    equal( arr[ 0 ], 4 );
    equal( arr[ 1 ], 2 );
    equal( arr[ 2 ], 1 );
    equal( arr[ 3 ], 3 ); // doesn't remove the second instance
    equal( arr.length, 4 );

    // check reference removal
    var a = {};
    var b = {};
    var c = {};

    arr = [ a, b, c ];
    phetCore.arrayRemove( arr, b );

    equal( arr[ 0 ], a );
    equal( arr[ 1 ], c );
    equal( arr.length, 2 );
  } );
})();
