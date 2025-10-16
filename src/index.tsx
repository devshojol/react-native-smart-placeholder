import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle, TextStyle } from "react-native";

export interface MyButtonProps {
  title: string;
  onPress: () => void;
  backgroundColor?: string;
  textColor?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const MyButton: React.FC<MyButtonProps> = ({
  title,
  onPress,
  backgroundColor = "#007AFF",
  textColor = "#FFFFFF",
  style,
  textStyle,
}) => {
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor }, style]} onPress={onPress} activeOpacity={0.8}>
      <Text style={[styles.text, { color: textColor }, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
});
