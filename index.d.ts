/**
 * @tsonic/dotnet-globals
 *
 * Global type definitions for Tsonic in dotnet mode.
 *
 * These provide the minimal global/intrinsic types required by TypeScript
 * when noLib: true is set, while preserving .NET semantics.
 *
 * Key principle: Array<T> must NOT have JS members like .length or .map
 * This enforces that dotnet mode uses BCL/LINQ patterns only.
 *
 * Shared types (utility types, iterators, Promise, Symbol) are provided by
 * @tsonic/globals which should be included in typeRoots alongside this package.
 */

declare global {
  /**
   * Array type - intentionally minimal, no JS methods
   * In dotnet mode, arrays are List<T> compatible
   * Use LINQ methods via System.Linq, not JS array methods
   */
  interface Array<T> {
    // Intentionally NO length, map, filter, etc.
    // Use List<T> methods or LINQ instead
    [n: number]: T;
    [Symbol.iterator](): IterableIterator<T>;
  }

  interface ReadonlyArray<T> {
    readonly [n: number]: T;
    [Symbol.iterator](): IterableIterator<T>;
  }

  /**
   * String - primitive wrapper, no JS methods
   * Use System.String BCL methods instead
   */
  interface String {
    // Intentionally minimal - no .length, .slice, etc.
    // Use BCL String methods
  }

  interface Number {
    // Intentionally minimal
  }

  interface Boolean {
    // Intentionally minimal
  }

  /**
   * Object - minimal definition
   */
  interface Object {
    constructor: Function;
  }

  /**
   * Function - minimal definition
   */
  interface Function {
    prototype: any;
  }

  /**
   * Required TypeScript compiler internals
   */
  interface CallableFunction extends Function {}
  interface NewableFunction extends Function {}
  interface IArguments {}

  /**
   * RegExp - basic definition
   */
  interface RegExp {}
}

// This export is required to make this file a module
export {};
