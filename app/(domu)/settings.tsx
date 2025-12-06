import { useAuth } from "@/context/AuthContext";
import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
// Se eliminó la importación de 'Stack' y 'Stack.Screen' para no modificar el header.
import { RelativePathString, router } from "expo-router";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// --- Tipado de Opciones ---
interface SettingOption {
  name: string;
  icon: React.ComponentType<any>;
  iconName: string;
  color?: string;
  path: string;
}

// --- Opciones de Configuración ---
const SETTINGS_OPTIONS: SettingOption[] = [
  {
    name: "Mi Cuenta",
    icon: AntDesign,
    iconName: "user",
    path: "/account",
  },
  {
    name: "Seguridad y Privacidad",
    icon: Feather,
    iconName: "credit-card",
    path: "/home",
  },
  {
    name: "Gestión de reportes",
    icon: Feather,
    iconName: "share-2",
    path: "/home",
  },
  {
    name: "Ayuda y Soporte",
    icon: Ionicons,
    iconName: "headset-outline",
    path: "/home",
  },
  {
    name: "Notificaciones y Alertas",
    icon: MaterialCommunityIcons,
    iconName: "history",
    path: "/notifications",
  },
];

// --- Componente de Ítem de Configuración ---
const SettingItem: React.FC<{ option: SettingOption }> = ({ option }) => {
  const IconComponent = option.icon;

  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        router.push(option.path as RelativePathString);
      }}
    >
      <View style={styles.iconWrapper}>
        <IconComponent name={option.iconName as any} size={26} color="#333" />
      </View>
      <Text style={styles.itemText}>{option.name}</Text>
      <Feather name="chevron-right" size={20} color="#ccc" />
    </TouchableOpacity>
  );
};

// --- Pantalla Principal de Configuración ---
export default function SettingsScreen() {
  const { logout } = useAuth();

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* 🛑 NO SE HACE NINGUNA CONFIGURACIÓN DE HEADER AQUÍ. 
           Se usa el Header General de tu aplicación. */}

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* 🚀 Título grande visible en el cuerpo, justo debajo del Header General */}
        <Text style={styles.pageTitle}>Configuración</Text>

        <View style={styles.optionsList}>
          {SETTINGS_OPTIONS.map((option) => (
            <SettingItem key={option.name} option={option} />
          ))}
        </View>

        {/* Opción de Cerrar Sesión */}
        <TouchableOpacity
          style={[styles.itemContainer, styles.logoutItem]}
          onPress={logout}
        >
          <View style={styles.iconWrapper}>
            <Ionicons name="log-out-outline" size={26} color="#dc3545" />
          </View>
          <Text style={[styles.itemText, styles.logoutText]}>
            Cerrar Sesión
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

// --- Estilos ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  scrollContent: {
    paddingBottom: 20,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    paddingHorizontal: 20,
    marginBottom: 10,
    marginTop: 10,
  },
  optionsList: {
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  iconWrapper: {
    width: 30,
    marginRight: 15,
    alignItems: "center",
  },
  itemText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  logoutItem: {
    marginTop: 20,
    borderBottomWidth: 0,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  logoutText: {
    color: "#dc3545",
    fontWeight: "600",
  },
});
