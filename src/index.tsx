import React, { useEffect } from "react";
import { Animated, Easing, StyleProp, StyleSheet, View, ViewStyle } from "react-native";

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
 * @param backgroundColor - Base background color (default: '#8485852c')
 * @param animationColor - Shimmer/animation color (default: '#83848578')
 * @param animationStyle - Type of animation to display (default: 'linear')
 * @param borderRadius - Border radius of the placeholder (default: 4)
 * @param style - Additional custom styles for the container
 */
const SmartPlaceholder: React.FC<SmartPlaceholderProps> = ({
  width = 100,
  height = 20,
  backgroundColor = "#8485852c",
  animationColor = "#83848578",
  animationStyle = "fade",
  borderRadius = 4,
  style,
}) => {
  // Animated value for all animation types
  const animatedValue = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Skip animation for skeleton style
    if (animationStyle === "skeleton") {
      return;
    }

    // Configure animation based on style
    const duration = animationStyle === "pulse" || animationStyle === "fade" ? 1500 : 1200;

    const animation = Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration,
        easing: animationStyle === "pulse" ? Easing.ease : Easing.linear,
        useNativeDriver: false, // Required for positioning and color animations
      })
    );

    animation.start();

    return () => {
      animation.stop();
      animatedValue.setValue(0);
    };
  }, [animationStyle, animatedValue]);

  /**
   * Render Linear Shimmer Animation
   * Animates a colored bar from left to right across the placeholder
   */
  const renderLinear = () => {
    const containerWidth = typeof width === "number" ? width : 100;
    const shimmerWidth = containerWidth * 0.3; // Shimmer is 30% of container width

    const translateX = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-shimmerWidth, containerWidth],
    });

    return (
      <View style={[styles.container, { width, height, backgroundColor, borderRadius }, style]}>
        <Animated.View
          style={[
            styles.shimmer,
            {
              transform: [{ translateX }],
              width: shimmerWidth,
              backgroundColor: animationColor,
            },
          ]}
        />
      </View>
    );
  };

  /**
   * Render Radial Shimmer Animation
   * Simulates a circular light sweep using scale and opacity
   */
  const renderRadial = () => {
    const scale = animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0.5, 1.5, 0.5],
    });

    const opacity = animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0.3, 1, 0.3],
    });

    return (
      <View style={[styles.container, { width, height, backgroundColor, borderRadius }, style]}>
        <Animated.View
          style={[
            styles.radialLayer,
            {
              transform: [{ scale }],
              opacity,
              backgroundColor: animationColor,
            },
          ]}
        />
      </View>
    );
  };

  /**
   * Render Directional Shimmer Animation
   * Animates a colored bar from top to bottom
   */
  const renderDirectional = () => {
    const containerHeight = typeof height === "number" ? height : 20;
    const shimmerHeight = containerHeight * 0.3; // Shimmer is 30% of container height

    const translateY = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-shimmerHeight, containerHeight],
    });

    return (
      <View style={[styles.container, { width, height, backgroundColor, borderRadius }, style]}>
        <Animated.View
          style={[
            styles.shimmer,
            {
              transform: [{ translateY }],
              height: shimmerHeight,
              width: "100%",
              backgroundColor: animationColor,
            },
          ]}
        />
      </View>
    );
  };

  /**
   * Render Reverse Shimmer Animation
   * Animates a colored bar from right to left (reverse of linear)
   */
  const renderReverse = () => {
    const containerWidth = typeof width === "number" ? width : 100;
    const shimmerWidth = containerWidth * 0.3; // Shimmer is 30% of container width

    const translateX = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [containerWidth, -shimmerWidth],
    });

    return (
      <View style={[styles.container, { width, height, backgroundColor, borderRadius }, style]}>
        <Animated.View
          style={[
            styles.shimmer,
            {
              transform: [{ translateX }],
              width: shimmerWidth,
              backgroundColor: animationColor,
            },
          ]}
        />
      </View>
    );
  };

  /**
   * Render Pulse Animation
   * Fades opacity in and out smoothly
   */
  const renderPulse = () => {
    const opacity = animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0.3, 1, 0.3],
    });

    return (
      <Animated.View
        style={[
          styles.container,
          {
            width,
            height,
            backgroundColor: animationColor,
            borderRadius,
            opacity,
          },
          style,
        ]}
      />
    );
  };

  /**
   * Render Fade Animation
   * Animates between base color and animation color
   */
  const renderFade = () => {
    const bgColor = animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [backgroundColor, animationColor, backgroundColor],
    });

    return (
      <Animated.View
        style={[
          styles.container,
          {
            width,
            height,
            backgroundColor: bgColor,
            borderRadius,
          },
          style,
        ]}
      />
    );
  };

  /**
   * Render Skeleton (Static)
   * No animation, just a static placeholder
   */
  const renderSkeleton = () => {
    return (
      <View
        style={[
          styles.container,
          {
            width,
            height,
            backgroundColor,
            borderRadius,
          },
          style,
        ]}
      />
    );
  };

  // Select appropriate render method based on animation style
  switch (animationStyle) {
    case "linear":
      return renderLinear();
    case "radial":
      return renderRadial();
    case "directional":
      return renderDirectional();
    case "reverse":
      return renderReverse();
    case "pulse":
      return renderPulse();
    case "fade":
      return renderFade();
    case "skeleton":
      return renderSkeleton();
    default:
      return renderLinear();
  }
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
  },
  shimmer: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
  },
  radialLayer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "100%",
    height: "100%",
    borderRadius: 9999,
    marginLeft: "-50%",
    marginTop: "-50%",
  },
});

export default SmartPlaceholder;
