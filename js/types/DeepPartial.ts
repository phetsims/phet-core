// Copyright 2023, University of Colorado Boulder

/**
 * The DeepPartial type recursively transforms all properties of a given type `T` into optional properties. This uses
 * conditional and mapped types:
 * @see https://www.typescriptlang.org/docs/handbook/2/mapped-types.html
 * @see https://www.typescriptlang.org/docs/handbook/2/conditional-types.html
 *
 * It can handle nested objects, arrays, and primitive types.
 *
 * @template T - The type to be deeply transformed into optional properties.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 */
type DeepPartial<T> = {
  /**
   * This is a mapped type that iterates over all the keys (properties) of T.
   */
  [P in keyof T]?:
  /**
   * Check if the current property type is an array.
   *
   * `T[P] extends Array<infer U>` checks if T[P] is an array type, and if so,
   * infers its item type as U. This is a conditional type.
   */
  T[P] extends Array<infer U> ?
    /**
     * If the current property type is an array, we want to make its item type
     * optional as well. This means if you have Array<{ name: string }>, we want
     * to transform it to Array<{ name?: string }>.
     *
     * We achieve this by applying DeepPartial to the item type U.
     */
  Array<DeepPartial<U>> :
    /**
     * If the current property is not an array, we check if it's an object.
     * This will include most non-primitive types except for arrays.
     */
  T[P] extends object ?
    /**
     * If the current property type is an object, we want to make all its
     * properties optional as well.
     *
     * So, we apply DeepPartial recursively to T[P].
     */
  DeepPartial<T[P]> :
    /**
     * If the current property is neither an array nor an object, it's a
     * primitive type (like string, number, etc.).
     *
     * In this case, we just use the property type itself. We don't need to do
     * anything with primitive types because they can't have nested properties.
     */
  T[P];
};

export default DeepPartial;