// Copyright 2022, University of Colorado Boulder

/**
 * Just like Omit, except it enforces the presence of omitted keys in the original type.
 * i.e.:
 * type X = { hello: number, hola: boolean };
 * type Y1 = Omit<X, 'goodbye'>; // Wouldn't throw an error
 * type Y2 = OmitStrict<X, 'goodbye'>; // Will throw an error
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 * @author Agustín Vallejo (PhET Interactive Simulations)
 */

type OmitStrict<ObjectType, KeysType extends keyof ObjectType> = Pick<ObjectType, Exclude<keyof ObjectType, KeysType>>;
export default OmitStrict;