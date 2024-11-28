![Harmony](cover.png)

[![github.actions.changesets.badge]][github.actions.changesets] [![codecov.badge]][codecov] [![MIT][license.badge]][license] [![npm.badge]][npm]

# Harmony: Accessible UI Color Palette

The
[Harmony palette](https://www.figma.com/community/file/1287828769207775946/harmony-accessible-ui-color-palette)
is designed to elevate control over color contrast in your design system.

- Uses OKLCH and APCA for highly consistent color shades
- Has P3 options for modern screens
- Created to keep precise control over text and UI element contrast

<img src="https://cdn.evilmartians.com/badges/logo-no-label.svg" alt="" width="22" height="16" />  Made
by
<b><a href="https://evilmartians.com/devtools?utm_source=harmony&utm_campaign=devtools-button&utm_medium=github">Evil
Martians</a></b>, product consulting for <b>developer tools</b>.

## Features

- Equal contrast within lightness groups
- Mirrored contrast pairs
- Contrast levels for readability
- Tailwind compatibility
- P3 gamut for maximum color

## Installation

```shell
npm install @evilmartians/harmony
```

## Usage with Tailwind

Harmony can work as drop-in replacement for the Tailwind color palette:

### Tailwind v4

Simply import `@evilmartians/harmony/tailwind.css`:

```css
/* app.css, or anywhere within Tailwind-aware context */
@import "tailwindcss";
@import "@evilmartians/harmony/tailwind.css";
```

### Tailwind v3

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

> ⚠️ Harmony uses `oklch` colors and so requires a polyfill for old browsers

1. Install PostCSS plugin that polyfills oklch colors

```shell
npm install -D @csstools/postcss-oklab-function
```

2. Enable it in `postcss.config.js`:

```diff
export default {
    plugins: {
        tailwindcss: {},
+       '@csstools/postcss-oklab-function': { 'preserve': true },
        autoprefixer: {},
    },
}
```

## Vanilla CSS

Harmony palette provides a set of files with css variables. Each file contains all shades for one color in OKLCH with RGB fallbacks for old browsers. Just import colors you need and use them in css:

```css
@import "@evilmartians/harmony/css/orange.css";

h1 {
  color: var(--orange-600);
}
```

Harmony also provides an `index.css` file that imports all other css files.
👮WARNING: this file is **huge** and should be used only in combination with PurgeCSS (with `variables` option enabled), other tools that can clean unused css variables, or if you really need all the colors.

```css
@import "@evilmartians/harmony/css/index.css";

/* now you can use any color */
h1 {
  color: var(--orange-600);
}

h2 {
  color: var(--red-300);
}
```

## Other formats

Plain javascript object with colors without tailwind's specifics can be imported
from `@evilmartians/harmony/base`

```js
import palette from "@evilmartians/harmony/base";
console.log(palette.red["50"]); // => oklch(0.988281 0.0046875 20)
```

## Development

### Prerequisites

| Dependency                                           | Version | Description       |
| ---------------------------------------------------- | ------- | ----------------- |
| [Deno](https://docs.deno.com/runtime/)               | ^2.0    | Runtime           |
| [Lefthook](https://github.com/evilmartians/lefthook) | ^0.7.0  | Git-hooks manager |

### Publication Workflow

The project uses [changesets](https://github.com/changesets/changesets) to manage versioning and changelog.
Typical workflow is as follow:

1. make changes to codebase,
2. run `deno task changesets` at project root and follow prompt to generate a "changeset" (logging a change),
3. commit both (1) and (2) into git.

The [changesets Github action](./.github/workflows/changesets.yaml) is triggered on `push` to `main` and will create a corresponding "Changesets: Versioning & Publication" pull request, which, upon merged, will trigger publication of the new version to NPM.

[license.badge]: https://img.shields.io/badge/license-MIT-blue.svg
[license]: ./LICENSE
[npm.badge]: https://img.shields.io/npm/v/@evilmartians/harmony
[npm]: https://www.npmjs.com/package/@evilmartians/harmony
[github.actions.changesets.badge]: https://github.com/evilmartians/harmony/actions/workflows/changesets.yaml/badge.svg?branch=main
[github.actions.changesets]: https://github.com/evilmartians/harmony/actions/workflows/changesets.yaml
[codecov.badge]: https://codecov.io/gh/evilmartians/harmony/branch/main/graph/badge.svg?token=fi6Al6JEGA
[codecov]: https://codecov.io/github/evilmartians/harmony?branch=main

