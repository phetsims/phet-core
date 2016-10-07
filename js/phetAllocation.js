// Copyright 2013-2015, University of Colorado Boulder

/**
 * Object instance allocation tracking, so we can cut down on garbage collection.
 *
 * Sample usage:
 * 1. Run the sim and set up the scenario that you wish to profile
 * 2. In the JS console, type: window.alloc={}
 * 3. Wait until you have taken enough data
 * 4. Type x = window.alloc; delete window.alloc;
 *
 * Now you can inspect the x variable which contains the allocation information.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

define( function( require ) {
  'use strict';

  var phetCore = require( 'PHET_CORE/phetCore' );

  function phetAllocation( name, x ) {
    if ( window.alloc && x ) {
      var stack;
      try { throw new Error(); }
      catch( e ) { stack = e.stack; }

      if ( !window.alloc[ name ] ) {
        window.alloc[ name ] = { count: 0, stacks: {} };
      }
      var log = window.alloc[ name ];

      log.count++;
      if ( !log.stacks[ stack ] ) {
        log.stacks[ stack ] = 1;
      }
      else {
        log.stacks[ stack ] += 1;
      }
      log.report = function() {
        var stacks = Object.keys( log.stacks );
        stacks = _.sortBy( stacks, function( key ) { return log.stacks[ key ]; } );
        _.each( stacks, function( stack ) {
          console.log( log.stacks[ stack ] + ' occurrences for this stack: ' + stack );
        } );
      };
    }
  }

  phetCore.register( 'phetAllocation', phetAllocation );

  return phetAllocation;
} );