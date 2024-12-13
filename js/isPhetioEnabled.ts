// Copyright 2024, University of Colorado Boulder

/**
 * @author Sam Reid (PhET Interactive Simulations)
 */
const isPhetioEnabled = _.hasIn( window, 'phet.preloads.phetio' );
export default isPhetioEnabled;