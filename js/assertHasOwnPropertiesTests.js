// Copyright 2020, University of Colorado Boulder

/**
 * Tests for assertHasOwnProperties
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import assertHasOwnProperties from './assertHasOwnProperties.js';
import Circle from '../../scenery/js/nodes/Circle.js';
import Node from '../../scenery/js/nodes/Node.js';

QUnit.module( 'assertHasOwnProperties' );

QUnit.test( 'assertHasOwnProperties', assert => {
  assert.ok( true, 'one test whether or not assertions are enabled' );

  if ( window.assert ) {

    class MyObject {
      aFunction() {}

      get getter() {return 'hi'; }
    }

    class MyChild extends MyObject {
      childMethod() {}

      get childGetter() { return 'I am a middle child'; }
    }

    // Should not throw error because options are all from one set.
    assertHasOwnProperties( { a: true, b: false }, [ 'a' ] );
    assertHasOwnProperties( { a: true, b: false }, [ 'a', 'b' ] );
    assertHasOwnProperties( { b: undefined }, [ 'b' ] );
    assertHasOwnProperties( { b: null }, [ 'b' ] );
    assertHasOwnProperties( { get b() { return 5} }, [ 'b' ] );
    assertHasOwnProperties( { b() { } }, [ 'b' ] );
    assertHasOwnProperties( { set b( b ) { } }, [ 'b' ] );
    assertHasOwnProperties( new MyObject(), [ 'aFunction', 'getter' ] );
    assertHasOwnProperties( new MyChild(), [ 'aFunction', 'getter', 'childMethod', 'childGetter' ] );

    // on direct prototype
    assertHasOwnProperties( new Node(), [ 'getOpacity', 'opacity', '_opacity' ] );

    // on ancestor parent prototype
    assertHasOwnProperties( new Circle( 10 ), [ 'getOpacity', 'opacity', '_opacity' ] );

    // Should error because properties are not provided
    assert.throws( () => assertHasOwnProperties( { b: false }, [ 'a' ] ) );
    assert.throws( () => assertHasOwnProperties( {}, [ 'a' ] ) );
    assert.throws( () => assertHasOwnProperties( { ab: 'something' }, [ 'a' ] ) );
    assert.throws( () => assertHasOwnProperties( { a: true, b: false }, [ 'a', 'b', 'c' ] ) );
    assert.throws( () => assertHasOwnProperties( { a: true, c: undefined }, [ 'a', 'b', 'c' ] ) );
  }
} );