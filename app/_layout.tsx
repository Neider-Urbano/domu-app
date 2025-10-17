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
        <Stack.Screen name="(auth)/login" />
        <Stack.Screen name="(auth)/register" />
        <Stack.Screen name="(domu)/home" />
        <Stack.Screen name="(domu)/account" />
        <Stack.Screen name="[...missing]" />
      </Stack>
      <StatusBar style="auto" />
      <FlashMessage position="top" />
    </AuthProvider>
  );
}
