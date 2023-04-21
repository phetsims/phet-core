// Copyright 2022-2023, University of Colorado Boulder

/**
 * Optionize is a TypeScript layer built on PHET_CORE/merge. Its goal is to satisfy type safety within PhET's "options"
 * pattern.
 *
 * For up-to-date examples on how to use this file, see WILDER/WilderOptionsPatterns.ts
 *
 * This pattern is still being solidified. Although the long term location of PhET's options pattern documentation
 * can be found at https://github.com/phetsims/phet-info/blob/master/doc/phet-software-design-patterns.md#options-and-config,
 * that document is currently out of date. Please see https://github.com/phetsims/phet-core/issues/128 for current
 * progress on this pattern.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import phetCore from './phetCore.js';
import merge from './merge.js';
import IntentionalAny from './types/IntentionalAny.js';
import RequiredKeys from './types/RequiredKeys.js';
import OptionalKeys from './types/OptionalKeys.js';

// Gets the parts of an object that are optional
type Options<T> = Pick<T, OptionalKeys<T>>;

type ObjectWithNoKeys = Record<string | number, never>;

export type EmptySelfOptions = {
  _emptySelfOptionsKey?: never;
};

type EmptySelfOptionsKeys = keyof EmptySelfOptions;

// This is the type for the `defaults` argument to optionize
type OptionizeDefaults<SelfOptions = EmptySelfOptions, ParentOptions = EmptySelfOptions, ProvidedOptions = EmptySelfOptions> =

// Everything optional from SelfOptions must have a default specified
  Omit<Required<Options<SelfOptions>>, EmptySelfOptionsKeys> & // eslint-disable-line @typescript-eslint/ban-types

  // Anything required in the ProvidedOptions should not show up in the "defaults" object
  { [k in RequiredKeys<ProvidedOptions>]?: never; } &

  // Any or none of Parent options can be provided
  Partial<ParentOptions>

  // Include the required properties from ParentOptions that are not in the ProvidedOptions
  & Required<Omit<Pick<ParentOptions, RequiredKeys<ParentOptions>>, RequiredKeys<ProvidedOptions>>>; // eslint-disable-line @typescript-eslint/ban-types

// Factor out the merge arrow closure to avoid heap/cpu at runtime
const merge4 = ( a: IntentionalAny, b?: IntentionalAny, c?: IntentionalAny, d?: IntentionalAny ) => merge( a, b, c, d );

// ProvidedOptions = The type of this class's public API (type of the providedOptions parameter in the constructor)
// SelfOptions = Options that are defined by "this" class. Anything optional in this block must have a default provided in "defaults"
// ParentOptions = The public API for parent options, this will be exported by the parent class, like "NodeOptions"
// KeysUsedInSubclassConstructor = list of keys from ParentOptions that are used in this constructor.
export default function optionize<ProvidedOptions,
  SelfOptions = ProvidedOptions, // By default, every optional option in the ProvidedOptions must have a default unless you specify another object for SelfOptions
  ParentOptions = Record<never, never>>():
  <KeysUsedInSubclassConstructor extends keyof ( ParentOptions )>(
    defaults: OptionizeDefaults<SelfOptions, ParentOptions, ProvidedOptions>,
    providedOptions?: ProvidedOptions
  ) => OptionizeDefaults<SelfOptions, ParentOptions> & ProvidedOptions & Required<Pick<ParentOptions, KeysUsedInSubclassConstructor>> {
  return merge4;
}

// Use this function to gain the typing that optionize provides but in a case where the first argument is an empty object.
export function optionize3<ProvidedOptions,
  SelfOptions = ProvidedOptions, // By default, every optional option in the ProvidedOptions must have a default unless you specify another object for SelfOptions
  ParentOptions = Record<never, never>>():
  <KeysUsedInSubclassConstructor extends keyof ( ParentOptions )>(
    emptyObject: ObjectWithNoKeys,
    defaults: OptionizeDefaults<SelfOptions, ParentOptions>,
    providedOptions?: ProvidedOptions
  ) => OptionizeDefaults<SelfOptions, ParentOptions> & ProvidedOptions & Required<Pick<ParentOptions, KeysUsedInSubclassConstructor>> {
  return merge4;
}

/**
 * Use this function to replace merge in cases like:
 *
 * const options = m-e-r-g-e(
 *   {},
 *
 *   // ParentOptions defaults that are common throughout the sim
 *   MyConstants.SOME_COMMON_OPTIONS,
 *
 *   // SelfOptions and ParentOptions defaults that are provided by this class
 *   { ... },
 *
 *   // option values that are provided by the caller
 *   providedOptions );
 */
export function optionize4<ProvidedOptions,
  SelfOptions = ProvidedOptions,
  ParentOptions = object>():
  <KeysUsedInSubclassConstructor extends keyof ( ParentOptions )>(
    emptyObject: ObjectWithNoKeys,
    defaults1: Partial<ParentOptions>,
    defaults2: OptionizeDefaults<SelfOptions, ParentOptions>,
    providedOptions?: ProvidedOptions
  ) => OptionizeDefaults<SelfOptions, ParentOptions> & ProvidedOptions & Required<Pick<ParentOptions, KeysUsedInSubclassConstructor>> {
  return merge4;
}

// Use combineOptions to combine object literals (typically options) that all have the same type.
export function combineOptions<Type extends object>( target: Partial<Type>, ...sources: Array<Partial<Type> | undefined> ): Type {
  return merge4( target, ...sources );
}


// function optionize<ProvidedOptions, // eslint-disable-line no-redeclare
//   SelfOptions = ProvidedOptions,
//   ParentOptions = EmptySelfOptions>():
//   <KeysUsedInSubclassConstructor extends keyof ( ParentOptions )>(
//     emptyObject: ObjectWithNoKeys,
//     defaults: OptionizeDefaults<SelfOptions, ParentOptions>,
//     providedOptions?: ProvidedOptions
//   ) => OptionizeDefaults<SelfOptions, ParentOptions> & ProvidedOptions & Required<Pick<ParentOptions, KeysUsedInSubclassConstructor>>;
//
// function optionize<ProvidedOptions, // eslint-disable-line no-redeclare
//   SelfOptions = ProvidedOptions,
//   ParentOptions = EmptySelfOptions,
//   KeysUsedInSubclassConstructor extends keyof ParentOptions = never>():
//   (
//     empytObject: ObjectWithNoKeys,
//     defaults: OptionizeDefaults<SelfOptions, ParentOptions, KeysUsedInSubclassConstructor>,
//     providedOptions?: ProvidedOptions
//   ) => ObjectWithNoKeys & OptionizeDefaults<SelfOptions, ParentOptions, KeysUsedInSubclassConstructor> & ProvidedOptions;

// The implementation gets "any" types because of the above signatures
// function optionize<???>() { return ( a: any, b?: any, c?: any ) => merge( a, b, c ); } // eslint-disable-line no-redeclare,bad-text

// TypeScript is all-or-none on inferring generic parameter types (per function), so we must use the nested strategy in
// https://stackoverflow.com/questions/63678306/typescript-partial-type-inference to specify the types we want
// while still allowing definitions to flow through.
// This also works, we will keep it here now in case it helps with further improvements with inference.
// const optionize = <S, P, M extends keyof P = never>() => {
//   return <B>( defaults: Required<Options<S>> & Partial<P> & Required<Pick<P, M>>, providedOptions?: B ) => {
//     return merge( defaults, providedOptions );
//   };
// };

/*
Limitation (I):

This gets us half way there, when you have required args to the parent, this makes sure that you don't make
providedOptions optional (with a question mark). We still need a way to note when the required param is specified via the self options.
const optionize = <S, P = EmptySelfOptions, M extends keyof P = never, A = S & P>(
  defaults: Required<Options<S>> & Partial<P> & Required<Pick<P, M>>,
  providedOptions: RequiredKeys<A> extends never ? ( A | undefined ) : A
) => {
  return merge( defaults, providedOptions );
};

TEST TO SEE IF WE CAN GET TYPESCRIPT TO KNOW ABOUT REQUIRED ARGUMENTS TO POTENTIALLY COME FROM EITHER ARG.
const optionize = <S, P = EmptySelfOptions, M extends keyof P = never, A = S & P>() => {
  type FirstArg = Required<Options<S>> & Partial<P> & Required<Pick<P, M>>;
  return (
    defaults: FirstArg,
    //NOT WORKING: If any required elements were in the first arg, then we don't need them here, and potentially can mark providedOptions as a whole as optional
    providedOptions: RequiredKeys<FirstArg> extends never ? RequiredKeys<A> extends never ? ( A | undefined ) : A : A
  ) => {
    return merge( defaults, providedOptions );
  };
};
 */

phetCore.register( 'optionize', optionize );
export type { OptionizeDefaults };