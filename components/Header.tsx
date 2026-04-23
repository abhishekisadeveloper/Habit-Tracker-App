import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ViewProps } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/src/theme/useTheme";
import { spacing } from "@/src/theme/spacing";
import { StatusBar } from "expo-status-bar";
import { Typography } from "@/src/theme/typography";
import { colors } from "@/src/theme";

interface HeaderProps extends ViewProps {
  name?: string;
  subText?: string;
  isDark?: boolean;
  onPressCalendar?: () => void;
  onPressNotification?: () => void;
}

const Header = ({
  name = "User",
  subText = "Let's build something great",
  isDark = false,
  onPressCalendar,
  onPressNotification,
}: HeaderProps) => {
  const theme = useTheme();

  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={styles.topRow}>
          <TouchableOpacity
            style={[styles.iconContainer, { borderColor: theme.colors.border, borderWidth: 1 }]}
            onPress={onPressCalendar}
          >
            <Ionicons name="calendar-outline" size={spacing.iconSize} color={theme.colors.textPrimary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.iconContainer, { borderColor: theme.colors.border, borderWidth: 1 }]}
            onPress={onPressNotification}
          >
            <Ionicons name="notifications-outline" size={spacing.iconSize} color={theme.colors.textPrimary} />
            <View style={[styles.dot, { backgroundColor: theme.colors.dot }]} />
          </TouchableOpacity>
        </View>

        <View style={styles.textContainer}>
          <Text style={[styles.greeting, { color: theme.colors.textPrimary }]}>
            Hi, {name} 👋
          </Text>
          <Text style={[styles.subText, { color: theme.colors.textSecondary }]}>
            {subText}
          </Text>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomColor: colors.light.border,
    borderBottomWidth: 1,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.md,
  },
  iconContainer: {
    width: spacing.iconContainer,
    height: spacing.iconContainer,
    borderRadius: spacing.md,
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  textContainer: {
    gap: spacing.xs,
  },
  greeting: {
    fontSize: Typography.fontSize.lg,
    fontFamily: Typography.fontFamily.bold,
  },
  subText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.regular,
  },
});