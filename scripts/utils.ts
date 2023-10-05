// deno-lint-ignore-file no-explicit-any

export function makeCJS(content: any) {
  return `'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

module.exports = ${JSON.stringify(content, null, 2)};
`
}