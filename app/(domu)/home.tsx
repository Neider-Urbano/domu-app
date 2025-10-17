import { Rol } from "@/api/auth.service";
import OwnerHome from "@/components/home/OwnerHome";
import TenantHome from "@/components/home/TenantHome";
import { useAuth } from "@/context/AuthContext";
import { Redirect } from "expo-router";
import React from "react";
import { ActivityIndicator, View } from "react-native";

export default function HomeScreen() {
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

  if (user.rol === Rol.PROPIETARIO) return <OwnerHome />;
  if (user.rol === Rol.INQUILINO) return <TenantHome />;

  return <Redirect href="/(auth)/login" />;
}
