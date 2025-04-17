// Copyright 2024-2025, University of Colorado Boulder

/**
 * @author Sam Reid (PhET Interactive Simulations)
 */

import _ from '../../sherpa/js/lodash.js';

const isPhetioEnabled = _.hasIn( window, 'phet.preloads.phetio' );
export default isPhetioEnabled;