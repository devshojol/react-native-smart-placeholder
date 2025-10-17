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
 * Uses only React Native's Animated API - no external dependencies required.
 *
 * @param width - Width of the placeholder (default: 100)
 * @param height - Height of the placeholder (default: 20)
 * @param backgroundColor - Base background color (default: '#E1E9EE')
 * @param animationColor - Shimmer/animation color (default: '#F2F8FC')
 * @param animationStyle - Type of animation to display (default: 'linear')
 * @param borderRadius - Border radius of the placeholder (default: 4)
 * @param style - Additional custom styles for the container
 */
declare const SmartPlaceholder: React.FC<SmartPlaceholderProps>;
export default SmartPlaceholder;
