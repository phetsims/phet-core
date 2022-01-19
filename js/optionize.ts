// Copyright 2022, University of Colorado Boulder

import phetCore from './phetCore.js';
import merge from './merge.js';

// https://github.com/piotrwitek/utility-types/blob/master/src/mapped-types.ts
type OptionalKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}[keyof T];

// Gets the parts of an object that are optional
type Options<T> = Pick<T, OptionalKeys<T>>;

// type RequiredKeys<T> = {
//   [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
// }[keyof T];
// The part of the object that is required
// type Requires<T> = Pick<T, RequiredKeys<T>>;

// what goes into options?
// defaults for all optional things
// a providedOptions with values for all required things
// overriding values for the super(options) call

// what comes out of merge?
// an object with filled in defaults, and all the required things.  In our level and parent levels.

// TODO: (I) How can we indicate that a required parameter (for ParentOptions) will come in through defaults and/or providedOptions? Note: required parameters for S will not come from defaults.  See https://github.com/phetsims/chipper/issues/1128
// SelfOptions = SubclassSelfOptions
// ParentOptions = ParentOptions
// KeysUsedInSubclassConstructor = list of keys from ParentOptions that are used in the constructor
// ProvidedOptions = AllSubclassProvidedOptions
const optionize =
  <SelfOptions,
    ParentOptions = {},
    KeysUsedInSubclassConstructor extends keyof ParentOptions = never,
    ProvidedOptions = SelfOptions & ParentOptions>
  (
    defaults: Required<Options<SelfOptions>> & Partial<ParentOptions> & Required<Pick<ParentOptions, KeysUsedInSubclassConstructor>>,
    providedOptions?: ProvidedOptions
  ) => {
    return merge( defaults, providedOptions );
  };

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
export default optionize;