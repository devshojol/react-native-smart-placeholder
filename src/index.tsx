import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import { Animated, DimensionValue, Easing, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { controlColorOpacity } from "./utility";

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
const SmartPlaceholder: React.FC<SmartPlaceholderProps> = ({
  width = "100%",
  height = 200,
  animationStyle = "fade",
  backgroundColor = "#e0e0e0",
  animationColor = animationStyle === "fade" || animationStyle === "pulse"
    ? "rgba(150, 149, 149, 0.8)"
    : "rgba(255, 255, 255, 0.8)",
  borderRadius = 12,
  style,
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (animationStyle === "skeleton") {
      return;
    }

    let duration: number;
    let easing: any;

    switch (animationStyle) {
      case "pulse":
        duration = 1800;
        easing = Easing.inOut(Easing.ease);
        break;
      case "fade":
        duration = 2000;
        easing = Easing.inOut(Easing.sin);
        break;
      case "radial":
        duration = 1600;
        easing = Easing.inOut(Easing.quad);
        break;
      case "directional":
      case "reverse":
        duration = 1400;
        easing = Easing.inOut(Easing.cubic);
        break;
      default: // linear
        duration = 1500;
        easing = Easing.bezier(0.4, 0, 0.6, 1);
    }

    const animation = Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration,
        easing,
        useNativeDriver: true,
      })
    );

    animation.start();

    return () => {
      animation.stop();
      animatedValue.setValue(0);
    };
  }, [animationStyle, animatedValue]);

  /**
   * Render Linear Shimmer Animation with Gradient
   */
  const renderLinear = () => {
    const containerWidth = typeof width === "number" ? width : 300;

    const translateX = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-containerWidth * 1.5, containerWidth * 1.5],
    });

    return (
      <View
        style={[
          styles.container,
          { width: width as DimensionValue, height: height as DimensionValue, backgroundColor, borderRadius },
          style,
        ]}>
        <Animated.View style={[StyleSheet.absoluteFill, { transform: [{ translateX }] }]}>
          <LinearGradient
            colors={[
              controlColorOpacity(animationColor, 0),
              controlColorOpacity(animationColor, 0),
              animationColor,
              controlColorOpacity(animationColor, 0),
              controlColorOpacity(animationColor, 0),
            ]}
            locations={[0, 0.2, 0.5, 0.8, 1]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.gradient}
          />
        </Animated.View>
      </View>
    );
  };

  /**
   * Render Radial Shimmer Animation
   * Simulates a circular light sweep using scale and opacity
   */
  const renderRadial = () => {
    const scale = animatedValue.interpolate({
      inputRange: [0, 0.3, 0.7, 1],
      outputRange: [0, 1.2, 1.2, 0],
    });

    const opacity = animatedValue.interpolate({
      inputRange: [0, 0.2, 0.5, 0.8, 1],
      outputRange: [0, 0.6, 1, 0.6, 0],
    });

    return (
      <View
        style={[
          styles.container,
          { width: width as DimensionValue, height: height as DimensionValue, backgroundColor, borderRadius },
          style,
        ]}>
        <Animated.View
          style={[
            styles.radialLayer,
            {
              borderRadius,
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
   * Render Directional Shimmer Animation (Top to Bottom) with Gradient
   */
  const renderDirectional = () => {
    const containerHeight = typeof height === "number" ? height : 200;

    const translateY = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-containerHeight, containerHeight],
    });

    return (
      <View
        style={[
          styles.container,
          { width: width as DimensionValue, height: height as DimensionValue, backgroundColor, borderRadius },
          style,
        ]}>
        <Animated.View style={[StyleSheet.absoluteFill, { transform: [{ translateY }] }]}>
          <LinearGradient
            colors={[controlColorOpacity(animationColor, 1), animationColor, controlColorOpacity(animationColor, 1)]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.gradient}
          />
        </Animated.View>
      </View>
    );
  };

  /**
   * Render Reverse Shimmer Animation (Right to Left) with Gradient
   */
  const renderReverse = () => {
    const containerWidth = typeof width === "number" ? width : 300;

    const translateX = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [containerWidth * 1.5, -containerWidth * 1.5],
    });

    return (
      <View
        style={[
          styles.container,
          { width: width as DimensionValue, height: height as DimensionValue, backgroundColor, borderRadius },
          style,
        ]}>
        <Animated.View style={[StyleSheet.absoluteFill, { transform: [{ translateX }] }]}>
          <LinearGradient
            colors={[
              controlColorOpacity(animationColor, 0),
              controlColorOpacity(animationColor, 0),
              animationColor,
              controlColorOpacity(animationColor, 0),
              controlColorOpacity(animationColor, 0),
            ]}
            locations={[0, 0.2, 0.5, 0.8, 1]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.gradient}
          />
        </Animated.View>
      </View>
    );
  };

  /**
   * Render Pulse Animation
   */
  const renderPulse = () => {
    const opacity = animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0.3, 1, 0.3],
    });

    const scale = animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0.98, 1, 0.98],
    });

    return (
      <Animated.View
        style={[
          styles.container,
          {
            width: width as DimensionValue,
            height: height as DimensionValue,
            backgroundColor: animationColor,
            borderRadius,
            opacity,
            transform: [{ scale }],
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
      outputRange: [controlColorOpacity(animationColor, 3), animationColor, controlColorOpacity(animationColor, 3)],
    });

    return (
      <Animated.View
        style={[
          styles.container,
          {
            width: width as DimensionValue,
            height: height as DimensionValue,
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
   */
  const renderSkeleton = () => {
    return (
      <View
        style={[
          styles.container,
          {
            width: width as DimensionValue,
            height: height as DimensionValue,
            backgroundColor,
            borderRadius,
          },
          style,
        ]}
      />
    );
  };

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
  gradient: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  radialLayer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "100%",
    height: "100%",
    marginLeft: "-50%",
    marginTop: "-50%",
  },
  radialGradient: {
    flex: 1,
    borderRadius: 9999,
  },
});

export default SmartPlaceholder;
