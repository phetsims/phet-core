// Copyright 2014-2023, University of Colorado Boulder

/**
 * Abstraction for timed-event series that helps with variable frame-rates. Useful for things that need to happen at a
 * specific rate real-time regardless of the frame-rate.
 *
 * An EventTimer is created with a specific event "model" that determines when events occur, and a callback that will
 * be triggered for each event (with its time elapsed since it should have occurred). Thus, each callback basically
 * says:
 * - "an event happened <timeElapsed> ago"
 *
 * To have the EventTimer step forward in time (firing callbacks for every event that would have occurred over that
 * time frame, if any), call step( realTimeElapsed ).
 *
 * -----------------------------------------
 *
 * For example, create a timer with a constant rate that will fire events every 1 time units:
 *
 * var timer = new phet.phetCore.EventTimer( new phetCore.EventTimer.ConstantEventModel( 1 ), function( timeElapsed ) {
 *   console.log( 'event with timeElapsed: ' + timeElapsed );
 * } );
 *
 * Stepping once for 1.5 time units will fire once (0.5 seconds since the "end" of the step), and will be 0.5 seconds
 * from the next step:
 *
 * timer.step( 1.5 );
 * > event with timeElapsed: 0.5
 *
 * The 0.5 above is because after 1.5 seconds of time, the event will have happened 0.5 seconds ago:
 *
 *           step 1.5
 * |------------------------>|
 * |                *        |          *                     *    <- constant time of 1 between each event
 * |                <--------|
 *                 0.5 seconds past the event now
 *
 * Stepping for a longer time will result in more events:
 *
 * timer.step( 6 );
 * > event with timeElapsed: 5.5
 * > event with timeElapsed: 4.5
 * > event with timeElapsed: 3.5
 * > event with timeElapsed: 2.5
 * > event with timeElapsed: 1.5
 * > event with timeElapsed: 0.5
 *
 *       step 1.5                                  step 6                                 step 0   step 1.5
 * |---------------->|---------------------------------------------------------------------->|---------------->|
 * |           *           *           *           *           *           *           *           *           *
 * |           <-----|     <-----------------------------------------------------------------|     <-----------|
 * |          0.5         5.5          <-----------------------------------------------------|     1           0
 * |           ^           ^          4.5          <-----------------------------------------|              event at
 * |           |           |                      3.5          <-----------------------------|              current
 * |           |           |                                  2.5          <-----------------|              time
 * |     callback( t ) called, etc.                                       1.5          <-----|
 * |
 *
 * A step with zero time will trigger no events:
 *
 * timer.step( 0 );
 *
 * The timer will fire an event once it reaches the exact point in time:
 *
 * timer.step( 1.5 );
 * > event with timeElapsed: 1
 * > event with timeElapsed: 0
 *
 * NOTE:
 * If your timer callbacks create model objects that would also get stepped forward, make sure to step forward objects
 * before calling eventTimer.step(), so that objects don't get stepped twice. Usually the callback will have:
 * - var modelElement = new ModelElement();
 * - modelElement.step( callbackTimeElapsed );
 * And you don't want to apply step( dt ) to it directly afterwards.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import phetCore from './phetCore.js';

export default class EventTimer {

  private period: number;
  private timeBeforeNextEvent: number;

  /*
   * Create an event timer with a specific model (determines the time between events), and a callback to be called
   * for events.
   *
   * @param eventModel: getPeriodBeforeNextEvent() will be called at
   *    the start and after every event to determine the time required to pass by before the next event occurs.
   * @param eventCallback - Will be called for every event. The timeElapsed passed in as the
   *    only argument denotes the time elapsed since the event would have occurred. E.g. if we step for 5 seconds and
   *    our event would have occurred 1 second into that step, the timeElapsed will be 4 seconds, since after the end
   *    of the 5 seconds the event would have happened 4 seconds ago.
   */
  public constructor( private readonly eventModel: { getPeriodBeforeNextEvent: () => number }, private readonly eventCallback: ( timeElapsed: number ) => void ) {
    this.period = this.eventModel.getPeriodBeforeNextEvent();
    this.timeBeforeNextEvent = this.period;
  }

  /**
   * Steps the timer forward by a certain amount of time. This may cause 0 or more events to actually occur.
   */
  public step( dt: number ): void {
    while ( dt >= this.timeBeforeNextEvent ) {
      dt -= this.timeBeforeNextEvent;
      this.period = this.eventModel.getPeriodBeforeNextEvent();
      this.timeBeforeNextEvent = this.period;

      // how much time has elapsed since this event began
      this.eventCallback( dt );
    }

    // use up the remaining DT
    this.timeBeforeNextEvent -= dt;
  }

  /**
   * Returns how far we are to the next event firing (where 0 is an event "just" fired, and 1 is the next event
   * firing).
   *
   * @returns In the range [0,1). Is inclusive for 0, but exclusive for 1.
   */
  public getRatio(): number {
    return ( this.period - this.timeBeforeNextEvent ) / this.period;
  }

  public static readonly ConstantEventModel = class ConstantEventModel {

    /*
     * Event model that will fire events at a constant rate. An event will occur every 1/rate time units.
     */
    public constructor( private readonly rate: number ) {
      assert && assert( rate > 0, 'We need to have a strictly positive rate in order to prevent infinite loops.' );
    }

    public getPeriodBeforeNextEvent(): number {
      return 1 / this.rate;
    }
  };

  public static readonly UniformEventModel = class UniformEventModel {
    
    /*
     * Event model that will fire events averaging a certain rate, but with the time between events being uniformly
     * random.
     *
     * The pseudoRandomNumberSource, when called, should generate uniformly distributed random numbers in the range [0,1).
     */
    public constructor( private readonly rate: number, private readonly pseudoRandomNumberSource: () => number ) {
      assert && assert( rate > 0, 'We need to have a strictly positive rate in order to prevent infinite loops.' );
    }

    public getPeriodBeforeNextEvent(): number {
      const uniformRandomNumber = this.pseudoRandomNumberSource();
      assert && assert( uniformRandomNumber >= 0 && uniformRandomNumber < 1,
        `Our uniform random number is outside of its expected range with a value of ${uniformRandomNumber}` );

      // sample the exponential distribution
      return uniformRandomNumber * 2 / this.rate;
    }
  };

  public static readonly PoissonEventModel = class PoissonEventModel {

    /*
     * Event model that will fire events corresponding to a Poisson process with the specified rate.
     * The pseudoRandomNumberSource, when called, should generate uniformly distributed random numbers in the range [0,1).
     */
    public constructor( private readonly rate: number, private readonly pseudoRandomNumberSource: () => number ) {
      assert && assert( rate > 0,
        'We need to have a strictly positive poisson rate in order to prevent infinite loops.' );
    }

    public getPeriodBeforeNextEvent(): number {

      // A poisson process can be described as having an independent exponential distribution for the time between
      // consecutive events.
      // see http://en.wikipedia.org/wiki/Exponential_distribution#Generating_exponential_variates and
      // http://en.wikipedia.org/wiki/Poisson_process

      const uniformRandomNumber = this.pseudoRandomNumberSource();
      assert && assert( uniformRandomNumber >= 0 && uniformRandomNumber < 1,
        `Our uniform random number is outside of its expected range with a value of ${uniformRandomNumber}` );

      // sample the exponential distribution
      return -Math.log( uniformRandomNumber ) / this.rate;
    }
  };
}

phetCore.register( 'EventTimer', EventTimer );