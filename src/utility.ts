/**
 * Controls color opacity with flexible input formats
 * @param color - Color in hex (#RGB, #RRGGBB, #RRGGBBAA), rgba(r,g,b,a), rgb(r,g,b), or named color
 * @param opacity - Opacity value from 0 (transparent) to 10 (fully opaque)
 * @returns Color in rgba format with applied opacity
 */
function controlColorOpacity(color: string, opacity: number): string {
  // Validate opacity range
  if (opacity < 0 || opacity > 10) {
    throw new Error("Opacity must be between 0 and 10");
  }

  // Convert opacity from 0-10 scale to 0-1 scale
  const alpha: number = opacity / 10;

  // Parse the color and extract RGB values
  let r: number, g: number, b: number;

  // Remove whitespace
  color = color.trim();

  // Handle hex format (#RGB, #RRGGBB, #RRGGBBAA)
  if (color.startsWith("#")) {
    const hex = color.slice(1);

    if (hex.length === 3) {
      // #RGB format
      r = parseInt(hex[0] + hex[0], 16);
      g = parseInt(hex[1] + hex[1], 16);
      b = parseInt(hex[2] + hex[2], 16);
    } else if (hex.length === 6) {
      // #RRGGBB format
      r = parseInt(hex.slice(0, 2), 16);
      g = parseInt(hex.slice(2, 4), 16);
      b = parseInt(hex.slice(4, 6), 16);
    } else if (hex.length === 8) {
      // #RRGGBBAA format (ignore existing alpha)
      r = parseInt(hex.slice(0, 2), 16);
      g = parseInt(hex.slice(2, 4), 16);
      b = parseInt(hex.slice(4, 6), 16);
    } else {
      throw new Error("Invalid hex color format");
    }
  }
  // Handle rgb/rgba format
  else if (color.startsWith("rgb")) {
    const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (!match) {
      throw new Error("Invalid rgb/rgba color format");
    }
    r = parseInt(match[1]);
    g = parseInt(match[2]);
    b = parseInt(match[3]);
  }
  // Handle named colors
  else {
    const namedColors: Record<string, [number, number, number]> = {
      black: [0, 0, 0],
      white: [255, 255, 255],
      red: [255, 0, 0],
      green: [0, 128, 0],
      blue: [0, 0, 255],
      yellow: [255, 255, 0],
      cyan: [0, 255, 255],
      magenta: [255, 0, 255],
      orange: [255, 165, 0],
      purple: [128, 0, 128],
      pink: [255, 192, 203],
      brown: [165, 42, 42],
      gray: [128, 128, 128],
      grey: [128, 128, 128],
      lime: [0, 255, 0],
      navy: [0, 0, 128],
      teal: [0, 128, 128],
      olive: [128, 128, 0],
      maroon: [128, 0, 0],
      silver: [192, 192, 192],
      gold: [255, 215, 0],
    };

    const colorLower = color.toLowerCase();
    if (namedColors[colorLower]) {
      [r, g, b] = namedColors[colorLower];
    } else {
      throw new Error(`Unsupported color name: ${color}`);
    }
  }

  // Validate RGB values
  if (r! < 0 || r! > 255 || g! < 0 || g! > 255 || b! < 0 || b! > 255) {
    throw new Error("RGB values must be between 0 and 255");
  }

  // Return rgba format with specified opacity
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export { controlColorOpacity };
