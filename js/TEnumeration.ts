// Copyright 2021-2022, University of Colorado Boulder

import EnumerationValue from './EnumerationValue.js';

/**
 * Abstraction used by EnumerationProperty, and implemented by Enumeration.ts
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
type TEnumeration<T extends EnumerationValue> = {

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

type EnumerationContainer<T extends EnumerationValue> = {
  enumeration: TEnumeration<T>;
};

export type { EnumerationContainer };
export default TEnumeration;