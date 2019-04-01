// Copyright 2019, University of Colorado Boulder

define( require => {
  'use strict';

  // modules
  var merge = require( 'PHET_CORE/merge' );

  QUnit.module( 'merge' );

  // test proper merger for 2 objects
  QUnit.test( 'merge two objects', function( assert ) {
    var original = {
      prop1: 'value1',
      prop2: 'value2',
      subcomponentOptions: {
        subProp1: 'subValue1',
        subProp2: 'subValue2'
      },
      subcomponentOptions2: {
        subSubcomponentOptions: {
          subSubProp1: 'subSubValue1'
        }
      },
      prop3: 'value3'
    };

    var merge1 = {
      subcomponentOptions: {
        subProp1: 'subvalue1 changed',
        subProp3: 'new subvalue'
      },
      subcomponentOptions2: {
        subSubcomponentOptions: {
          subSubProp1: 'all gone now',
          test: 'this is here too'
        }
      },
      prop3: 'new value3',
      prop4: 'value4'
    };
    var preMergeSourceCopy = Object.assign( {}, merge1 );
    var merged = merge( original, merge1 );

    assert.equal( merged.prop1, 'value1', 'merge should not alter target keys that aren\'t in the source' );
    assert.equal( merged.prop4, 'value4', 'merge should not alter source keys that aren\'t in the target' );

    var shouldBe = {
      subProp1: 'subvalue1 changed',
      subProp2: 'subValue2',
      subProp3: 'new subvalue'
    };
    assert.deepEqual( merged.subcomponentOptions, shouldBe, 'merge should combine singly nested objects' );

    shouldBe = {
      prop1: 'value1',
      prop2: 'value2',
      subcomponentOptions: {
        subProp1: 'subvalue1 changed',
        subProp3: 'new subvalue',
        subProp2: 'subValue2'
      },
      subcomponentOptions2: {
        subSubcomponentOptions: {
          subSubProp1: 'all gone now',
          test: 'this is here too'
        }
      },
      prop3: 'new value3',
      prop4: 'value4'
    };
    assert.deepEqual( merged, shouldBe, 'merge should combine arbitrarily nested objects' );
    assert.deepEqual( merge1, preMergeSourceCopy, 'merge should not alter sources' );
  } );

  // test multiple objects
  QUnit.test( 'test multiple objects', function( assert ) {
    var original = {
      prop1: 'value1',
      prop2: 'value2',
      subcomponentOptions: {
        subProp1: 'subValue1',
        subProp2: 'subValue2'
      },
      subcomponentOptions2: {
        subSubcomponentOptions: {
          subSubProp1: 'subSubValue1'
        }
      },
      prop3: 'value3'
    };

    var merge1 = {
      subcomponentOptions: {
        subProp1: 'subvalue1 changed',
        subProp3: 'new subvalue',
        except: 'me'
      },
      subcomponentOptions2: {
        subSubcomponentOptions: {
          subSubProp1: 'all gone now',
          test: 'this is here too'
        }
      },
      prop3: 'new value3',
      prop4: 'value4'
    };

    var merge2 = {
      prop5: 'value5',
      subcomponentOptions: {
        subProp1: 'everything',
        subProp2: 'here is',
        subProp3: 'from',
        subProp4: 'merge2'
      }
    };

    var merge3 = {
      prop6: 'value6',
      prop5: 'value5 from merge3',
      subcomponentOptions: {
        subProp5: 'BONJOUR'
      },
      subcomponentOptions2: {
        test2: [ 'test2', 'test3' ],
        subSubcomponentOptions: {
          test: 'test form merge3',
          subSubProp1: 'subSub from merge3'
        }
      }
    };
    var merge1Copy = _.cloneDeep( merge1 );
    var merge2Copy = _.cloneDeep( merge2 );
    var merge3Copy = _.cloneDeep( merge3 );

    var merged = merge( original, merge1, merge2, merge3 );

    var expected = {
      prop1: 'value1',
      prop2: 'value2',
      subcomponentOptions: {
        subProp1: 'everything',
        subProp2: 'here is',
        subProp3: 'from',
        subProp4: 'merge2',
        except: 'me',
        subProp5: 'BONJOUR'
      },
      subcomponentOptions2: {
        test2: [ 'test2', 'test3' ],
        subSubcomponentOptions: {
          test: 'test form merge3',
          subSubProp1: 'subSub from merge3'
        }
      },
      prop3: 'new value3',
      prop4: 'value4',
      prop5: 'value5 from merge3',
      prop6: 'value6'
    };
    assert.notEqual( merged, expected, 'sanity check: ensure merged and expected objects are not the same reference' );
    assert.deepEqual( merged, expected, 'merge should properly combine multiple objects' );
    assert.deepEqual( merge1, merge1Copy, 'merge should not alter source objects' );
    assert.deepEqual( merge2, merge2Copy, 'merge should not alter source objects' );
    assert.deepEqual( merge3, merge3Copy, 'merge should not alter source objects' );
  } );

  // check that it errors loudly if something other than an object is used
  QUnit.test( 'check for proper assertion errors', function( assert ) {
    var original = {
      subOptions: {
        test: 'val',
        test2: 'val2'
      }
    };

    function TestClass() {
      this.test = 'class';
    }

    var merges = {
      a: {
        subOptions: [ 'val', 'val2' ]
      },
      b: {
        subOptions: Object.create( { test: 'a', test1: 3 } )
      },
      c: {
        subOptions: 'a string to test'
      },
      d: {
        subOptions: 42
      },
      e: {
        subOptions: function() { this.a = 42; }
      },
      f: {
        subOptions: new TestClass()
      }
    };

    var getterMerge = {
      get subOptions() {
        return {
          test: 'should not work'
        };
      }
    };

    if ( window.assert ) {
      assert.throws( function() { merge( original, merges.a ); }, 'merge should not allow arrays to be merged' );
      assert.throws( function() { merge( original, merges.b ); }, 'merge should not allow inherited objects to be merged' );
      assert.throws( function() { merge( original, merges.f ); }, 'merge should not allow instances to be merged' );
      assert.throws( function() { merge( original, merges.c ); }, 'merge should not allow strings to be merged' );
      assert.throws( function() { merge( original, merges.d ); }, 'merge should not allow numbers to be merged' );
      assert.throws( function() { merge( original, merges.e ); }, 'merge should not allow functions to be merged' );
      assert.throws( function() { merge( original, getterMerge ); }, 'merge should not work with getters' );
    }
    assert.equal( 1, 1, 'for no ?ea query param' );
  } );

  QUnit.test( 'check for reference level equality (e.g. for object literals, Properties, Enumerations)', function( assert ) {
    var testEnum = {
      A: {
        testA: 'valueA'
      },
      B: {
        testB: 'valueB'
      },
      C: {
        testC: 'valueC'
      }
    };
    var testProperty = {};
    var testProperty2 = {};
    testProperty.value = 42;
    testProperty2.value = 'forty two';
    var original = {
      prop: testProperty,
      nestedOptions: {
        needsAnEnum: testEnum.A,
        moreOptions: {
          needsAnEnum: testEnum.C
        }
      }
    };
    var merger = {
      prop: testProperty2,
      nestedOptions: {
        needsAnEnum: testEnum.B,
        moreOptions: {
          needsDifferentEnum: testEnum.A
        }
      }
    };
    var originalCopy = _.cloneDeep( original );
    var mergedFresh = merge( {}, original, merger );
    assert.equal( original.prop.value, originalCopy.prop.value, 'merge should not alter source objects' );
    assert.equal( mergedFresh.nestedOptions.needsAnEnum, testEnum.B, 'merge should preserve references to overwritten object literals' );
    assert.equal( mergedFresh.nestedOptions.moreOptions.needsAnEnum, testEnum.C, 'merge should preserve object literals from target' );
    assert.equal( mergedFresh.nestedOptions.moreOptions.needsDifferentEnum, testEnum.A, 'merge should preserve object literals from source' );
    mergedFresh.prop.value = 'forty three';
    assert.equal( testProperty2.value, 'forty three', 'merge should pass object literal references' );
    assert.equal( testProperty.value, 42, 'original object literal should be overwritten' );

    var merged = merge( original, merger );
    assert.equal( merged.nestedOptions.needsAnEnum, testEnum.B, 'merge should preserve overwritten Enumeration types' );
    assert.equal( merged.nestedOptions.moreOptions.needsAnEnum, testEnum.C, 'merge should preserve Enumeration types from target' );
    assert.equal( merged.nestedOptions.moreOptions.needsDifferentEnum, testEnum.A, 'merge should preserve Enumeration types from source' );
  } );

  QUnit.test( 'try a horribly nested case', function( assert ) {
    var original = {
      p1Options: { n1Options: { n2Options: { n3Options: { n4Options: { n5: 'overwrite me' } } } } },
      p2Options: {
        n1Options: {
          p3: 'keep me'
        }
      }
    };
    var merge1 = {
      p1Options: { n1Options: { n2Options: { n3Options: { n4Options: { n5: 'overwritten' } } } } },
      p2Options: {
        n1Options: {
          p4: 'p3 kept',
          n2Options: { n3Options: { n4Options: { n5Options: { n6Options: { p5: 'never make options like this' } } } } }
        }
      }
    };

    var merged = merge( original, merge1 );
    var expected = {
      p1Options: { n1Options: { n2Options: { n3Options: { n4Options: { n5: 'overwritten' } } } } },
      p2Options: {
        n1Options: {
          p3: 'keep me',
          p4: 'p3 kept',
          n2Options: { n3Options: { n4Options: { n5Options: { n6Options: { p5: 'never make options like this' } } } } }
        }
      }
    };
    assert.deepEqual( merged, expected, 'merge should handle some deeply nested stuff' );
  } );

  // QUnit.test( 'minor change', assert => {
  //   const a = {
  //     sliderOptions: {
  //       hello: 'there'
  //     }
  //   };
  //   const b = {
  //     sliderOptions: {
  //       time: 'now'
  //     }
  //   };
  //   merge( {}, a, b );
  //   assert.ok( !a.sliderOptions.hasOwnProperty( 'time' ), 'time shouldnt leak over to a' );
  // } );
} );