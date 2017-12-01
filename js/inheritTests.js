// Copyright 2017, University of Colorado Boulder

/**
 * inherit tests
 *
 * @author Jonathan Olson (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );

  QUnit.module( 'inherit' );

  QUnit.test( 'inherit', function( assert ) {
    var Person = function( name ) {
      this.name = name;
    };
    var Warrior = function( name, strength ) {
      Person.call( this, name );
      this.strength = strength;
    };
    var attacked = false;
    inherit( Person, Warrior,

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
    assert.equal( attacked, false, 'Dont call methods before they are invoked' );
    galahad.attack();
    assert.equal( attacked, true, 'call a method added with inherit' );
    assert.equal( Warrior.warriorType, 'swordsman', 'access static field on the constructor method' );
    assert.equal( Warrior.getWarriorCastle(), 'camelot', 'access static method on the constructor method' );
    assert.equal( Warrior.totalWarriorCount, 1234, 'es5 get/set should work on statics' );
  } );
} );