import { Button } from "@/components/Button";
import Input from "@/components/Input";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { spacing } from "@/src/theme/spacing";
import { useTheme } from "@/src/theme/useTheme";
import { Typography } from "@/src/theme/typography";
import { loginUser, getCurrentUser } from "@/src/services/auth.service";
import { useAuth } from "@/src/context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { colors } = useTheme();
  const { setUser } = useAuth();

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      alert("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    try {
      await loginUser(email, password);
      const user = await getCurrentUser();
      setUser(user);
      router.replace("/(tabs)");
    } catch (error: any) {
      alert(error.message || "Failed to login. Please check your credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView style={[styles.container, { backgroundColor: colors.backgroundSecondary }]} edges={["bottom", "left", "right"]}>
        <KeyboardAwareScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingInline: spacing.xxl,
            paddingBlock: spacing.xl,
          }}
          enableOnAndroid={true}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.inputContainer}>
            <Input
              label="E-MAIL"
              value={email}
              onChangeText={setEmail}
              placeholder="john.doe@example.com"
              inputMode={"email"}
              autoCapitalize="none"
              editable={!isSubmitting}
            />
            <Input
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              autoCapitalize="none"
              password={true}
              editable={!isSubmitting}
            />
          </View>

          <View style={styles.footer}>
            <Button 
              label="Login" 
              onPress={handleLogin} 
              loading={isSubmitting}
            />
            
            <TouchableOpacity 
              onPress={() => router.push("/(auth)/create-account")}
              style={styles.linkContainer}
              disabled={isSubmitting}
            >
              <Text style={[styles.linkText, { color: colors.textSecondary }]}>
                Don't have an account?{" "}
                <Text style={{ color: colors.primary, fontFamily: Typography.fontFamily.medium }}>
                  Sign Up
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    gap: spacing.xxxl,
    flex: 1,
  },
  footer: {
    marginTop: spacing.xl,
    gap: spacing.lg,
  },
  linkContainer: {
    alignItems: "center",
    paddingVertical: spacing.sm,
  },
  linkText: {
    fontSize: Typography.fontSize.sm,
    fontFamily: Typography.fontFamily.regular,
  },
});
