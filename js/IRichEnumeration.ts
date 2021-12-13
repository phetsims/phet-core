// Copyright 2021, University of Colorado Boulder

/**
 * Abstraction used by RichEnumerationProperty, and implemented by RichEnumeration.ts
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
type IRichEnumeration<T> = {

  // The possible keys for the enumeration
  readonly keys: string[];

  // The values for the enumeration
  readonly values: T[];

  // Optional PhET-iO documentation
  readonly phetioDocumentation?: string;

  // Lookup a value for a key
  getValue( key: string ): T;

  // Reverse-lookup, find the key for the value, for PhET-iO deserialization
  getKey( value: T ): string;

  // Determines whether the value is in the enumeration
  includes( value: T ): boolean;
};

export default IRichEnumeration;