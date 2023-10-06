export type PaletteWithFallback = {
  [key: string]: {
    [key: string]: {
      oklch: string;
      rgbFallback: string;
    };
  };
};

export type SimplePalette = {
  [key: string]: {
    [key: string]: string;
  };
};

export type ExportTarget = (args: {
  targetDir: string;
  palette: PaletteWithFallback;
}) => Promise<void>;
