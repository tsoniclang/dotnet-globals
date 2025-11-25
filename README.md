# @tsonic/dotnet-globals

Global type definitions for Tsonic in **dotnet mode**.

## Purpose

This package provides the minimal global/intrinsic types required by TypeScript when `noLib: true` is set, while preserving .NET semantics.

**Key principle:** In dotnet mode, JavaScript array/string methods are NOT available. Use BCL and LINQ instead.

## Usage

Install this package in your Tsonic project:

```bash
npm install @tsonic/dotnet-globals
```

Add to your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "noLib": true,
    "types": ["@tsonic/dotnet-globals"]
  }
}
```

Set your `tsonic.json` mode (or omit for default):

```json
{
  "mode": "dotnet"
}
```

## What This Provides

### Minimal Global Types

- `Array<T>` - **WITHOUT** JS methods like `.length`, `.map`, `.filter`
- `String` - **WITHOUT** JS methods like `.slice`, `.includes`
- `Number`, `Boolean`, `Object`, `Function` - minimal definitions
- `Promise<T>` - for async/await support
- Iterator types - for `for-of` loops
- Utility types - `Partial`, `Readonly`, `Pick`, etc.

### What's NOT Included

- **No `.length` on arrays** - use `list.Count` from BCL
- **No `.map()`, `.filter()`, etc.** - use LINQ methods from `System.Linq`
- **No string instance methods** - use BCL `String` static methods
- **No DOM types** - no `File`, `Document`, `HTMLElement`, etc.
- **No Node.js types** - no `Buffer`, `process`, etc.

## Example

```typescript
import { Console } from "System";
import { List } from "System.Collections.Generic";

// Array literals are List<T> compatible
const numbers = [1, 2, 3, 4, 5];

// ❌ ERROR: Property 'length' does not exist on type 'number[]'
// console.log(numbers.length);

// ✅ CORRECT: Use BCL List<T> methods
const list = new List<number>(numbers);
Console.WriteLine(list.Count); // 5

// ❌ ERROR: Property 'map' does not exist on type 'number[]'
// const doubled = numbers.map(x => x * 2);

// ✅ CORRECT: Use LINQ
import { Enumerable } from "System.Linq";
const doubled = Enumerable.Select(numbers, x => x * 2);
```

## Mode Switching

To switch to JavaScript semantics (with `.length`, `.map()`, etc.), use `@tsonic/js-globals` instead:

1. Uninstall this package: `npm uninstall @tsonic/dotnet-globals`
2. Install JS globals: `npm install @tsonic/js-globals`
3. Update `tsconfig.json`: `"types": ["@tsonic/js-globals"]`
4. Update `tsonic.json`: `"mode": "js"`

## License

MIT
