import { Tabs, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import { useTheme } from "@/src/theme/useTheme";
import { spacing } from "@/src/theme/spacing";
import { CreateHabitBottomSheet } from "@/components/CreateHabitBottomSheet";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useAuth } from "@/src/context/AuthContext";

export default function TabsLayout() {
  const theme = useTheme();
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/(auth)/login");
    }
  }, [user, isLoading]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: theme.colors.background }}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (!user) return null;

  return (
    <>
    <SafeAreaProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.textSecondary,
          tabBarStyle: {
            backgroundColor: theme.colors.background,
            borderTopColor: theme.colors.border,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="create"
          options={{
            title: "",
            tabBarButton: (props) => (
              <TouchableOpacity
                {...props}
                style={styles.createButtonContainer}
                onPress={() => setBottomSheetVisible(true)}
              >
                <View
                  style={[
                    styles.createButton,
                    { backgroundColor: theme.colors.primary },
                  ]}
                >
                  <Ionicons name="add" size={32} color="#ffffff" />
                </View>
              </TouchableOpacity>
            ),
          }}
        />

        <Tabs.Screen
          name="Settings"
          options={{
            title: "Settings",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="settings" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
      </SafeAreaProvider>

      <CreateHabitBottomSheet
        isVisible={isBottomSheetVisible}
        onClose={() => setBottomSheetVisible(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  createButtonContainer: {
    top: -spacing.lg,
    justifyContent: "center",
    alignItems: "center",
  },
  createButton: {
    padding: spacing.sm,
    borderRadius: spacing.full,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    elevation: 5,
  },
});