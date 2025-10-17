import { CustomDrawerContent } from "@/components/CustomDrawerContent";
import { NotificationsButton } from "@/components/NotificationsButton";
import { useAuth } from "@/context/AuthContext";
import { Redirect } from "expo-router";
import { Drawer } from "expo-router/drawer";
import React from "react";
import { ActivityIndicator, View } from "react-native";

export default function HomeLayout() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#2E3B59" />
      </View>
    );
  }

  if (!user) {
    return <Redirect href="/(auth)/login" />;
  }

  const initialRoute = "home";

  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        drawerActiveTintColor: "#2E3B59",
        headerStyle: {
          backgroundColor: "#2E3B59",
        },
        headerTintColor: "#FFFFFF",
        headerRight: () => <NotificationsButton />,
      }}
      initialRouteName={initialRoute}
    >
      <Drawer.Screen
        name="owner"
        options={{
          title: "Inicio (Propietario)",
          drawerItemStyle: { height: 0 },
        }}
      />

      <Drawer.Screen
        name="tenant"
        options={{
          title: "Inicio (Inquilino)",
          drawerItemStyle: { height: 0 },
        }}
      />

      <Drawer.Screen
        name="account"
        options={{
          title: "Mi Cuenta",
          drawerItemStyle: { height: 0 },
        }}
      />

      <Drawer.Screen
        name="[...missing]"
        options={{
          drawerItemStyle: { height: 0 },
        }}
      />
    </Drawer>
  );
}
