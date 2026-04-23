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
import { signupUser } from "@/src/services/auth.service";
import { useAuth } from "@/src/context/AuthContext";

export default function CreateAccount() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { colors } = useTheme();
  const { setUser } = useAuth();

  const handleSignup = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      alert("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    try {
      const session = await signupUser(email, password, name);
      // After signup success, we need to fetch the user object to update context
      // Since signupUser returns the session, we can fetch the user now
      const { getCurrentUser } = await import("@/src/services/auth.service");
      const user = await getCurrentUser();
      setUser(user);
      router.replace("/(tabs)");
    } catch (error: any) {
      alert(error.message || "Failed to create account");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView
        style={[
          styles.container,
          { backgroundColor: colors.backgroundSecondary },
        ]}
        edges={["bottom", "left", "right"]}
      >
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
              label="NAME"
              value={name}
              onChangeText={setName}
              placeholder="John Doe"
              editable={!isSubmitting}
            />

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
              label="Create Account" 
              onPress={handleSignup} 
              loading={isSubmitting}
            />

            <TouchableOpacity
              onPress={() => router.push("/(auth)/login")}
              style={styles.linkContainer}
              disabled={isSubmitting}
            >
              <Text style={[styles.linkText, { color: colors.textSecondary }]}>
                Already have an account?{" "}
                <Text
                  style={{
                    color: colors.primary,
                    fontFamily: Typography.fontFamily.medium,
                  }}
                >
                  Login
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
