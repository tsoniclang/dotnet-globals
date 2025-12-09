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
  }

  interface ReadonlyArray<T> {
    readonly [n: number]: T;
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

  /**
   * Symbol - basic definition
   */
  interface SymbolConstructor {
    readonly iterator: symbol;
    readonly asyncIterator: symbol;
  }
  const Symbol: SymbolConstructor;

  /**
   * PropertyKey - required for index signatures
   */
  type PropertyKey = string | number | symbol;

  /**
   * Utility types (built into TypeScript, needed for type operations)
   */
  type Partial<T> = { [P in keyof T]?: T[P] };
  type Required<T> = { [P in keyof T]-?: T[P] };
  type Readonly<T> = { readonly [P in keyof T]: T[P] };
  type Pick<T, K extends keyof T> = { [P in K]: T[P] };
  type Record<K extends keyof any, T> = { [P in K]: T };
  type Exclude<T, U> = T extends U ? never : T;
  type Extract<T, U> = T extends U ? T : never;
  type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
  type NonNullable<T> = T extends null | undefined ? never : T;
  type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;
  type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
  type InstanceType<T extends new (...args: any) => any> = T extends new (...args: any) => infer R ? R : any;

  /**
   * Promise - minimal definition for async/await
   */
  interface Promise<T> {
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
    ): Promise<TResult1 | TResult2>;
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null
    ): Promise<T | TResult>;
  }

  interface PromiseLike<T> {
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
    ): PromiseLike<TResult1 | TResult2>;
  }

  interface PromiseConstructor {
    new <T>(executor: (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void): Promise<T>;
    resolve<T>(value: T | PromiseLike<T>): Promise<T>;
    reject<T = never>(reason?: any): Promise<T>;
    all<T>(values: readonly (T | PromiseLike<T>)[]): Promise<T[]>;
  }

  const Promise: PromiseConstructor;

  /**
   * Iterator types (for for-of loops)
   */
  interface Iterator<T, TReturn = any, TNext = undefined> {
    next(...args: [] | [TNext]): IteratorResult<T, TReturn>;
    return?(value?: TReturn): IteratorResult<T, TReturn>;
    throw?(e?: any): IteratorResult<T, TReturn>;
  }

  interface IteratorResult<T, TReturn = any> {
    done: boolean;
    value: T | TReturn;
  }

  interface IteratorYieldResult<T> {
    done: false;
    value: T;
  }

  interface IteratorReturnResult<TReturn> {
    done: true;
    value: TReturn;
  }

  interface Iterable<T> {
    [Symbol.iterator](): Iterator<T>;
  }

  interface IterableIterator<T> extends Iterator<T> {
    [Symbol.iterator](): IterableIterator<T>;
  }

  /**
   * Async Iterator types (for for-await loops)
   */
  interface AsyncIterator<T, TReturn = any, TNext = undefined> {
    next(...args: [] | [TNext]): Promise<IteratorResult<T, TReturn>>;
    return?(value?: TReturn | PromiseLike<TReturn>): Promise<IteratorResult<T, TReturn>>;
    throw?(e?: any): Promise<IteratorResult<T, TReturn>>;
  }

  interface AsyncIterable<T> {
    [Symbol.asyncIterator](): AsyncIterator<T>;
  }

  interface AsyncIterableIterator<T> extends AsyncIterator<T> {
    [Symbol.asyncIterator](): AsyncIterableIterator<T>;
  }

  /**
   * Generator types
   */
  interface Generator<T = unknown, TReturn = any, TNext = unknown> extends Iterator<T, TReturn, TNext> {
    next(...args: [] | [TNext]): IteratorResult<T, TReturn>;
    return(value: TReturn): IteratorResult<T, TReturn>;
    throw(e: any): IteratorResult<T, TReturn>;
    [Symbol.iterator](): Generator<T, TReturn, TNext>;
  }

  interface AsyncGenerator<T = unknown, TReturn = any, TNext = unknown> extends AsyncIterator<T, TReturn, TNext> {
    next(...args: [] | [TNext]): Promise<IteratorResult<T, TReturn>>;
    return(value: TReturn | PromiseLike<TReturn>): Promise<IteratorResult<T, TReturn>>;
    throw(e: any): Promise<IteratorResult<T, TReturn>>;
    [Symbol.asyncIterator](): AsyncGenerator<T, TReturn, TNext>;
  }

  /**
   * Template literal type utilities
   */
  type Uppercase<S extends string> = intrinsic;
  type Lowercase<S extends string> = intrinsic;
  type Capitalize<S extends string> = intrinsic;
  type Uncapitalize<S extends string> = intrinsic;
}

// This export is required to make this file a module
export {};
