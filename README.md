# React Native Smart Placeholder

A **lightweight**, **customizable**, and **intelligent placeholder (skeleton loader)** for React Native with multiple animation styles — Linear, Radial, Directional, Reverse, Pulse, Fade, and Skeleton.

Perfect for creating **beautiful loading states** with full control over color, size, and animation type — all with **zero external dependencies**.

## Installation

```bash
npm install react-native-smart-placeholder

```

## Import

```bash
import SmartPlaceholder from "react-native-smart-placeholder";
```

## Example

<p align="center">
  <img src="https://raw.githubusercontent.com/devshojol/react-native-smart-placeholder/refs/heads/main/assets/demo.gif" width="300" alt="Demo" />
</p>

## Usage

```js
import React from "react";
import { View, Text } from "react-native";
import SmartPlaceholder from "react-native-smart-placeholder";

const ExampleScreen = () => {
  return (
    <View style={{ flex: 1, padding: 20, justifyContent: "center", gap: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>Loading Cards...</Text>

      {/* Linear Shimmer */}
      <SmartPlaceholder width="100%" height={80} borderRadius={10} animationStyle="linear" />

      {/* Radial Animation */}
      <SmartPlaceholder width="100%" height={80} borderRadius={10} animationStyle="radial" />

      {/* Directional Shimmer */}
      <SmartPlaceholder width="100%" height={80} borderRadius={10} animationStyle="directional" />

      {/* Pulse Effect */}
      <SmartPlaceholder width="100%" height={80} borderRadius={10} animationStyle="pulse" />

      {/* Fade Effect */}
      <SmartPlaceholder width="100%" height={80} borderRadius={10} animationStyle="fade" />

      {/* Static Skeleton */}
      <SmartPlaceholder width="100%" height={80} borderRadius={10} animationStyle="skeleton" />
    </View>
  );
};

export default ExampleScreen;
```

## Props

| Prop              | Type                                                                                    | Default     | Description                         |
| ----------------- | --------------------------------------------------------------------------------------- | ----------- | ----------------------------------- |
| `width`           | `number \| string`                                                                      | `100`       | Width of the placeholder            |
| `height`          | `number \| string`                                                                      | `20`        | Height of the placeholder           |
| `backgroundColor` | `string`                                                                                | `#8485852c` | Base background color               |
| `animationColor`  | `string`                                                                                | `#83848578` | Shimmer/animation highlight color   |
| `animationStyle`  | `"linear" \| "radial" \| "directional" \| "reverse" \| "pulse" \| "fade" \| "skeleton"` | `"linear"`  | Type of animation style             |
| `borderRadius`    | `number`                                                                                | `4`         | Border radius for rounded corners   |
| `style`           | `StyleProp<ViewStyle>`                                                                  | `undefined` | Custom style override for container |

## Features

- Fully customizable width, height, colors, and border radius
- Multiple animation styles:
- `linear`
- `radial`
- `directional`
- `reverse`
- `pulse`
- `fade`
- `skeleton` (static)
- Pure React Native Animated API (no extra libraries)
- Drop-in replacement for existing placeholders
- Works with Expo and React Native CLI

---

## Contributing

- [Development workflow](CONTRIBUTING.md#development-workflow)
- [Sending a pull request](CONTRIBUTING.md#sending-a-pull-request)
- [Code of conduct](CODE_OF_CONDUCT.md)

## License

MIT
