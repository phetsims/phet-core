// Copyright 2002-2013, University of Colorado Boulder

/**
 * Object instance allocation tracking, so we can cut down on garbage collection.
 *
 * @author Jonathan Olson <olsonsjc@gmail.com>
 */

define( function( require ) {
  'use strict';
  
  return function phetAllocation( name ) {
    if ( window.alloc ) {
      var stack;
      try { throw new Error(); } catch ( e ) { stack = e.stack; }
      
      if ( !window.alloc[name] ) {
        window.alloc[name] = { count: 0, stacks: {} };
      }
      var log = window.alloc[name];
      
      log.count++;
      if ( !log.stacks[stack] ) {
        log.stacks[stack] = 1;
      } else {
        log.stacks[stack] += 1;
      }
      log.report = function() {
        var stacks = Object.keys( log.stacks );
        stacks = _.sortBy( stacks, function( key ) { return log.stacks[key]; } );
        _.each( stacks, function( stack ) {
          console.log( log.stacks[stack] + ': ' + stack );
        } );
      };
    }
  };
} );
