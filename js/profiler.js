// Copyright 2002-2013, University of Colorado Boulder

/**
 * Simple profiler which handles nested calls which provides a composite view, to help for micro-optimization.
 * Usage:
 * profiler.start('updateScene');
 * ...
 * profiler.start('moveObjects');
 * ...
 * profiler.stop();
 * ...
 * profiler.stop();
 * See testSelf() for a larger example. This could be used on ipad for instance.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';
  var stack = [];
  var results = {};
  var count = 0;
  var listeners = [];
  var profiler = {
    displayCount: 1000,
    start: function( name ) {
      var time = Date.now();
      stack.push( {name: name, time: time} );
    },
    addListener: function( listener ) {
      listeners.push( listener );
    },
    stop: function() {
      var end = Date.now();
      var top = stack.pop();
      var elapsed = end - top.time;
      if ( !results[top.name] ) {
        results[top.name] = [];
      }
      //TODO: this may be a memory problem, consider coalescing (averaging or summing) values here
      results[top.name].push( elapsed );
      count++;
      if ( count % this.displayCount === 0 ) {
        var summary = JSON.stringify( this.toJSON() );

        console.log( summary );

        //Also notify listeners that a new result was obtained
        for ( var i = 0; i < listeners.length; i++ ) {
          listeners[i]( summary );
        }
        results = {};
      }
    },
    toJSON: function() {
      var summary = {};
      var sum;
      for ( var property in results ) {
        sum = 0;
        for ( var i = 0; i < results[property].length; i++ ) {
          var time = results[property][i];
          sum += time;
        }
        var average = sum / results[property].length;
        summary[property] = {average: average, count: results[property].length};
      }
      return summary;
    },

    //sanity test
    testSelf: function() {
      var profiler = this;
      this.displayCount = 10000000;//Only show final result
      for ( var i = 0; i < 10; i++ ) {
        profiler.start( 'physics' );
        for ( var k = 0; k < 10000; k++ ) {
          profiler.start( 'mloop' );
          for ( var m = 0; m < 10000; m++ ) {
            var a = 100 * 200;
          }
          profiler.stop();
          profiler.start( 'xloop' );
          for ( var x = 0; x < 20000; x++ ) {
            var b = 100 * 200;
          }
          profiler.stop();
        }
        profiler.stop();
      }

      console.log( JSON.stringify( this.toJSON() ) );

      //sample correct output on chrome: {"mloop":{"average":0.01675,"count":100000},"xloop":{"average":0.03254,"count":100000},"physics":{"average":498.9,"count":10}}
    }
  };
//  profiler.testSelf();
  return profiler;
} );
