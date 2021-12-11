// Copyright 2021, University of Colorado Boulder

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
  constructor( horizontal: T, vertical: T ) {
    super( Orientation, orientation => orientation === Orientation.HORIZONTAL ? horizontal : vertical );
  }

  get horizontal(): T {
    return this.get( Orientation.HORIZONTAL );
  }

  set horizontal( value ) {
    this.set( Orientation.HORIZONTAL, value );
  }

  get vertical(): T {
    return this.get( Orientation.VERTICAL );
  }

  set vertical( value ) {
    this.set( Orientation.VERTICAL, value );
  }

  /**
   * Creates an orientation pair based on a factory method.
   * @public
   *
   * @param {function} factory - Called factory( {Orientation} ) : {*}, called once for each orientation to determine
   *                             the value.
   */
  static create<T>( factory: ( o: Orientation ) => T ) {
    return new OrientationPair( factory( Orientation.HORIZONTAL ), factory( Orientation.VERTICAL ) );
  }
}

phetCore.register( 'OrientationPair', OrientationPair );
export default OrientationPair;