import { router } from "expo-router";
import { useEffect } from "react";
import { useAuth } from "@/src/context/AuthContext";
import { View, ActivityIndicator } from "react-native";
import { useTheme } from "@/src/theme/useTheme";

export default function Index() {
  const { user, isLoading } = useAuth();
  const { colors } = useTheme();

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        router.replace("/(tabs)");
      } else {
        router.replace("/(auth)/login");
      }
    }
  }, [user, isLoading]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return null;  
}
