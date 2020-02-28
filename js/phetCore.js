// Copyright 2013-2020, University of Colorado Boulder


import Namespace from './Namespace.js';

const phetCore = new Namespace( 'phetCore' );

// Namespace can't require this file, so we register it as a special case.
phetCore.register( 'Namespace', Namespace );

export default phetCore;