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
    equal( core.escapeHTML( 'A<B' ), 'A&lt;B', 'simple <' );
    equal( core.escapeHTML( 'A>B' ), 'A&gt;B', 'simple >' );
    equal( core.escapeHTML( 'A"B' ), 'A&quot;B', 'simple "' );
    equal( core.escapeHTML( 'A\'B' ), 'A&#x27;B', 'simple \'' );
    equal( core.escapeHTML( 'A/B' ), 'A&#x2F;B', 'simple /' );

    equal( core.escapeHTML( '&amp; & ""' ), '&amp;amp; &amp; &quot;&quot;', 'multiple escaping' );
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
    core.inherit( Person, Warrior,

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
    ok( core.cleanArray().length === 0, 'Given no argument, should return a fresh empty array' );
    ok( core.cleanArray( undefined ).length === 0, 'Given undefined, should return a fresh empty array' );
    ok( core.cleanArray( null ).length === 0, 'Given null, should return a fresh empty array' );
    var arr1 = ['5'];
    var arr2 = core.cleanArray( arr1 );
    ok( arr1 === arr2, 'Should use the same array object provided' );
    ok( arr2.length === 0, 'Should empty it out' );
    ok( arr1.length === 0, 'Also empties the original (sanity check)' );
  } );
})();
