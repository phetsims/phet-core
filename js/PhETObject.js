// Copyright 2017, University of Colorado Boulder

/**
 * Base type for PhET instances, provides support for PhET-iO features when running with PhET-iO enabled.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var ObjectIO = require( 'ifphetio!PHET_IO/types/ObjectIO' );
  var phetCore = require( 'PHET_CORE/phetCore' );
  var phetioEvents = require( 'ifphetio!PHET_IO/phetioEvents' );
  var Tandem = require( 'TANDEM/Tandem' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function PhETObject( options ) {
    options = _.extend( {
      tandem: Tandem.tandemOptional(), // By default tandems are optional, but subtypes can specify this as
                                       // `Tandem.tandemRequired` to enforce its presence
      phetioType: ObjectIO, // Supply the appropriate IO type
      phetioState: true, // To include the instance in the state
      phetioEvents: true, // To permit into the phet-io events stream
      phetioReadOnly: false, // When true, you can only get values from the instance; no setting allowed.
      phetioInstanceDocumentation: '' // Useful notes about an instrumented instance, shown in instance-proxies
    }, options );

    // @public - used to map model tandem names to view objects (by using tandem.tail)
    // TODO: rename to this.tandem after all other this.*tandems deleted
    // TODO: do we need phetioID if we have phetObjectTandem?
    this.phetObjectTandem = options.tandem;

    // @private - the IO type associated with this instance
    this.phetioType = options.phetioType;

    // Register with the tandem registry
    this.phetObjectTandem.addInstance( this, options );
  }

  phetCore.register( 'PhETObject', PhETObject );

  return inherit( Object, PhETObject, {

    /**
     * Start an event for the nested PhET-iO event stream.
     *
     * @param {string} eventType - 'model' | 'view'
     * @param {string} event - the name of the event
     * @param {Object} [args] - arguments for the event
     * @returns {number}
     */
    startEvent: function( eventType, event, args ) {
      return this.phetObjectTandem.isLegalAndUsable() && phetioEvents.start( eventType, this.phetObjectTandem.id, this.phetioType, event, args );
    },

    /**
     * End an event on the nested PhET-iO event stream.
     * @param {number} id
     */
    endEvent: function( id ) {
      this.phetObjectTandem.isLegalAndUsable() && phetioEvents.end( id );
    },

    /**
     * Unregisters from tandem when longer used.
     */
    dispose: function() {

      // Tandem de-registration
      this.phetObjectTandem.removeInstance( this );
    }
  } );
} );