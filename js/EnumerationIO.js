// Copyright 2018-2022, University of Colorado Boulder

/**
 * IO Type for phet-core EnumerationDeprecated that supports serializing and deserializing values. Cannot be moved to the core
 * type since EnumerationDeprecated must be defined before ValidatorDef can be defined.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Michael Kauzmann (PhET Interactive Simulations)
 *
 */

// TODO: deprecate this file and move RichEnumeration over here, https://github.com/phetsims/phet-core/issues/98
import RichEnumerationIO from '../../axon/js/RichEnumerationIO.js';


export default RichEnumerationIO;