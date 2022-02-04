// Copyright 2018-2022, University of Colorado Boulder

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
    static ITEM_1 = new MyEnumeration();
    static ITEM_2 = new MyEnumeration();
    static ITEM_3 = new MyEnumeration();

    static enumeration = new Enumeration( MyEnumeration );
  }

  assert.ok( MyEnumeration.enumeration.keys.length === 3, 'keys all there' );
  assert.ok( MyEnumeration.enumeration.keys.length === 3, 'values all there' );
  assert.ok( MyEnumeration.enumeration === MyEnumeration.ITEM_1.enumeration, 'enumeration instances are the same' );
  assert.ok( MyEnumeration.enumeration === MyEnumeration.ITEM_2.enumeration, 'enumeration instances are the same 2' );
  assert.ok( MyEnumeration.enumeration === MyEnumeration.ITEM_3.enumeration, 'enumeration instances are the same 3' );

} );
