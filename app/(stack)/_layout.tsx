import { Stack } from "expo-router";

export default function Home() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" options={{ title: "Stack Home" }} />
      <Stack.Screen name="addTask" options={{ title: "Add Task" }} />
      <Stack.Screen name="taskDetails" options={{ title: "Task Details" }} />
      <Stack.Screen name="profile" options={{ title: "Profile" }} />
      <Stack.Screen name="signup" options={{ title: "SignUp" }} />
    </Stack>
  );
}
