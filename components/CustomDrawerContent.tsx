import { Rol } from "@/api/auth.service";
import { useAuth } from "@/context/AuthContext";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { router } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const drawerItemsPropietario = [
  {
    name: "Inicio",
    path: "home",
    icon: AntDesign,
    iconName: "home",
  },
  {
    name: "Mis Inmuebles",
    path: "mis-propiedades",
    icon: Feather,
    iconName: "server",
  },
  {
    name: "Mis Arrendatarios",
    path: "home",
    icon: Feather,
    iconName: "users",
  },
  {
    name: "Notificaciones",
    path: "notifications",
    icon: Ionicons,
    iconName: "notifications-outline",
  },
  {
    name: "Configuración",
    path: "settings",
    icon: Feather,
    iconName: "settings",
  },
];

const drawerItemsInquilino = [
  {
    name: "Inicio",
    path: "home",
    icon: AntDesign,
    iconName: "home",
  },
  {
    name: "Mi Arriendo",
    path: "mi-arriendo",
    icon: Feather,
    iconName: "home",
  },
  {
    name: "Realizar Pago",
    path: "pay-rent",
    icon: Feather,
    iconName: "credit-card",
  },
  {
    name: "Buscar Arriendo",
    path: "buscar-arriendo",
    icon: Feather,
    iconName: "home",
  },
  {
    name: "Notificaciones",
    path: "notifications",
    icon: Ionicons,
    iconName: "notifications-outline",
  },
  {
    name: "Configuración",
    path: "settings",
    icon: Feather,
    iconName: "settings",
  },
];

export function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { user, logout } = useAuth();

  if (!user) {
    return null;
  }

  const currentRoleItems =
    user.rol === Rol.PROPIETARIO
      ? drawerItemsPropietario
      : drawerItemsInquilino;

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{ paddingTop: 0 }}
    >
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: "https://ui-avatars.com/api/?name=Juan+Perez" }}
            style={styles.avatar}
          />
        </View>

        <View>
          <Text style={styles.userName}>{user.nombre}</Text>
          <Text style={styles.userRole}>{user.rol.toUpperCase()}</Text>
        </View>
      </View>

      <DrawerItem
        label="Mi Cuenta"
        icon={({ color, size }) => (
          <AntDesign name="user" size={size} color={color} />
        )}
        onPress={() => router.push("/account")}
      />

      {currentRoleItems.map((item) => (
        <DrawerItem
          key={item.name}
          label={item.name}
          icon={({ color, size }) => (
            <item.icon name={item.iconName as any} size={size} color={color} />
          )}
          onPress={() => router.push(`/${item.path}`)}
        />
      ))}

      <View style={styles.separator} />

      <DrawerItem
        label="Cerrar Sesión"
        onPress={async () => {
          await logout();
        }}
        inactiveTintColor="#dc3545"
        icon={({ color, size }) => (
          <Ionicons name="log-out-outline" size={size} color={color} />
        )}
      />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
    gap: "10px",
    alignItems: "center",
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  userRole: {
    fontSize: 14,
  },
  separator: {
    height: 1,
    marginVertical: 10,
    backgroundColor: "gray",
  },
});
