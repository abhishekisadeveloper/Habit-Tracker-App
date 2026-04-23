import { View, Text, TextInput, TouchableOpacity, StyleSheet, TextInputProps } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useTheme } from "@/src/theme/useTheme";
import { spacing } from "@/src/theme/spacing";
import { Typography } from "@/src/theme/typography";

interface Props extends Pick<TextInputProps, "autoCapitalize" | "inputMode"> {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  password?: boolean;
}

export default function Input({ label, value, onChangeText, autoCapitalize = "sentences", placeholder, password = false, inputMode = "text" }: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const theme = useTheme();

  const clearInput = () => {
    onChangeText("");
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: theme.colors.textSecondary }]}>{label}</Text>

      <View style={[styles.inputWrapper, { borderBottomColor: isFocused ? theme.colors.primary : theme.colors.inputBorder }]}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholderTextColor={theme.colors.placeholder}
          style={[styles.input, { color: theme.colors.textPrimary }]}
          inputMode={inputMode}
          autoCapitalize={autoCapitalize}
          secureTextEntry={password}
        />

        {value && (
          <TouchableOpacity onPress={clearInput}>
            <Ionicons name="close-circle" size={28} color={theme.colors.placeholder} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  label: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.medium,
    marginBottom: spacing.sm,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 2,
    borderRadius: 0,
    paddingVertical: spacing.xs,
  },
  input: {
    flex: 1,
    fontSize: Typography.fontSize.md,
    fontFamily: Typography.fontFamily.regular,
  },
});