# A patch for `rollup` that allows you to consume `default` and `named` exports from your library like this,

```js
// Default export
const lib = require('your-library')
lib('Hello') // <-- instead of using `.default` property

// Named exports
const { namedExport1, namedExport2 } = lib

// One liner syntex. This is also supported.
const { default: defaultExport, namedExport1, namedExport2 } = require('your-library')
```

Your library (sample code for context):

```js
export default function defaultExport(msg) {
  console.log(`${msg} from default export`)
}

export const namedExport1 = 'named export 1'
export const namedExport2 = 'named export 2'
```

## Why?

For syntactic sugar.

```js
// Without this patch if you transform ESM to CJS
// and have both `default` and `named` exports in a single file,
// whatever you export as default will get assigned to
// `module.exports.default` instead of `module.exports`.
// So if somebody `require()`s your module they'll have to
// access your default export like this,
const lib = require('your-library').default // <-- it looks bad
//                                  ^^^^^^^
```

Read [this](https://stackoverflow.com/questions/58246998/mixing-default-and-named-exports-with-rollup) and [this thread](https://github.com/rollup/rollup/issues/1961) for more context.

## How to use the patch? <sub><sup><sub><sup>([pnpm version](https://github.com/avisek/rollup-patch-seamless-default-export/tree/pnpm))</sup></sub></sup></sub>

Download and include the [patch file](https://github.com/avisek/rollup-patch-seamless-default-export/blob/npm/patches/rollup+3.29.4.patch)

```diff
  .
  ├── ...
+ ├── patches
+ │   └── rollup+3.29.4.patch
  └── package.json
```

Add `postinstall` script in `package.json`

```diff
  ...
  "scripts": {
    "build": "rollup -c",
+   "postinstall": "patch-package"
  },
  "devDependencies": {
    "rollup": "^3.29.4"   <-- Make sure rollup's version is the same as the patch
  }
  ...
```

Install `patch-package`

```sh
npm install patch-package --save-dev
```
Done.

## How does it work?

It modifies `rollup`'s output like this,

```diff
+ exports = module.exports = defaultExport;
+ exports.default = defaultExport;
  exports.namedExport1 = namedExport1;
  exports.namedExport2 = namedExport2;
- exports.default = defaultExport;
```

## Caveats

You can not use primitive type values (e.g. `string`, `number`, `boolean`) as your `defaut` export. If you do then your `named` exports will not work.
