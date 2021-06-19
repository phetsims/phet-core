// Copyright 2020-2021, University of Colorado Boulder

/**
 * Tests for assertHasProperties
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import assertHasProperties from './assertHasProperties.js';

QUnit.module( 'assertHasProperties' );

QUnit.test( 'assertHasProperties', assert => {
  assert.ok( true, 'one test whether or not assertions are enabled' );

  if ( window.assert ) {

    class MyObject {

      // @public
      aFunction() {}

      get getter() {return 'hi'; }
    }

    class MyChild extends MyObject {

      // @public
      childMethod() {}

      get childGetter() { return 'I am a middle child'; }
    }

    // Should not throw error because options are all from one set.
    assertHasProperties( { a: true, b: false }, [ 'a' ] );
    assertHasProperties( { a: true, b: false }, [ 'a', 'b' ] );
    assertHasProperties( { b: undefined }, [ 'b' ] );
    assertHasProperties( { b: null }, [ 'b' ] );
    assertHasProperties( { get b() { return 5; } }, [ 'b' ] );
    assertHasProperties( { b() { } }, [ 'b' ] );
    assertHasProperties( { set b( b ) { } }, [ 'b' ] );
    assertHasProperties( new MyObject(), [ 'aFunction', 'getter' ] );
    assertHasProperties( new MyChild(), [ 'aFunction', 'getter', 'childMethod', 'childGetter' ] );

    // Simulate scenery Node style types
    class Parent {
      constructor() {
        this.opacityProperty = {};
      }

      // @public
      getOpacity() {return 0;}

      // @public
      get opacity() { return 0;}
    }

    class Circle extends Parent {}

    // on direct prototype
    assertHasProperties( new Parent(), [ 'getOpacity', 'opacity', 'opacityProperty' ] );

    // on ancestor parent prototype
    assertHasProperties( new Circle(), [ 'getOpacity', 'opacity', 'opacityProperty' ] );

    // Should error because properties are not provided
    assert.throws( () => assertHasProperties( { b: false }, [ 'a' ] ) );
    assert.throws( () => assertHasProperties( {}, [ 'a' ] ) );
    assert.throws( () => assertHasProperties( { ab: 'something' }, [ 'a' ] ) );
    assert.throws( () => assertHasProperties( { a: true, b: false }, [ 'a', 'b', 'c' ] ) );
    assert.throws( () => assertHasProperties( { a: true, c: undefined }, [ 'a', 'b', 'c' ] ) );
  }
} );