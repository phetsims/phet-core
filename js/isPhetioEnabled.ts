// Copyright 2024-2025, University of Colorado Boulder

import _ from '../../sherpa/js/lodash.js';

/**
 * @author Sam Reid (PhET Interactive Simulations)
 */
const isPhetioEnabled = _.hasIn( window, 'phet.preloads.phetio' );
export default isPhetioEnabled;