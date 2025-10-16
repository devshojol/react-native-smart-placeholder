import React from "react";
import { ViewStyle, TextStyle } from "react-native";
export interface MyButtonProps {
    title: string;
    onPress: () => void;
    backgroundColor?: string;
    textColor?: string;
    style?: ViewStyle;
    textStyle?: TextStyle;
}
export declare const MyButton: React.FC<MyButtonProps>;
