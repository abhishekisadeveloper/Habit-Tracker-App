import { Stack } from "expo-router";
import { useTheme } from "@/src/theme/useTheme";

export default function AuthLayout() {
  const { colors } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerShadowVisible: true,
        headerTitleAlign: "center",
        headerStyle: { backgroundColor: colors.headerBackground },
        headerTitleStyle: { 
          fontSize: 25, 
          color: colors.headerText, 
          fontFamily: "Ubuntu-Bold" 
        },
        headerTintColor: colors.primary, // Color for the back button
      }}
    >
      <Stack.Screen
        name="create-account"
        options={{ title: "Create Account" }}
      />
      <Stack.Screen
        name="login"
        options={{ title: "Login" }}
      />
    </Stack>
  );
}
