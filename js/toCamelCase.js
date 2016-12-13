// Copyright 2014-2015, University of Colorado Boulder

/**
 * Utility function for converting a string to camel case.
 */
define( function( require ) {
  'use strict';

  var phetCore = require( 'PHET_CORE/phetCore' );

  /**
   * Converts a string to camel case, eg: 'simula-rasa' -> 'simulaRasa'
   * See http://stackoverflow.com/questions/10425287/convert-string-to-camelcase-with-regular-expression
   *
   * @param {string} str - the input string
   * @returns {string} a new string
   */
  function toCamelCase( str ) {
    return str.toLowerCase().replace( /-(.)/g, function( match, group1 ) {
      return group1.toUpperCase();
    } );
  }

  phetCore.register( 'toCamelCase', toCamelCase );

  return toCamelCase;
} );