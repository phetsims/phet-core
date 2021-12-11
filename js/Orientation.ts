// Copyright 2019-2021, University of Colorado Boulder

/**
 * Either horizontal or vertical, with helper values.  Moved from Area Model Common on Nov 7, 2019
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Enumeration from './Enumeration.js';
import phetCore from './phetCore.js';

/**
 * @private
 */
class OrientationValue {

  /**
   * See property definitions for more documentation.
   *
   * @param {string} coordinate
   * @param {string} centerCoordinate
   * @param {string} minSide
   * @param {string} maxSide
   * @param {string} rectCoordinate,
   * @param {string} rectSize
   * @param {string} layoutBoxOrientation
   * @param {string} size
   * @param {function(ModelViewTransform2,number):number} modelToView
   * @param {function(ModelViewTransform2,number):number} viewToModel
   * @param {function(number,number):Vector2} toVector
   */
  constructor( coordinate, centerCoordinate, minSide, maxSide, rectCoordinate,
               rectSize, layoutBoxOrientation, size, modelToView, viewToModel, toVector ) {

    // @public {string} - So you can position things like node[ orientation.coordinate ] = value
    this.coordinate = coordinate;

    // @public {string} - So you can center things like node[ orientation.centerCoordinate ] = value
    this.centerCoordinate = centerCoordinate;

    // @public {string} - For getting the minimal/maximal values from bounds/nodes
    this.minSide = minSide;
    this.maxSide = maxSide;

    // @public {string} - For being able to handle Rectangles (x/y) and (width/height)
    this.rectCoordinate = rectCoordinate;
    this.rectSize = rectSize;

    // @public {string} - The name of the orientation when used for LayoutBox
    this.layoutBoxOrientation = layoutBoxOrientation;

    // @public {string}
    this.size = size;

    // @public {string} - The value of the aria-orientation attribute for this OrientationValue.
    this.ariaOrientation = layoutBoxOrientation;

    /**
     * Returns the single coordinate transformed by the appropriate dimension.
     * @public
     *
     * @param {ModelViewTransform2} modelViewTransform
     * @param {number} value
     * @returns {number}
     */
    this.modelToView = modelToView;

    /**
     * Returns the single coordinate transformed by the appropriate dimension.
     * @public
     *
     * @param {ModelViewTransform2} modelViewTransform
     * @param {number} value
     * @returns {number}
     */
    this.viewToModel = viewToModel;

    /**
     * {function} Creates a vector (primary,secondary) for horizontal orientations, and (secondary,primary) for vertical
     * orientations.
     * @public
     *
     * @param {number} primary
     * @param {number} secondary
     * @param {function} Vector2 constructor -- passed in instead of imported so that phet-core doesn't have dot as a dependency
     * @returns {Vector2}
     */
    this.toVector = toVector;

    // @public {OrientationValue} Assigned after instantiation, see below.
    this.opposite = null;
  }
}

const HORIZONTAL = new OrientationValue( 'x', 'centerX', 'left', 'right', 'rectX', 'rectWidth', 'horizontal', 'width',
  ( modelViewTransform, value ) => modelViewTransform.modelToViewX( value ),
  ( modelViewTransform, value ) => modelViewTransform.viewToModelX( value ),
  ( a, b, Vector2 ) => new Vector2( a, b )
);

const VERTICAL = new OrientationValue( 'y', 'centerY', 'top', 'bottom', 'rectY', 'rectHeight', 'vertical', 'height',
  ( modelViewTransform, value ) => modelViewTransform.modelToViewY( value ),
  ( modelViewTransform, value ) => modelViewTransform.viewToModelY( value ),
  ( a, b, Vector2 ) => new Vector2( b, a )
);

// Set up opposites as object references (circular)
HORIZONTAL.opposite = VERTICAL;
VERTICAL.opposite = HORIZONTAL;

const Orientation = Enumeration.byMap( {
  HORIZONTAL: HORIZONTAL,
  VERTICAL: VERTICAL
} );
phetCore.register( 'Orientation', Orientation );
export default Orientation;