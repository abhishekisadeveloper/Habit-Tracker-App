import { Redirect } from "expo-router";

export default function CreateTab() {
  // This screen should not be accessible directly as we use a custom tabBarButton
  // to open a bottom sheet. Redirecting to home just in case.
  return <Redirect href="/" />;
}
