// Copyright 2022, University of Colorado Boulder

/**
 * Optionize is a TypeScript layer built on PHET_CORE/merge. Its goal is to satisfy type safety within PhET's "options"
 * pattern.
 *
 * For up-to-date examples on how to use this file, see WILDER/WilderOptionsPatterns.ts
 *
 * This pattern is still being solidified. Although the long term location of PhET's options pattern documentation
 * can be found at https://github.com/phetsims/phet-info/blob/master/doc/phet-software-design-patterns.md#options-and-config,
 * that document is currently out of date. Please see https://github.com/phetsims/chipper/issues/1128 for current
 * progress on this pattern.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import phetCore from './phetCore.js';
import merge from './merge.js';

// https://github.com/piotrwitek/utility-types/blob/master/src/mapped-types.ts
type OptionalKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}[keyof T];

// Gets the parts of an object that are optional
type Options<T> = Pick<T, OptionalKeys<T>>;

type EmptyObject = {
  [ key: string | number ]: never;
}

// This is the type for the `defaults` argument to optionize
export type HalfOptions<SelfOptions = {}, ParentOptions = {}> =

// Everything optional from SelfOptions must have a default specified
  Required<Options<SelfOptions>> &

  // Any or none of Parent options can be provided
  Partial<ParentOptions>;

// This is the type for the `defaults` argument to optionize
type OptionizeDefaults<SelfOptions = {}, ParentOptions = {}, KeysUsedInSubclassConstructor extends keyof ParentOptions = never> =

// Everything optional from SelfOptions must have a default specified
  Required<Options<SelfOptions>> &

  // Any or none of Parent options can be provided
  Partial<ParentOptions> &

  // Any keys provided in KeysUsedInSubclassConstructor are required to have a default provided, with the assumption
  // that they will be used from the return type of optionize.
  Required<Pick<ParentOptions, KeysUsedInSubclassConstructor>>;

// TODO: "Limitation (I)" How can we indicate that a required parameter (for ParentOptions) will come in through defaults and/or providedOptions? Note: required parameters for S will not come from defaults.  See https://github.com/phetsims/chipper/issues/1128

// Factor out the merge arrow closure to avoid heap/cpu at runtime
const merge3 = ( a: any, b?: any, c?: any ) => merge( a, b, c );

// ProvidedOptions = The type of this class's public API (type of the providedOptions parameter in the constructor)
// SelfOptions = Options that are defined by "this" class. Anything optional in this block must have a default provided in "defaults"
// ParentOptions = The public API for parent options, this will be exported by the parent class, like "NodeOptions"
// KeysUsedInSubclassConstructor = list of keys from ParentOptions that are used in this constructor. Please note that listing required parent option keys that are filled in by subtype defaults is a workaround for Limitation (I).
export default function optionize<ProvidedOptions,
  SelfOptions = ProvidedOptions,
  ParentOptions = {}>():
  <KeysUsedInSubclassConstructor extends keyof ( ParentOptions )>(
    defaults: HalfOptions<SelfOptions, ParentOptions>,
    providedOptions?: ProvidedOptions
  ) => HalfOptions<SelfOptions, ParentOptions> & ProvidedOptions & Required<Pick<ParentOptions, KeysUsedInSubclassConstructor>> {
  return merge3;
}

export function optionize3<ProvidedOptions,
  SelfOptions = ProvidedOptions,
  ParentOptions = {}>():
  <KeysUsedInSubclassConstructor extends keyof ( ParentOptions )>(
    emptyObject: EmptyObject,
    defaults: HalfOptions<SelfOptions, ParentOptions>,
    providedOptions?: ProvidedOptions
  ) => HalfOptions<SelfOptions, ParentOptions> & ProvidedOptions & Required<Pick<ParentOptions, KeysUsedInSubclassConstructor>> {
  return merge3;
}

// function optionize<ProvidedOptions, // eslint-disable-line no-redeclare
//   SelfOptions = ProvidedOptions,
//   ParentOptions = {}>():
//   <KeysUsedInSubclassConstructor extends keyof ( ParentOptions )>(
//     emptyObject: EmptyObject,
//     defaults: HalfOptions<SelfOptions, ParentOptions>,
//     providedOptions?: ProvidedOptions
//   ) => HalfOptions<SelfOptions, ParentOptions> & ProvidedOptions & Required<Pick<ParentOptions, KeysUsedInSubclassConstructor>>;
//
// function optionize<ProvidedOptions, // eslint-disable-line no-redeclare
//   SelfOptions = ProvidedOptions,
//   ParentOptions = {},
//   KeysUsedInSubclassConstructor extends keyof ParentOptions = never>():
//   (
//     empytObject: EmptyObject,
//     defaults: OptionizeDefaults<SelfOptions, ParentOptions, KeysUsedInSubclassConstructor>,
//     providedOptions?: ProvidedOptions
//   ) => EmptyObject & OptionizeDefaults<SelfOptions, ParentOptions, KeysUsedInSubclassConstructor> & ProvidedOptions;

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
const optionize = <S, P = {}, M extends keyof P = never, A = S & P>(
  defaults: Required<Options<S>> & Partial<P> & Required<Pick<P, M>>,
  providedOptions: RequiredKeys<A> extends never ? ( A | undefined ) : A
) => {
  return merge( defaults, providedOptions );
};

TEST TO SEE IF WE CAN GET TYPESCRIPT TO KNOW ABOUT REQUIRED ARGUMENTS TO POTENTIALLY COME FROM EITHER ARG.
const optionize = <S, P = {}, M extends keyof P = never, A = S & P>() => {
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