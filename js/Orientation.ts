// Copyright 2019-2022, University of Colorado Boulder

/**
 * Either horizontal or vertical, with helper values.  Moved from Area Model Common on Nov 7, 2019
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 * @author Sam Reid (PhET Interactive Simulations)
 */

import phetCore from './phetCore.js';
import Enumeration from './Enumeration.js';
import EnumerationValue from './EnumerationValue.js';

// So we don't introduce a dependency on phetcommon
type MVT = {
  modelToViewX: ( n: number ) => number;
  modelToViewY: ( n: number ) => number;
  viewToModelX: ( n: number ) => number;
  viewToModelY: ( n: number ) => number;
};

class Orientation extends EnumerationValue {

  static HORIZONTAL = new Orientation( 'x', 'centerX', 'minX', 'maxX', 'left', 'right', 'rectX', 'rectWidth', 'horizontal', 'width', 'preferredWidth', 'localPreferredWidth', 'widthSizable',
    ( modelViewTransform, value ) => modelViewTransform.modelToViewX( value ),
    ( modelViewTransform, value ) => modelViewTransform.viewToModelX( value ),
    ( a: number, b: number, Vector2: any ) => new Vector2( a, b )
  );

  static VERTICAL = new Orientation( 'y', 'centerY', 'minY', 'maxY', 'top', 'bottom', 'rectY', 'rectHeight', 'vertical', 'height', 'preferredHeight', 'localPreferredHeight', 'heightSizable',
    ( modelViewTransform, value ) => modelViewTransform.modelToViewY( value ),
    ( modelViewTransform, value ) => modelViewTransform.viewToModelY( value ),
    ( a: number, b: number, Vector2: any ) => new Vector2( b, a )
  );

  static enumeration = new Enumeration( Orientation, {
    phetioDocumentation: 'Horizontal or vertical orientation'
  } );

  readonly coordinate: 'x' | 'y'; // So you can position things like node[ orientation.coordinate ] = value
  readonly centerCoordinate: 'centerX' | 'centerY'; // So you can center things like node[ orientation.centerCoordinate ] = value
  readonly minCoordinate: 'minX' | 'minY'; // So you can center things like bounds[ orientation.minCoordinate ] = value
  readonly maxCoordinate: 'maxX' | 'maxY'; // So you can center things like bounds[ orientation.maxCoordinate ] = value
  readonly minSide: 'left' | 'top'; // For getting the minimal/maximal values from bounds/nodes
  readonly maxSide: 'right' | 'bottom';
  readonly rectCoordinate: 'rectX' | 'rectY'; // For being able to handle Rectangles (x/y) and (width/height)
  readonly rectSize: 'rectWidth' | 'rectHeight';
  readonly layoutBoxOrientation: 'horizontal' | 'vertical'; // The name of the orientation when used for LayoutBox
  readonly size: 'width' | 'height';
  readonly preferredSize: 'preferredWidth' | 'preferredHeight';
  readonly localPreferredSize: 'localPreferredWidth' | 'localPreferredHeight';
  readonly sizable: 'widthSizable' | 'heightSizable';
  readonly ariaOrientation: 'horizontal' | 'vertical'; // The value of the aria-orientation attribute for this Orientation.

  // Returns the single coordinate transformed by the appropriate dimension.
  modelToView: ( m: MVT, n: number ) => number;
  viewToModel: ( m: MVT, n: number ) => number;

  // Creates a vector (primary,secondary) for horizontal orientations, and (secondary,primary) for vertical orientations.
  toVector: ( n: number, m: number, Vector2: any ) => any;

  // @ts-ignore - Assigned after instantiation, see below
  opposite: Orientation;

  constructor( coordinate: 'x' | 'y',
               centerCoordinate: 'centerX' | 'centerY',
               minCoordinate: 'minX' | 'minY',
               maxCoordinate: 'maxX' | 'maxY',
               minSide: 'left' | 'top',
               maxSide: 'right' | 'bottom',
               rectCoordinate: 'rectX' | 'rectY',
               rectSize: 'rectWidth' | 'rectHeight',
               layoutBoxOrientation: 'horizontal' | 'vertical',
               size: 'width' | 'height',
               preferredSize: 'preferredWidth' | 'preferredHeight',
               localPreferredSize: 'localPreferredWidth' | 'localPreferredHeight',
               sizable: 'widthSizable' | 'heightSizable',
               modelToView: ( m: MVT, n: number ) => number,
               viewToModel: ( m: MVT, n: number ) => number, toVector: ( n: number, m: number, Vector2: any ) => any ) {

    super();
    this.coordinate = coordinate;
    this.centerCoordinate = centerCoordinate;
    this.minCoordinate = minCoordinate;
    this.maxCoordinate = maxCoordinate;
    this.minSide = minSide;
    this.maxSide = maxSide;
    this.rectCoordinate = rectCoordinate;
    this.rectSize = rectSize;
    this.layoutBoxOrientation = layoutBoxOrientation;
    this.size = size;
    this.preferredSize = preferredSize;
    this.localPreferredSize = localPreferredSize;
    this.sizable = sizable;
    this.ariaOrientation = layoutBoxOrientation;
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