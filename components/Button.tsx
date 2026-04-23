import { Text, StyleSheet, TouchableOpacity, ActivityIndicator, ViewStyle, TextStyle } from "react-native";
import React from "react";
import { useTheme } from "@/src/theme/useTheme";
import { spacing } from "@/src/theme/spacing";
import { Typography } from "@/src/theme/typography";

interface ButtonProps {
  label?: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  children?: React.ReactNode;
}

export const Button = ({ 
  label, 
  onPress, 
  loading = false, 
  disabled = false, 
  style, 
  textStyle,
  children 
}: ButtonProps) => {
  const theme = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.buttonContainer, 
        { backgroundColor: theme.colors.primary },
        (disabled || loading) && { opacity: 0.7 },
        style
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color="#ffffff" style={styles.loader} />
      ) : (
        children || <Text style={[styles.buttonText, textStyle]}>{label}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: spacing.xxxl,
    borderRadius: spacing.full,
    height: 56, // Fixed height to prevent jumping when loader appears
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: Typography.fontSize.md,
    textAlign: "center",
    fontFamily: Typography.fontFamily.medium,
  },
  loader: {
    paddingVertical: spacing.lg,
  }
});
