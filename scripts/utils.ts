// deno-lint-ignore-file no-explicit-any

export function makeCJS(content: any) {
  return `module.exports = ${JSON.stringify(content, null, 2)};`
}