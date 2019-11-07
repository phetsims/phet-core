// Copyright 2017-2019, University of Colorado Boulder

/**
 * Either horizontal or vertical, with helper values.  Moved from Area Model Common on Nov 7, 2019
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const Enumeration = require( 'PHET_CORE/Enumeration' );
  const phetCore = require( 'PHET_CORE/phetCore' );
  const Vector2 = require( 'DOT/Vector2' );

  const Orientation = new Enumeration( [ 'HORIZONTAL', 'VERTICAL' ], {
    beforeFreeze: Orientation => {

      // Set the named attribute value for both HORIZONTAL and VERTICAL.
      const assign = ( attribute, horizontalValue, verticalValue ) => {
        Orientation.HORIZONTAL[ attribute ] = horizontalValue;
        Orientation.VERTICAL[ attribute ] = verticalValue;
      };

      // {string} - So you can position things like node[ orientation.coordinate ] = value
      assign( 'coordinate', 'x', 'y' );

      // {string} - So you can center things like node[ orientation.centerCoordinate ] = value
      assign( 'centerCoordinate', 'centerX', 'centerY' );

      // {string} - For getting the minimal/maximal values from bounds/nodes
      assign( 'minSide', 'left', 'top' );
      assign( 'maxSide', 'right', 'bottom' );

      // {string} - For being able to handle Rectangles (x/y) and (width/height)
      assign( 'rectCoordinate', 'rectX', 'rectY' );
      assign( 'rectSize', 'rectWidth', 'rectHeight' );

      // {string} - The name of the orientation when used for LayoutBox
      assign( 'layoutBoxOrientation', 'horizontal', 'vertical' );

      // Set up opposites as object references (circular)
      assign( 'opposite', Orientation.VERTICAL, Orientation.HORIZONTAL );

      /**
       * Returns the single coordinate transformed by the appropriate dimension.
       * @public
       *
       * @param {ModelViewTransform2} modelViewTransform
       * @param {number} value
       * @returns {number}
       */
      assign( 'modelToView',
        ( modelViewTransform, value ) => modelViewTransform.modelToViewX( value ),
        ( modelViewTransform, value ) => modelViewTransform.modelToViewY( value )
      );

      /**
       * Creates a vector (primary,secondary) for horizontal orientations, and (secondary,primary) for vertical
       * orientations.
       * @public
       *
       * @param {number} primary
       * @param {number} secondary
       * @returns {Vector2}
       */
      assign( 'toVector',
        ( primary, secondary ) => new Vector2( primary, secondary ),
        ( primary, secondary ) => new Vector2( secondary, primary )
      );
    }
  } );

  phetCore.register( 'Orientation', Orientation );

  return Orientation;
} );