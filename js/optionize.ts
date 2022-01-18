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

// TODO: How can we indicate that a required parameter will come in through s or a but not both?  See https://github.com/phetsims/chipper/issues/1128
// TODO: Do we have to put the A all type parameter?  Could it be omitted or inferred?  See https://github.com/phetsims/chipper/issues/1128
// TODO: See https://github.com/phetsims/chipper/issues/1128 Perhaps not inferred, since it may Omit things
// TypeScript is all-or-none on inferring generic parameter types (per function), so we must use the nested strategy in
// https://stackoverflow.com/questions/63678306/typescript-partial-type-inference to specify the types we want
// while still allowing definitions to flow through.
// S = SubclassSelfOptions
// P = ParentOptions
// A = AllSubclassProvidedOptions
// M = list of keys that are used in the constructor
const optionize = <S, P = {}, M extends keyof P = never, A = S & P>( s: Required<Options<S>> & Partial<P> & Required<Pick<P, M>>, a?: A ) => {
  return merge( s, a );
};

// This also works, we will keep it here now in case it helps with further improvements with inference.
// const optionize = <S, P, M extends keyof P = never>() => {
//   return <B>( s: Required<Options<S>> & Partial<P> & Required<Pick<P, M>>, a?: B ) => {
//     return merge( s, a );
//   };
// };

phetCore.register( 'optionize', optionize );
export default optionize;