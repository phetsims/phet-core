// Copyright 2015-2023, University of Colorado Boulder

/**
 * Object pooling mixin, for cases where creating new objects is expensive, and we'd rather mark some objects as able
 * to be reused (i.e. 'in the pool'). This provides a pool of objects for each type it is invoked on. It allows for
 * getting "new" objects that can either be constructed OR pulled in from a pool, and requires that the objects are
 * essentially able to "re-run" the constructor. Then when putting the object back in the pool, references should be
 * released, so memory isn't leaked.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import Constructor from './types/Constructor.js';
import extend from './extend.js';
import phetCore from './phetCore.js';
import optionize from './optionize.js';
import IntentionalAny from './types/IntentionalAny.js';

type PoolableOptions<Type extends Constructor> = {
  // If an object needs to be created without a direct call (say, to fill the pool initially), these are the arguments
  // that will be passed into the constructor
  defaultArguments?: ConstructorParameters<Type>;

  // The function to call on the objects to reinitialize them (that is either the constructor, or acts like the
  // constructor).
  initialize?: PoolableInitializer<Type>;

  // A limit for the pool size (so we don't leak memory by growing the pool faster than we take things from it). Can be
  // customized by setting Type.maxPoolSize
  maxSize?: number;

  // The initial size of the pool. To fill it, objects will be created with the default arguments.
  initialSize?: number;

  // If true, when constructing the default arguments will always be used (and then initialized with the initializer)
  // instead of just providing the arguments straight to the constructor.
  useDefaultConstruction?: boolean;
};
type PoolableInstance = {
  freeToPool(): void;
};
type PoolableVersion<Type extends Constructor> = InstanceType<Type> & PoolableInstance;
type PoolableInitializer<Type extends Constructor> = ( ...args: ConstructorParameters<Type> ) => IntentionalAny;
type PoolableClass<Type extends Constructor> = ( new ( ...args: ConstructorParameters<Type> ) => ( PoolableVersion<Type> ) ) & PoolableType<Type>;
type PoolableExistingStatics<Type extends Constructor> = {
  // We grab the static values of a type
  [ Property in keyof Type ]: Type[ Property ]
};
type PoolableType<Type extends Constructor> = {
  pool: PoolableVersion<Type>[];
  dirtyFromPool(): PoolableVersion<Type>;
  createFromPool( ...args: ConstructorParameters<Type> ): PoolableVersion<Type>;
  get poolSize(): number;
  set maxPoolSize( value: number );
  get maxPoolSize(): number;
} & PoolableExistingStatics<Type>;

/**
 * @deprecated - Please use Pool.ts instead as the new pooling pattern.
 */
const Poolable = {
  /**
   * Changes the given type (and its prototype) to support object pooling.
   */
  mixInto<Type extends Constructor>( type: Type, providedOptions?: PoolableOptions<Type> ) : PoolableClass<Type> {
    const options = optionize<PoolableOptions<Type>, PoolableOptions<Type>>()( {

      defaultArguments: [] as unknown as ConstructorParameters<Type>,
      initialize: type.prototype.initialize,
      maxSize: 100,
      initialSize: 0,
      useDefaultConstruction: false
    }, providedOptions ) as Required<PoolableOptions<Type>>;

    assert && assert( options.maxSize >= 0 );
    assert && assert( options.initialSize >= 0 );

    // The actual array we store things in. Always push/pop.
    const pool: InstanceType<Type>[] = [];

    let maxPoolSize = options.maxSize;

    // There is a madness to this craziness. We'd want to use the method noted at
    // https://stackoverflow.com/questions/1606797/use-of-apply-with-new-operator-is-this-possible, but the type is
    // not provided in the arguments array below. By calling bind on itself, we're able to get a version of bind that
    // inserts the constructor as the first argument of the .apply called later so we don't create garbage by having
    // to pack `arguments` into an array AND THEN concatenate it with a new first element (the type itself).
    const partialConstructor = Function.prototype.bind.bind( type, type );

    // Basically our type constructor, but with the default arguments included already.
    const DefaultConstructor = partialConstructor( ...options.defaultArguments );

    const initialize = options.initialize;
    const useDefaultConstruction = options.useDefaultConstruction;

    const proto = type.prototype;

    extend( type, {
      /**
       * This should not be modified externally. In the future if desired, functions could be added to help
       * adding/removing poolable instances manually.
       */
      pool: pool,

      /**
       * Returns an object with arbitrary state (possibly constructed with the default arguments).
       */
      dirtyFromPool(): PoolableVersion<Type> {
        return pool.length ? pool.pop() : new DefaultConstructor();
      },

      /**
       * Returns an object that behaves as if it was constructed with the given arguments. May result in a new object
       * being created (if the pool is empty), or it may use the constructor to mutate an object from the pool.
       */
      createFromPool( ...args: ConstructorParameters<Type> ): PoolableVersion<Type> {
        let result;

        if ( pool.length ) {
          result = pool.pop();
          initialize.apply( result, args );
        }
        else if ( useDefaultConstruction ) {
          result = new DefaultConstructor();
          initialize.apply( result, args );
        }
        else {
          result = new ( partialConstructor( ...args ) )();
        }

        return result;
      },

      /**
       * Returns the current size of the pool.
       */
      get poolSize(): number {
        return pool.length;
      },

      /**
       * Sets the maximum pool size.
       */
      set maxPoolSize( value: number ) {
        assert && assert( value === Number.POSITIVE_INFINITY || ( Number.isInteger( value ) && value >= 0 ), 'maxPoolSize should be a non-negative integer or infinity' );

        maxPoolSize = value;
      },

      /**
       * Returns the maximum pool size.
       */
      get maxPoolSize(): number {
        return maxPoolSize;
      }
    } );

    extend( proto, {
      /**
       * Adds this object into the pool, so that it can be reused elsewhere. Generally when this is done, no other
       * references to the object should be held (since they should not be used at all).
       */
      freeToPool() {
        if ( pool.length < maxPoolSize ) {
          pool.push( this );
        }
      }
    } );

    // Initialize the pool (if it should have objects)
    while ( pool.length < options.initialSize ) {
      pool.push( new DefaultConstructor() );
    }

    return type as unknown as PoolableClass<Type>;
  }
};

phetCore.register( 'Poolable', Poolable );

export default Poolable;
export type { PoolableOptions, PoolableInstance, PoolableVersion, PoolableInitializer, PoolableClass, PoolableType };
