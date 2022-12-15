// Copyright 2019-2022, University of Colorado Boulder


import Property from '../../axon/js/Property.js';
import EnumerationDeprecated from './EnumerationDeprecated.js';
import merge from './merge.js';
import IntentionalAny from './types/IntentionalAny.js';

QUnit.module( 'merge' );

// test proper merger for 2 objects
QUnit.test( 'merge two objects', assert => {
  const original = {
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

  const merge1 = {
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
  const preMergeSourceCopy = Object.assign( {}, merge1 );
  const merged = merge( original, merge1 );

  assert.equal( merged.prop1, 'value1', 'merge should not alter target keys that aren\'t in the source' );
  assert.equal( merged.prop4, 'value4', 'merge should not alter source keys that aren\'t in the target' );

  let shouldBe: IntentionalAny = {
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
QUnit.test( 'test multiple objects', assert => {
  const original = {
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

  const merge1 = {
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

  const merge2 = {
    prop5: 'value5',
    subcomponentOptions: {
      subProp1: 'everything',
      subProp2: 'here is',
      subProp3: 'from',
      subProp4: 'merge2'
    }
  };

  const merge3 = {
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
  const merge1Copy = _.cloneDeep( merge1 );
  const merge2Copy = _.cloneDeep( merge2 );
  const merge3Copy = _.cloneDeep( merge3 );

  Object.freeze( merge1 );
  Object.freeze( merge2 );
  Object.freeze( merge3 );
  const merged = merge( original, merge1, merge2, merge3 );

  const expected = {
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
QUnit.test( 'check for proper assertion errors', assert => {
  const original = {
    subOptions: {
      test: 'val',
      test2: 'val2'
    }
  };

  const TestClass = class {
    private test: string;

    public constructor() {
      this.test = 'class';
    }
  };

  const merges = {
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
      // @ts-expect-error
      subOptions: function() { this.a = 42; }
    },
    f: {
      subOptions: new TestClass()
    }
  };

  const getterMerge = {
    get subOptions() {
      return {
        test: 'should not work'
      };
    }
  };

  if ( window.assert ) {
    assert.throws( () => merge( original, merges.a ), 'merge should not allow arrays to be merged' );
    assert.throws( () => merge( original, merges.b ), 'merge should not allow inherited objects to be merged' );
    assert.throws( () => merge( original, merges.f ), 'merge should not allow instances to be merged' );
    assert.throws( () => merge( original, merges.c ), 'merge should not allow strings to be merged' );
    assert.throws( () => merge( original, merges.d ), 'merge should not allow numbers to be merged' );
    assert.throws( () => merge( original, merges.e ), 'merge should not allow functions to be merged' );
    assert.throws( () => merge( original, getterMerge ), 'merge should not work with getters' );

    // @ts-expect-error INTENTIONAL
    assert.throws( () => merge( original ), 'merge should not work without a source' );
  }
  assert.equal( 1, 1, 'for no ?ea query param' );
} );

QUnit.test( 'check for reference level equality (e.g. for object literals, Properties, Enumerations)', assert => {
  const testEnum = {
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

  type Valueable = { value: number | string };
  const testProperty: Valueable = { value: 42 };
  const testProperty2: Valueable = { value: 'forty two' };
  const original = {
    prop: testProperty,
    nestedOptions: {
      needsAnEnum: testEnum.A,
      moreOptions: {
        needsAnEnum: testEnum.C
      }
    }
  };
  const merger = {
    prop: testProperty2,
    nestedOptions: {
      needsAnEnum: testEnum.B,
      moreOptions: {
        needsDifferentEnum: testEnum.A
      }
    }
  };
  const originalCopy = _.cloneDeep( original );
  Object.freeze( original );
  const mergedFresh = merge( {}, original, merger );
  assert.equal( original.prop.value, originalCopy.prop.value, 'merge should not alter source object values' );
  assert.ok( _.isEqual( original, originalCopy ), 'merge should not alter source objects' );
  assert.equal( mergedFresh.nestedOptions.needsAnEnum, testEnum.B, 'merge should preserve references to overwritten object literals' );
  assert.equal( mergedFresh.nestedOptions.moreOptions.needsAnEnum, testEnum.C, 'merge should preserve object literals from target' );
  assert.equal( mergedFresh.nestedOptions.moreOptions.needsDifferentEnum, testEnum.A, 'merge should preserve object literals from source' );
  mergedFresh.prop.value = 'forty three';
  assert.equal( testProperty2.value, 'forty three', 'merge should pass object literal references' );
  assert.equal( testProperty.value, 42, 'original object literal should be overwritten' );

  const merged = merge( {}, original, merger );
  assert.ok( merged.nestedOptions.needsAnEnum === testEnum.B, 'merge should preserve overwritten EnumerationDeprecated types' );
  assert.ok( merged.nestedOptions.moreOptions.needsAnEnum === testEnum.C, 'merge should preserve EnumerationDeprecated types from target' );
  assert.ok( merged.nestedOptions.moreOptions.needsDifferentEnum === testEnum.A, 'merge should preserve EnumerationDeprecated types from source' );
} );

QUnit.test( 'try a horribly nested case', assert => {
  const original = {
    p1Options: { n1Options: { n2Options: { n3Options: { n4Options: { n5: 'overwrite me' } } } } },
    p2Options: {
      n1Options: {
        p3: 'keep me'
      }
    }
  };
  const merge1 = {
    p1Options: {
      n1Options: {
        n2Options: {
          n3Options: {
            n4Options: {
              n5: 'overwritten'
            }
          }
        }
      }
    },
    p2Options: {
      n1Options: {
        p4: 'p3 kept',
        n2Options: {
          n3Options: {
            n4Options: {
              n5Options: {
                n6Options: {
                  p5: 'never make options like this'
                }
              }
            }
          }
        }
      }
    }
  };

  Object.freeze( merge1 );
  const merged = merge( original, merge1 );
  const expected = {
    p1Options: {
      n1Options: {
        n2Options: {
          n3Options: {
            n4Options: {
              n5: 'overwritten'
            }
          }
        }
      }
    },
    p2Options: {
      n1Options: {
        p3: 'keep me',
        p4: 'p3 kept',
        n2Options: {
          n3Options: {
            n4Options: {
              n5Options: {
                n6Options: {
                  p5: 'never make options like this'
                }
              }
            }
          }
        }
      }
    }
  };
  assert.deepEqual( merged, expected, 'merge should handle some deeply nested stuff' );
} );

QUnit.test( 'minor change', assert => {
  const a = {
    sliderOptions: {
      hello: 'there'
    }
  };
  const b = {
    sliderOptions: {
      time: 'now'
    }
  };
  merge( {}, a, b );
  assert.ok( !a.sliderOptions.hasOwnProperty( 'time' ), 'time shouldnt leak over to a' );
} );

QUnit.test( 'test wrong args', assert => {
  if ( window.assert ) {

    // in first arg
    assert.throws( () => merge( undefined, {} ), 'unsupported first arg "undefined"' );
    assert.throws( () => merge( null, {} ), 'unsupported arg "null"' );
    assert.throws( () => merge( true, {} ), 'unsupported arg "boolean"' );
    assert.throws( () => merge( 'hello', {} ), 'unsupported arg "string"' );
    assert.throws( () => merge( 4, {} ), 'unsupported arg "number"' );
    assert.throws( () => merge( Image, {} ), 'unsupported arg of Object with extra prototype' );
    assert.throws( () => merge( { get hi() { return 3; } }, {} ), 'unsupported arg with getter' );
    assert.throws( () => merge( { set hi( stuff: number ) { /* noop */} }, {} ), 'unsupported arg with setter' );

    // in second arg
    assert.throws( () => merge( {}, true, {} ), 'unsupported second arg "boolean"' );
    assert.throws( () => merge( {}, 'hello', {} ), 'unsupported second arg "string"' );
    assert.throws( () => merge( {}, 4, {} ), 'unsupported second arg "number"' );
    assert.throws( () => merge( {}, Image, {} ), 'unsupported second arg of Object with extra prototype' );
    assert.throws( () => merge( {}, { get hi() { return 3; } }, {} ), 'unsupported second arg with getter' );
    assert.throws( () => merge( {}, { set hi( stuff: number ) {/* noop */} }, {} ), 'unsupported second arg with setter' );

    // in second arg with no third object
    assert.throws( () => merge( {}, true ), 'unsupported second arg with no third "boolean"' );
    assert.throws( () => merge( {}, 'hello' ), 'unsupported second arg with no third "string"' );
    assert.throws( () => merge( {}, 4 ), 'unsupported second arg with no third "number"' );
    assert.throws( () => merge( {}, Image ), 'unsupported second arg with no third of Object with extra prototype' );
    assert.throws( () => merge( {}, { get hi() { return 3; } } ), 'unsupported second arg with no third with getter' );
    assert.throws( () => merge( {}, { set hi( stuff: number ) {/* noop */} } ), 'unsupported second arg with no third with getter' );

    // in some options
    assert.throws( () => merge( {}, { someOptions: true }, {} ), 'unsupported arg in options "boolean"' );
    assert.throws( () => merge( {}, { someOptions: 'hello' }, {} ), 'unsupported arg in options "string"' );
    assert.throws( () => merge( {}, { someOptions: 4 }, {} ), 'unsupported arg in options "number"' );
    assert.throws( () => merge( {}, { someOptions: Image }, {} ), 'unsupported arg in options of Object with extra prototype' );
    assert.throws( () => merge( {}, { someOptions: { get hi() { return 3; } } }, {} ), 'unsupported arg in options with getter' );
    assert.throws( () => merge( {}, { someOptions: { set hi( stuff: number ) {/* noop */} } }, {} ), 'unsupported arg in options with getter' );
  }
  else {
    assert.ok( true, 'no assertions enabled' );
  }

  // allowed cases that should not error
  merge( {}, null, {} );
  merge( {}, null );
  merge( {}, {}, null );
  merge( { xOptions: { test: 1 } }, { xOptions: null } );
  merge( {}, { someOptions: null }, {} );
  merge( {}, { someOptions: undefined }, {} );
} );

QUnit.test( 'do not recurse for non *Options', assert => {

  const testFirstProperty = new Property( 'hi' );
  const testSecondProperty = new Property( 'hi2' );
  const TestEnumeration = EnumerationDeprecated.byKeys( [ 'ONE', 'TWO' ] );
  const TestEnumeration2 = EnumerationDeprecated.byKeys( [ 'ONE1', 'TWO2' ] );
  const original = {
    prop: testFirstProperty,
    enum: TestEnumeration,
    someOptions: { nestedProp: testFirstProperty }
  };

  let newObject = merge( {}, original );
  assert.ok( _.isEqual( original, newObject ), 'should be equal from reference equality' );
  assert.ok( original.prop === newObject.prop, 'same Property' );
  assert.ok( original.enum === newObject.enum, 'same EnumerationDeprecated' );

  // test defaults with other non mergeable objects
  newObject = merge( {
    prop: testSecondProperty,
    enum: TestEnumeration2,
    someOptions: { nestedProp: testSecondProperty }
  }, original );
  assert.ok( _.isEqual( original, newObject ), 'should be equal' );
  assert.ok( original.prop === newObject.prop, 'same Property, ignore default' );
  assert.ok( original.enum === newObject.enum, 'same EnumerationDeprecated, ignore default' );
} );

QUnit.test( 'support optional options', assert => {

  const mergeXYZ = ( options?: Record<string, unknown> ) => {
    return merge( {
      x: 1,
      y: 2,
      z: 3
    }, options );
  };
  const noOptions = mergeXYZ();
  assert.ok( noOptions.x === 1, 'x property should be merged from default' );
  assert.ok( noOptions.y === 2, 'y property should be merged from default' );
  assert.ok( noOptions.z === 3, 'z property should be merged from default' );

  const testNestedFunctionCallOptions = ( options?: Record<string, unknown> ) => {
    return mergeXYZ( merge( {
      x: 2,
      g: 54,
      treeSays: 'hello'
    }, options ) );
  };

  const noOptions2 = testNestedFunctionCallOptions();
  assert.ok( noOptions2.x === 2, 'x property should be merged from default' );
  assert.ok( noOptions2.y === 2, 'y property should be merged from default' );
  assert.ok( noOptions2.z === 3, 'z property should be merged from default' );

  assert.ok( noOptions2.g === 54, 'g property should be merged from default' );
  assert.ok( noOptions2.treeSays === 'hello', 'property should be merged from default' );
} );

QUnit.test( 'does not support deep equals on keyname of "Options"', assert => {

  const referenceObject = {
    hello: 2
  };

  const merged = merge( {}, {
    Options: referenceObject
  } );

  const deepMerged = merge( {}, {
    someOptions: referenceObject
  } );

  assert.ok( merged.Options === referenceObject, '"Options" should not deep equal' );
  referenceObject.hello = 3;
  assert.ok( merged.Options.hello === 3, 'value should change because it is a reference' );
  assert.ok( deepMerged.someOptions.hello === 2, 'value should not change because it was deep copied' );
} );