// Copyright 2022, University of Colorado Boulder

/**
 * PROTOTYPE version for better support
 *
 * Object pooling mixin, for cases where creating new objects is expensive, and we'd rather mark some objects as able
 * to be reused (i.e. 'in the pool'). This provides a pool of objects for each type it is invoked on. It allows for
 * getting "new" objects that can either be constructed OR pulled in from a pool, and requires that the objects are
 * essentially able to "re-run" the constructor. Then when putting the object back in the pool, references should be
 * released, so memory isn't leaked.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import Constructor from './types/Constructor.js';
import phetCore from './phetCore.js';
import optionize from './optionize.js';
import IntentionalAny from './IntentionalAny.js';

type AnyArguments = IntentionalAny[];
type PoolableOptions<ResultConstructorParameters extends AnyArguments, ResultType> = {
  // If an object needs to be created without a direct call (say, to fill the pool initially), these are the arguments
  // that will be passed into the constructor
  defaultArguments?: ResultConstructorParameters,

  // The function to call on the objects to reinitialize them (that is either the constructor, or acts like the
  // constructor).
  initialize?: PoolableInitializer<ResultConstructorParameters, ResultType>,

  // A limit for the pool size (so we don't leak memory by growing the pool faster than we take things from it). Can be
  // customized by setting Type.maxPoolSize
  maxSize?: number,

  // The initial size of the pool. To fill it, objects will be created with the default arguments.
  initialSize?: number,

  // If true, when constructing the default arguments will always be used (and then initialized with the initializer)
  // instead of just providing the arguments straight to the constructor.
  useDefaultConstruction?: boolean
};
interface PoolableInstance {
  freeToPool(): void
}
type PoolableVersion<Type extends Constructor> = InstanceType<Type> & PoolableInstance;
type PoolableInitializer<ResultConstructorParameters extends AnyArguments, ResultType> = ( ...args: ResultConstructorParameters ) => ResultType;
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

const Poolable2 = <ResultConstructorParameters extends AnyArguments, ResultType>( type: Constructor ) => {

  // The actual array we store things in. Always push/pop.
  const pool: ResultType[] = [];

  // These will be initialized with initializePool
  let maxPoolSize: number;
  let partialConstructor: ( ...args: IntentionalAny[] ) => IntentionalAny;
  let DefaultConstructor: IntentionalAny;
  let initialize: PoolableInitializer<ResultConstructorParameters, ResultType>;
  let useDefaultConstruction: boolean;

  const poolableClass = class extends type {

    static initializePool( providedOptions?: PoolableOptions<ResultConstructorParameters, ResultType> ) {
      const options = optionize<PoolableOptions<ResultConstructorParameters, ResultType>, PoolableOptions<ResultConstructorParameters, ResultType>>( {

        defaultArguments: [] as unknown as ResultConstructorParameters,
        initialize: ( this.prototype as unknown as { initialize: PoolableInitializer<ResultConstructorParameters, ResultType> } ).initialize,
        maxSize: 100,
        initialSize: 0,
        useDefaultConstruction: false
      }, providedOptions );

      assert && assert( options.maxSize >= 0 );
      assert && assert( options.initialSize >= 0 );

      maxPoolSize = options.maxSize;

      // There is a madness to this craziness. We'd want to use the method noted at
      // https://stackoverflow.com/questions/1606797/use-of-apply-with-new-operator-is-this-possible, but the type is
      // not provided in the arguments array below. By calling bind on itself, we're able to get a version of bind that
      // inserts the constructor as the first argument of the .apply called later so we don't create garbage by having
      // to pack `arguments` into an array AND THEN concatenate it with a new first element (the type itself).
      partialConstructor = Function.prototype.bind.bind( this, this );

      // Basically our type constructor, but with the default arguments included already.
      DefaultConstructor = partialConstructor( ...options.defaultArguments! );

      initialize = options.initialize;
      useDefaultConstruction = options.useDefaultConstruction;

      // Initialize the pool (if it should have objects)
      while ( pool.length < options.initialSize ) {
        pool.push( new DefaultConstructor() );
      }
    }

    /**
     * This should not be modified externally. In the future if desired, functions could be added to help
     * adding/removing poolable instances manually.
     */
    static pool: ResultType[] = pool;

    /**
     * Returns an object with arbitrary state (possibly constructed with the default arguments).
     */
    static dirtyFromPool(): ResultType {
      return pool.length ? pool.pop() : new DefaultConstructor();
    }

    /**
     * Returns an object that behaves as if it was constructed with the given arguments. May result in a new object
     * being created (if the pool is empty), or it may use the constructor to mutate an object from the pool.
     */
    static createFromPool( ...args: ResultConstructorParameters ): ResultType {
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
    }

    /**
     * Returns the current size of the pool.
     */
    static get poolSize(): number {
      return pool.length;
    }

    /**
     * Sets the maximum pool size.
     */
    static set maxPoolSize( value: number ) {
      assert && assert( value === Number.POSITIVE_INFINITY || ( Number.isInteger( value ) && value >= 0 ), 'maxPoolSize should be a non-negative integer or infinity' );

      maxPoolSize = value;
    }

    /**
     * Returns the maximum pool size.
     */
    static get maxPoolSize(): number {
      return maxPoolSize;
    }

    /**
     * Adds this object into the pool, so that it can be reused elsewhere. Generally when this is done, no other
     * references to the object should be held (since they should not be used at all).
     */
    freeToPool() {
      if ( pool.length < maxPoolSize ) {
        pool.push( this as unknown as ResultType );
      }
    }
  };

  return poolableClass;
};

phetCore.register( 'Poolable2', Poolable2 );

export default Poolable2;
export type { PoolableOptions, PoolableInstance, PoolableVersion, PoolableInitializer, PoolableClass, PoolableType };
