export function makeCJS(content: any) {
  return `module.exports = ${JSON.stringify(content, null, 2)};`
}