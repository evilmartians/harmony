# Harmony: Accessible UI Color Palette

## Installation

```shell
npm install @evilmartians/harmony
```

## Usage

Harmony can work as drop-in replacement for the Tailwind color palette

```js
// tailwind.config.js

import harmonyPalette from "@evilmartians/harmony/tailwind";

export default {
  theme: {
    colors: harmonyPalette,
  },
  //...
};
```

## Polyfill

⚠️ Harmony uses `oklch` colors and requires a polyfill.

1. Install postcss plugin that polyfills oklch colors

```shell
npm install -D @csstools/postcss-oklab-function
```

2. Enable it in `postcss.config.js`:

```diff
export default {
    plugins: {
        tailwindcss: {},
+        '@csstools/postcss-oklab-function': { 'preserve': true },
        autoprefixer: {},
    },
}
```
