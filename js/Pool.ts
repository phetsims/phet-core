// Copyright 2022-2023, University of Colorado Boulder

/**
 * PROTOTYPE version for better support
 *
 * Object pooling mixin, for cases where creating new objects is expensive, and we'd rather mark some objects as able
 * to be reused (i.e. 'in the pool'). This provides a pool of objects for each type it is invoked on. It allows for
 * getting "new" objects that can either be constructed OR pulled in from a pool, and requires that the objects are
 * essentially able to "re-run" the constructor. Then when putting the object back in the pool, references should be
 * released, so memory isn't leaked.
 *
 * With this style of pooling, the following should be standard boilerplate within the class:

  public freeToPool(): void {
    MyType.pool.freeToPool( this );
  }

  public static readonly pool = new Pool( MyType );

 * and can additionally implement TPoolable to make it clear that the type is pooled
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import Constructor from './types/Constructor.js';
import phetCore from './phetCore.js';
import optionize from './optionize.js';
import IntentionalAny from './types/IntentionalAny.js';

export type SelfPoolableOptions<T extends Constructor> = {
  // If an object needs to be created without a direct call (say, to fill the pool initially), these are the arguments
  // that will be passed into the constructor
  defaultArguments?: ConstructorParameters<T>;

  // The function to call on the objects to reinitialize them (that is either the constructor, or acts like the
  // constructor). NOTE: This should return the object itself!
  initialize?: PoolableInitializer<T>;

  // A limit for the pool size (so we don't leak memory by growing the pool faster than we take things from it). Can be
  // customized by setting Type.maxPoolSize
  maxSize?: number;

  // The initial size of the pool. To fill it, objects will be created with the default arguments.
  initialSize?: number;

  // If true, when constructing the default arguments will always be used (and then initialized with the initializer)
  // instead of just providing the arguments straight to the constructor.
  useDefaultConstruction?: boolean;
};

export type PoolableOptions<T extends Constructor> =
  SelfPoolableOptions<T> & ( InstanceType<T> extends { initialize: PoolableInitializer<T> } ? unknown : {
    // Require initialize if our type doesn't have a compatible initialize method.
    initialize: PoolableInitializer<T>;
  } );
type PoolableInitializer<T extends Constructor> = ( ...args: ConstructorParameters<T> ) => InstanceType<T>;

export type TPoolable = {

  // Adds this object into the pool, so that it can be reused elsewhere. Generally when this is done, no other
  // references to the object should be held (since they should not be used at all).
  freeToPool: () => void;
};

// Our linter complains that {} should be either Record<string, unknown>, unknown, or Record<string, never>. However in
// this case, we actually want it to be any type of non-nullish structural type, to see if there is anything required.
export type PossiblyRequiredParameterSpread<T> = ( {} extends T ? [ T? ] : [ T ] ); // eslint-disable-line @typescript-eslint/ban-types

export default class Pool<T extends Constructor> {
  private readonly objects: InstanceType<T>[] = [];

  private _maxPoolSize: number;
  private readonly partialConstructor: ( ...args: IntentionalAny[] ) => IntentionalAny;
  private readonly DefaultConstructor: IntentionalAny;
  private readonly initialize: PoolableInitializer<T>;
  private readonly useDefaultConstruction: boolean;

  // The `initialize` option is required if the type doesn't have a correctly-typed initialize method. Therefore, we
  // do some Typescript magic to require providedOptions if that's the case (otherwise providedOptions is optional).
  public constructor( type: T, ...providedOptionsSpread: PossiblyRequiredParameterSpread<PoolableOptions<T>> ) {
    const options = optionize<SelfPoolableOptions<T>, SelfPoolableOptions<T>>()( {

      defaultArguments: [] as unknown as ConstructorParameters<T>,
      initialize: ( type.prototype as unknown as { initialize: PoolableInitializer<T> } ).initialize,
      maxSize: 100,
      initialSize: 0,
      useDefaultConstruction: false
    }, providedOptionsSpread[ 0 ] );

    assert && assert( options.maxSize >= 0 );
    assert && assert( options.initialSize >= 0 );

    this._maxPoolSize = options.maxSize;

    // There is a madness to this craziness. We'd want to use the method noted at
    // https://stackoverflow.com/questions/1606797/use-of-apply-with-new-operator-is-this-possible, but the type is
    // not provided in the arguments array below. By calling bind on itself, we're able to get a version of bind that
    // inserts the constructor as the first argument of the .apply called later so we don't create garbage by having
    // to pack `arguments` into an array AND THEN concatenate it with a new first element (the type itself).
    this.partialConstructor = Function.prototype.bind.bind( type, type );

    // Basically our type constructor, but with the default arguments included already.
    this.DefaultConstructor = this.partialConstructor( ...options.defaultArguments! ); // eslint-disable-line @typescript-eslint/no-unnecessary-type-assertion

    this.initialize = options.initialize;
    assert && assert( this.initialize, 'Either pass in an initialize option, or provide a method named initialize on the type with the proper signature' );

    this.useDefaultConstruction = options.useDefaultConstruction;

    // Initialize the pool (if it should have objects)
    while ( this.objects.length < options.initialSize ) {
      this.objects.push( this.createDefaultObject() );
    }
  }

  private createDefaultObject(): InstanceType<T> {
    return new ( this.DefaultConstructor )();
  }

  /**
   * Returns an object with arbitrary state (possibly constructed with the default arguments).
   */
  public fetch(): InstanceType<T> {
    return this.objects.length ? this.objects.pop()! : this.createDefaultObject();
  }

  /**
   * Returns an object that behaves as if it was constructed with the given arguments. May result in a new object
   * being created (if the pool is empty), or it may use the constructor to mutate an object from the pool.
   */
  public create( ...args: ConstructorParameters<T> ): InstanceType<T> {
    let result;

    if ( this.objects.length ) {
      result = this.objects.pop();
      this.initialize.apply( result, args );
    }
    else if ( this.useDefaultConstruction ) {
      result = this.createDefaultObject();
      this.initialize.apply( result, args );
    }
    else {
      result = new ( this.partialConstructor( ...args ) )();
    }

    return result;
  }

  /**
   * Returns the current size of the pool.
   */
  public get poolSize(): number {
    return this.objects.length;
  }

  /**
   * Sets the maximum pool size.
   */
  public set maxPoolSize( value: number ) {
    assert && assert( value === Number.POSITIVE_INFINITY || ( Number.isInteger( value ) && value >= 0 ), 'maxPoolSize should be a non-negative integer or infinity' );

    this._maxPoolSize = value;
  }

  /**
   * Returns the maximum pool size.
   */
  public get maxPoolSize(): number {
    return this._maxPoolSize;
  }

  public freeToPool( object: InstanceType<T> ): void {
    if ( this.objects.length < this.maxPoolSize ) {
      this.objects.push( object );
    }
  }

  public forEach( callback: ( object: InstanceType<T> ) => void ): void {
    this.objects.forEach( callback );
  }
}

phetCore.register( 'Pool', Pool );
