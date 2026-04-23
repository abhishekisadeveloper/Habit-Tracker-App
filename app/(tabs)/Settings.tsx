import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/src/theme/useTheme";
import { spacing } from "@/src/theme/spacing";
import { Typography } from "@/src/theme/typography";
import { useAuth } from "@/src/context/AuthContext";
import { logoutUser } from "@/src/services/auth.service";
import { router } from "expo-router";

interface SettingItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value?: string;
  onPress?: () => void;
  rightElement?: React.ReactNode;
  isLast?: boolean;
}

const SettingItem = ({ icon, label, value, onPress, rightElement, isLast }: SettingItemProps) => {
  const theme = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      disabled={!onPress}
      style={[
        styles.itemContainer,
        { backgroundColor: theme.colors.surface },
        !isLast && { borderBottomWidth: 1, borderBottomColor: theme.colors.border },
      ]}
    >
      <View style={styles.itemLeft}>
        <View style={[styles.iconBox, { backgroundColor: theme.colors.background }]}>
          <Ionicons name={icon} size={20} color={theme.colors.primary} />
        </View>
        <Text style={[styles.itemLabel, { color: theme.colors.textPrimary }]}>{label}</Text>
      </View>

      <View style={styles.itemRight}>
        {value && <Text style={[styles.itemValue, { color: theme.colors.textSecondary }]}>{value}</Text>}
        {rightElement || <Ionicons name="chevron-forward" size={18} color={theme.colors.placeholder} />}
      </View>
    </TouchableOpacity>
  );
};

const Settings = () => {
  const { colors, isDark, toggleTheme } = useTheme();
  const { user, setUser } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logoutUser();
      setUser(null);
      router.replace("/(auth)/login");
    } catch (error) {
      alert("Failed to logout. Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Settings</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Profile Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>ACCOUNT</Text>
          <View style={[styles.sectionCard, { borderColor: colors.border }]}>
            <SettingItem icon="person-outline" label="Profile" value={user?.name || "User"} />
            <SettingItem icon="mail-outline" label="Email" value={user?.email || "N/A"} isLast />
          </View>
        </View>

        {/* Preferences Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>PREFERENCES</Text>
          <View style={[styles.sectionCard, { borderColor: colors.border }]}>
            <SettingItem
              icon="moon-outline"
              label="Dark Mode"
              rightElement={
                <Switch
                  value={isDark}
                  onValueChange={toggleTheme}
                  trackColor={{ false: colors.border, true: colors.primary }}
                  thumbColor="#ffffff"
                />
              }
            />
            <SettingItem icon="notifications-outline" label="Daily Reminders" value="08:00 AM" />
            <SettingItem icon="language-outline" label="Language" value="English" isLast />
          </View>
        </View>

        {/* Support Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>SUPPORT</Text>
          <View style={[styles.sectionCard, { borderColor: colors.border }]}>
            <SettingItem icon="help-circle-outline" label="Help Center" />
            <SettingItem icon="shield-checkmark-outline" label="Privacy Policy" />
            <SettingItem icon="information-circle-outline" label="About App" isLast />
          </View>
        </View>

        <TouchableOpacity 
          style={[styles.logoutButton, isLoggingOut && { opacity: 0.7 }]} 
          onPress={handleLogout}
          disabled={isLoggingOut}
        >
          {isLoggingOut ? (
            <ActivityIndicator color="#ff5c5c" />
          ) : (
            <Text style={styles.logoutText}>Logout</Text>
          )}
        </TouchableOpacity>

        <Text style={[styles.versionText, { color: colors.placeholder }]}>Version 1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  headerTitle: {
    fontSize: Typography.fontSize.xl,
    fontFamily: Typography.fontFamily.bold,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  section: {
    marginTop: spacing.xl,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.xs,
    fontFamily: Typography.fontFamily.bold,
    marginBottom: spacing.sm,
    marginLeft: spacing.xs,
    letterSpacing: 1,
  },
  sectionCard: {
    borderRadius: spacing.md,
    overflow: "hidden",
    borderWidth: 1,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  itemLabel: {
    fontSize: Typography.fontSize.md,
    fontFamily: Typography.fontFamily.medium,
  },
  itemRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  itemValue: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.regular,
  },
  logoutButton: {
    marginTop: spacing.xxxl,
    backgroundColor: "#ff5c5c20",
    padding: spacing.md,
    borderRadius: spacing.md,
    alignItems: "center",
    height: 50,
    justifyContent: "center",
  },
  logoutText: {
    color: "#ff5c5c",
    fontFamily: Typography.fontFamily.bold,
    fontSize: Typography.fontSize.md,
  },
  versionText: {
    textAlign: "center",
    marginTop: spacing.xl,
    fontSize: Typography.fontSize.xs,
    fontFamily: Typography.fontFamily.regular,
  },
});
