import React from "react";
import { StyleProp, ViewStyle } from "react-native";
interface SmartPlaceholderProps {
    width?: number | string;
    height?: number | string;
    backgroundColor?: string;
    animationColor?: string;
    animationStyle?: "linear" | "radial" | "directional" | "reverse" | "pulse" | "fade" | "skeleton";
    borderRadius?: number;
    style?: StyleProp<ViewStyle>;
}
/**
 * SmartPlaceholder Component
 *
 * A fully customizable shimmer/placeholder component for React Native with multiple animation styles.
 * Uses LinearGradient from expo-linear-gradient for smooth shimmer effects.
 *
 * @param width - Width of the placeholder (default: 300)
 * @param height - Height of the placeholder (default: 200)
 * @param backgroundColor - Base background color (default: '#e0e0e0')
 * @param animationColor - Shimmer/animation color (default : animationStyle === "fade" || animationStyle === "pulse"? "rgba(150, 149, 149, 0.8)" : "rgba(255, 255, 255, 0.8)")
 * @param animationStyle - Type of animation to display (default: 'fade')
 * @param borderRadius - Border radius of the placeholder (default: 4)
 * @param style - Additional custom styles for the container
 */
declare const SmartPlaceholder: React.FC<SmartPlaceholderProps>;
export default SmartPlaceholder;
