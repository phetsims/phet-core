// Copyright 2022, University of Colorado Boulder

/**
 * Tests for Enumeration, EnumerationValue
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import Enumeration from './Enumeration.js';
import EnumerationValue from './EnumerationValue.js';

QUnit.module( 'Enumeration' );

QUnit.test( 'Enumeration', assert => {

  class MyEnumeration extends EnumerationValue {
    public static readonly ITEM_1 = new MyEnumeration();
    public static readonly ITEM_2 = new MyEnumeration();
    public static readonly ITEM_3 = new MyEnumeration();

    public static readonly enumeration = new Enumeration( MyEnumeration );
  }

  assert.ok( MyEnumeration.enumeration.keys.length === 3, 'keys all there' );
  assert.ok( MyEnumeration.enumeration.values.length === 3, 'values all there' );
  assert.ok( MyEnumeration.enumeration === MyEnumeration.ITEM_1.enumeration, 'enumeration instances are the same' );
  assert.ok( MyEnumeration.enumeration === MyEnumeration.ITEM_2.enumeration, 'enumeration instances are the same 2' );
  assert.ok( MyEnumeration.enumeration === MyEnumeration.ITEM_3.enumeration, 'enumeration instances are the same 3' );

  window.assert && assert.throws( () => {
    return new MyEnumeration();
  }, 'cannot create new instances after class is defined and sealed' );
} );

QUnit.test( 'Enumeration Subtyping', assert => {

  class MyEnumeration extends EnumerationValue {
    public static readonly ITEM_1 = new MyEnumeration();
    public static readonly ITEM_2 = new MyEnumeration();
    public static readonly ITEM_3 = new MyEnumeration();

    public static readonly enumeration = new Enumeration( MyEnumeration );
  }

  class MySubEnumeration extends MyEnumeration {
    public static readonly ITEM_4 = new MySubEnumeration();

    public static override readonly enumeration = new Enumeration( MySubEnumeration, {
      instanceType: MyEnumeration
    } );
  }

  assert.ok( MySubEnumeration.enumeration.keys.length === 4, 'keys all there' );
  assert.ok( MySubEnumeration.enumeration.values.length === 4, 'values all there' );
  assert.ok( MyEnumeration.enumeration === MySubEnumeration.ITEM_1.enumeration, 'enumeration instances from parent' );
  assert.ok( MyEnumeration.enumeration === MySubEnumeration.ITEM_2.enumeration, 'enumeration instances from parent 2' );
  assert.ok( MyEnumeration.enumeration === MySubEnumeration.ITEM_3.enumeration, 'enumeration instances from parent 3' );
  assert.ok( MySubEnumeration.enumeration !== MySubEnumeration.ITEM_1.enumeration, 'enumeration instances not from child' );
  assert.ok( MySubEnumeration.enumeration !== MySubEnumeration.ITEM_2.enumeration, 'enumeration instances not from child 2' );

  // @ts-expect-error INTENTIONAL - we know this doesn't exist, but still want the runtime check
  assert.ok( !MyEnumeration.ITEM_4, 'super should not have sub item' );
} );
