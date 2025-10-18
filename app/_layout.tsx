import { AuthProvider } from "@/context/AuthContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import FlashMessage from "react-native-flash-message";
import "react-native-reanimated";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="splash" />
        <Stack.Screen name="welcome" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(domu)" />
        <Stack.Screen name="[...missing]" />
      </Stack>

      <StatusBar style="auto" />
      <FlashMessage position="top" />
    </AuthProvider>
  );
}
