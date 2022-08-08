// Copyright 2021-2022, University of Colorado Boulder

/**
 * An object that contains a value for each item in an enumeration.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import EnumerationMap from './EnumerationMap.js';
import Orientation from './Orientation.js';
import phetCore from './phetCore.js';

class OrientationPair<T> extends EnumerationMap<Orientation, T> {

  /**
   * @param horizontal - Value for the horizontal orientation
   * @param vertical - Value for the vertical orientation
   */
  public constructor( horizontal: T, vertical: T ) {
    super( Orientation, orientation => orientation === Orientation.HORIZONTAL ? horizontal : vertical );
  }

  public get horizontal(): T {
    return this.get( Orientation.HORIZONTAL );
  }

  public set horizontal( value: T ) {
    this.set( Orientation.HORIZONTAL, value );
  }

  public get vertical(): T {
    return this.get( Orientation.VERTICAL );
  }

  public set vertical( value: T ) {
    this.set( Orientation.VERTICAL, value );
  }

  /**
   * Creates an orientation pair based on a factory method.
   *
   * @param factory - called once for each orientation to determine
   *                             the value.
   */
  public static create<T>( factory: ( o: Orientation ) => T ): OrientationPair<T> {
    return new OrientationPair( factory( Orientation.HORIZONTAL ), factory( Orientation.VERTICAL ) );
  }
}

phetCore.register( 'OrientationPair', OrientationPair );
export default OrientationPair;