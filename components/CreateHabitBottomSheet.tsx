import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/src/theme/useTheme";
import { spacing } from "@/src/theme/spacing";
import { Typography } from "@/src/theme/typography";
import Input from "./Input";
import { Button } from "./Button";
import { useHabits } from "@/src/context/HabitContext";
import { scale } from "react-native-size-matters";

interface CreateHabitBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
}

const FREQUENCIES = ["Daily", "Weekly", "Monthly"];
const COLORS = ["#bc0000", "#efb700", "#167900",];

export const CreateHabitBottomSheet = ({ isVisible, onClose }: CreateHabitBottomSheetProps) => {
  const theme = useTheme();
  const { addHabit } = useHabits();
  const [habitName, setHabitName] = useState("");
  const [selectedFrequency, setSelectedFrequency] = useState("Daily");
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);

  const handleCreate = () => {
    if (!habitName.trim()) return;

    addHabit({
      name: habitName,
      frequency: selectedFrequency,
      color: selectedColor,
    });

    onClose();
    setHabitName("");
    setSelectedFrequency("Daily");
    setSelectedColor(COLORS[0]);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardView}
        >
          <Pressable
            style={[
              styles.sheetContainer,
              { backgroundColor: theme.colors.background, borderColor: theme.colors.border },
            ]}
            onPress={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <View style={styles.header}>
              <Text style={[styles.title, { color: theme.colors.textPrimary }]}>
                New Habit
              </Text>
              <TouchableOpacity onPress={onClose}>
                <Ionicons name="close" size={24} color={theme.colors.textSecondary} />
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
              <Input
                label="HABIT NAME"
                value={habitName}
                onChangeText={setHabitName}
                placeholder="Drinking Water"
              />

              <View style={styles.section}>
                <Text style={[styles.sectionLabel, { color: theme.colors.textSecondary }]}>
                  FREQUENCY
                </Text>
                <View style={styles.frequencyContainer}>
                  {FREQUENCIES.map((freq) => (
                    <TouchableOpacity
                      key={freq}
                      onPress={() => setSelectedFrequency(freq)}
                      style={[
                        styles.chip,
                        {
                          backgroundColor:
                            selectedFrequency === freq
                              ? theme.colors.primary
                              : theme.colors.surface,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.chipText,
                          {
                            color:
                              selectedFrequency === freq
                                ? "#ffffff"
                                : theme.colors.textSecondary,
                          },
                        ]}
                      >
                        {freq}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.section}>
                <Text style={[styles.sectionLabel, { color: theme.colors.textSecondary }]}>
                  COLOR CATEGORY
                </Text>
                <View style={styles.colorContainer}>
                  {COLORS.map((color) => (
                    <TouchableOpacity
                      key={color}
                      onPress={() => setSelectedColor(color)}
                      style={[
                        styles.colorCircle,
                        { backgroundColor: color },
                        selectedColor === color && {
                          borderWidth: 3,
                          borderColor: theme.colors.textPrimary,
                        },
                      ]}
                    />
                  ))}
                </View>
              </View>

              <Button label="Create Habit" onPress={handleCreate} />
            </ScrollView>
          </Pressable>
        </KeyboardAvoidingView>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.18)",
    justifyContent: "flex-end",
  },
  keyboardView: {
    width: "100%",
  },
  sheetContainer: {
    borderTopLeftRadius: spacing.md,
    borderTopRightRadius: spacing.md,
    paddingTop: spacing.xl,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxxl,
    minHeight: scale(60),
    borderWidth: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: Typography.fontSize.xl,
    fontFamily: Typography.fontFamily.bold,
  },
  content: {
    gap: spacing.xxl,
  },
  section: {
    gap: spacing.md,
  },
  sectionLabel: {
    fontSize: Typography.fontSize.xs,
    fontFamily: Typography.fontFamily.bold,
    letterSpacing: 1.2,
  },
  frequencyContainer: {
    flexDirection: "row",
    gap: spacing.md,
  },
  chip: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: spacing.md,
  },
  chipText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.medium,
  },
  colorContainer: {
    flexDirection: "row",
    gap: spacing.lg,
    flexWrap: "wrap",
  },
  colorCircle: {
    width: spacing.xxxl,
    height: spacing.xxxl,
    borderRadius: spacing.xxxl / 2,
  },
});
