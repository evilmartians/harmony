// deno-lint-ignore-file no-explicit-any

export type PaletteWithFallback = {
  colorName: string;
  shades: {
    shadeName: string;
    oklch: string;
    srgbFallback: string;
  }[];
}[];

export type BuildTarget = {
  /** relative dir in addition to outdir, to keep at root outdir set to '.' */
  dir: string;
  /** individual output files */
  outputs: {
    /** absolute path to template */
    templatePath: string;
    /**
     * vars passed to template
     * if not specified will include the whole palette
     * take any value compatible with Mustache.js, including
     * JSON-serializable objects and functions.
     */
    templateVars?: Record<string, any>;
    /** filename to write rendered template to */
    file: string;
  }[];
};

export type BuildConfig = BuildTarget | ((palette: PaletteWithFallback) => BuildTarget);
