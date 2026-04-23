import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/src/theme/useTheme";
import { spacing } from "@/src/theme/spacing";
import { Typography } from "@/src/theme/typography";
import { Habit, useHabits } from "@/src/context/HabitContext";
import { scale } from "react-native-size-matters";

interface HabitCardProps {
  habit: Habit;
}

export const HabitCard = ({ habit }: HabitCardProps) => {
  const theme = useTheme();
  const { toggleHabit } = useHabits();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.background,
          borderWidth: 1,
          borderColor: theme.colors.border,
        },
      ]}
    >
      <View style={styles.content}>
        <Text style={[styles.name, { color: theme.colors.textPrimary }]}>
          {habit.name}
        </Text>
        <Text style={[styles.frequency, { color: theme.colors.placeholder }]}>
          {habit.frequency}
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => toggleHabit(habit.id)}
        style={[
          styles.checkCircle,
          {
            borderColor: habit.isCompleted ? habit.color : habit.color,
            backgroundColor: habit.isCompleted ? habit.color : "transparent",
          },
        ]}
      >
        {habit.isCompleted && <Ionicons name="checkmark" size={scale(20)} color="#ffffff" />}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.md,
    borderRadius: spacing.lg,
    marginBottom: spacing.md,
    marginHorizontal: spacing.lg,
    justifyContent: "space-between",
  },
  content: {
    width: "70%",
    gap: spacing.sm,
  },
  name: {
    fontSize: Typography.fontSize.md,
    fontFamily: Typography.fontFamily.bold,
  },
  frequency: {
    fontSize: Typography.fontSize.xs,
    fontFamily: Typography.fontFamily.medium,
    textTransform: "uppercase",
  },
  checkCircle: {
    width: scale(35),
    height: scale(35),
    borderRadius: spacing.md,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
});
