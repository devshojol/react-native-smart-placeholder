/**
 * Controls color opacity with flexible input formats
 * @param color - Color in hex (#RGB, #RRGGBB, #RRGGBBAA), rgba(r,g,b,a), rgb(r,g,b), or named color
 * @param opacity - Opacity value from 0 (transparent) to 10 (fully opaque)
 * @returns Color in rgba format with applied opacity
 */
declare function controlColorOpacity(color: string, opacity: number): string;
export { controlColorOpacity };
