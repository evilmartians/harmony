// deno-lint-ignore-file no-explicit-any

export function generateCJS(content: any) {
  return `'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

module.exports = ${JSON.stringify(content, null, 2)};
`;
}

export function generateEsm(content: any) {
  return `
  export default ${JSON.stringify(content, null, 2)};
`;
}

export function generateTypes(
  content: Record<string, string | Record<string, string>>,
) {
  const types = Object.entries(content)
    .map(([key, value]) => {
      if (typeof value === "string") {
        return `  let ${key}: string;`;
      } else {
        const nested = Object.keys(value).map((shade) =>
          `    ${shade}: string;`
        ).join(
          "\n",
        );
        return `  let ${key}: {\n${nested}\n  };`;
      }
    }).join("\n");

  return `declare namespace _default {
${types}
}
export default _default;
`;
}
