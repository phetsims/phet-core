// Copyright 2019-2023, University of Colorado Boulder

/**
 * Either horizontal or vertical, with helper values.  Moved from Area Model Common on Nov 7, 2019
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 * @author Sam Reid (PhET Interactive Simulations)
 */

import phetCore from './phetCore.js';
import Enumeration from './Enumeration.js';
import EnumerationValue from './EnumerationValue.js';
import Constructor from './types/Constructor.js';
import IntentionalAny from './types/IntentionalAny.js';

// So we don't introduce a dependency on phetcommon
type MVT = {
  modelToViewX: ( n: number ) => number;
  modelToViewY: ( n: number ) => number;
  viewToModelX: ( n: number ) => number;
  viewToModelY: ( n: number ) => number;
};

class Orientation extends EnumerationValue {

  public static readonly HORIZONTAL = new Orientation( 'x', 'centerX', 'minX', 'maxX', 'left', 'right', 'minWidth', 'maxWidth', 'rectX', 'rectWidth', 'horizontal', 'width', 'column', 'preferredWidth', 'localPreferredWidth', 'widthSizable',
    ( modelViewTransform, value ) => modelViewTransform.modelToViewX( value ),
    ( modelViewTransform, value ) => modelViewTransform.viewToModelX( value ),
    // Pad with zeros to support up to Vector4
    <T>( a: number, b: number, VectorType: Constructor<T> ): T => new VectorType( a, b, 0, 0 )
  );

  public static readonly VERTICAL = new Orientation( 'y', 'centerY', 'minY', 'maxY', 'top', 'bottom', 'minHeight', 'maxHeight', 'rectY', 'rectHeight', 'vertical', 'height', 'row', 'preferredHeight', 'localPreferredHeight', 'heightSizable',
    ( modelViewTransform, value ) => modelViewTransform.modelToViewY( value ),
    ( modelViewTransform, value ) => modelViewTransform.viewToModelY( value ),
    // Pad with zeros to support up to Vector4
    <T>( a: number, b: number, VectorType: Constructor<T> ) => new VectorType( b, a, 0, 0 )
  );

  public static enumeration = new Enumeration( Orientation, {
    phetioDocumentation: 'Horizontal or vertical orientation'
  } );

  public static fromLayoutOrientation( layoutOrientation: 'horizontal' | 'vertical' ): Orientation {
    return layoutOrientation === 'horizontal' ? Orientation.HORIZONTAL : Orientation.VERTICAL;
  }

  public readonly coordinate: 'x' | 'y'; // So you can position things like node[ orientation.coordinate ] = value
  public readonly centerCoordinate: 'centerX' | 'centerY'; // So you can center things like node[ orientation.centerCoordinate ] = value
  public readonly minCoordinate: 'minX' | 'minY'; // So you can center things like bounds[ orientation.minCoordinate ] = value
  public readonly maxCoordinate: 'maxX' | 'maxY'; // So you can center things like bounds[ orientation.maxCoordinate ] = value
  public readonly minSide: 'left' | 'top'; // For getting the minimal/maximal values from bounds/nodes
  public readonly maxSide: 'right' | 'bottom';
  public readonly minSize: 'minWidth' | 'minHeight';
  public readonly maxSize: 'maxWidth' | 'maxHeight';
  public readonly rectCoordinate: 'rectX' | 'rectY'; // For being able to handle Rectangles (x/y) and (width/height)
  public readonly rectSize: 'rectWidth' | 'rectHeight';
  public readonly flowBoxOrientation: 'horizontal' | 'vertical'; // The name of the orientation when used for FlowBox
  public readonly size: 'width' | 'height';
  public readonly line: 'column' | 'row';
  public readonly preferredSize: 'preferredWidth' | 'preferredHeight';
  public readonly localPreferredSize: 'localPreferredWidth' | 'localPreferredHeight';
  public readonly sizable: 'widthSizable' | 'heightSizable';
  public readonly ariaOrientation: 'horizontal' | 'vertical'; // The value of the aria-orientation attribute for this Orientation.

  // Returns the single coordinate transformed by the appropriate dimension.
  public modelToView: ( m: MVT, n: number ) => number;
  public viewToModel: ( m: MVT, n: number ) => number;

  // Creates a vector (primary,secondary) for horizontal orientations, and (secondary,primary) for vertical orientations.
  public toVector: <T>( n: number, m: number, VectorType: Constructor<T> ) => T;

  // @ts-expect-error - Assigned after instantiation, see below
  public opposite: Orientation;

  public constructor( coordinate: 'x' | 'y',
               centerCoordinate: 'centerX' | 'centerY',
               minCoordinate: 'minX' | 'minY',
               maxCoordinate: 'maxX' | 'maxY',
               minSide: 'left' | 'top',
               maxSide: 'right' | 'bottom',
               minSize: 'minWidth' | 'minHeight',
               maxSize: 'maxWidth' | 'maxHeight',
               rectCoordinate: 'rectX' | 'rectY',
               rectSize: 'rectWidth' | 'rectHeight',
               flowBoxOrientation: 'horizontal' | 'vertical',
               size: 'width' | 'height',
               line: 'column' | 'row',
               preferredSize: 'preferredWidth' | 'preferredHeight',
               localPreferredSize: 'localPreferredWidth' | 'localPreferredHeight',
               sizable: 'widthSizable' | 'heightSizable',
               modelToView: ( m: MVT, n: number ) => number,
               viewToModel: ( m: MVT, n: number ) => number, toVector: <T>( n: number, m: number, VectorType: new ( x: number, y: number, ...args: IntentionalAny[] ) => T ) => T ) {

    super();
    this.coordinate = coordinate;
    this.centerCoordinate = centerCoordinate;
    this.minCoordinate = minCoordinate;
    this.maxCoordinate = maxCoordinate;
    this.minSide = minSide;
    this.maxSide = maxSide;
    this.minSize = minSize;
    this.maxSize = maxSize;
    this.rectCoordinate = rectCoordinate;
    this.rectSize = rectSize;
    this.flowBoxOrientation = flowBoxOrientation;
    this.size = size;
    this.line = line;
    this.preferredSize = preferredSize;
    this.localPreferredSize = localPreferredSize;
    this.sizable = sizable;
    this.ariaOrientation = flowBoxOrientation;
    this.modelToView = modelToView;
    this.viewToModel = viewToModel;
    this.toVector = toVector;
  }
}

// Set up opposites as object references (circular)
Orientation.HORIZONTAL.opposite = Orientation.VERTICAL;
Orientation.VERTICAL.opposite = Orientation.HORIZONTAL;

phetCore.register( 'Orientation', Orientation );
export default Orientation;