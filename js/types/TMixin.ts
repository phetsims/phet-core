// Copyright 2024, University of Colorado Boulder

/**
 * A mixin type that can be used to add additional API to a class. To support generating d.ts files, we often export mixin
 * types via a type assertion, since type inference is not powerful enough to infer the mixin type and generate d.ts files.
 *
 * For example:
 * export default Leaf as TMixin<Node>;
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
import Constructor from './Constructor.js';

/**
 * The Parent is the type the mixin is being applied to, and MixinAPI is the additional API that the mixin provides, if any.
 */
type TMixin<Parent, MixinAPI = Record<string, never>> = <T extends Constructor<Parent>>( type: T ) => T & Constructor<MixinAPI>;
export default TMixin;