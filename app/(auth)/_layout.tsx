import { Stack } from "expo-router";

export default function AuthLayout() {

    return (
        <Stack
            screenOptions={{
                headerShown: true, headerShadowVisible: true, headerTitleAlign: "center",
                headerStyle: { backgroundColor: "#ffffff" }, headerTitleStyle: { fontSize: 25, color: "#1a1919", fontFamily: "Ubuntu-Bold" }
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