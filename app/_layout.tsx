import { Stack } from "expo-router";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from "react";
import { ThemeProvider } from "@/src/theme";
import { HabitProvider } from "@/src/context/HabitContext";
import { AuthProvider } from "@/src/context/AuthContext";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const [loaded, error] = useFonts({
    'Ubuntu-Light': require('../assets/fonts/Ubuntu-Light.ttf'),
    'Ubuntu-Regular': require('../assets/fonts/Ubuntu-Regular.ttf'),
    'Ubuntu-Medium': require('../assets/fonts/Ubuntu-Medium.ttf'),
    'Ubuntu-Bold': require('../assets/fonts/Ubuntu-Bold.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <AuthProvider>
      <ThemeProvider>
        <HabitProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </HabitProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
