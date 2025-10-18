import { User } from "@/api/auth.service";
import { getUsuarioById } from "@/api/user.service";
import { useAuth } from "@/context/AuthContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function UsuarioDetalleScreen() {
  const router = useRouter();
  const { token } = useAuth();

  const { id } = useLocalSearchParams<{ id: string }>();

  const [usuario, setUsuario] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsuario = async () => {
      const res = await getUsuarioById(id!, token!);

      if (res.success && res.data) {
        setUsuario(res.data);
      }

      setLoading(false);
    };

    fetchUsuario();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2E3B59" />
        <Text style={{ marginTop: 10 }}>Cargando usuario...</Text>
      </View>
    );
  }

  if (!usuario) {
    return (
      <View style={styles.center}>
        <Text>No se encontró información del usuario.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalles del Usuario</Text>

      <View style={styles.card}>
        <View style={styles.iconCircle}>
          <Text style={styles.icon}>✓</Text>
        </View>

        <Text style={styles.status}>Usuario Activo</Text>
        <View style={styles.divider} />

        <View style={styles.userInfo}>
          <Image
            style={styles.avatar}
            source={{
              uri: `https://ui-avatars.com/api/?name=${usuario.nombre}`,
            }}
          />
          <View>
            <Text style={styles.label}>Nombre</Text>
            <Text style={styles.value}>{usuario.nombre}</Text>
          </View>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Rol</Text>
          <Text style={styles.value}>{usuario.rol}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{usuario.correo}</Text>
        </View>

        <View style={styles.btns}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => router.back()}
          >
            <Text style={styles.cancelText}>Volver</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.historyButton}>
            <Text style={styles.historyText}>Contactar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F5F5F5" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#E2E2E2",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  iconCircle: {
    backgroundColor: "#fff",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: { fontSize: 24, color: "#2E3B59" },
  status: {
    textAlign: "center",
    marginTop: 10,
    color: "#2E3B59",
    fontWeight: "600",
  },
  divider: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 10,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
  label: { fontSize: 13, color: "#333" },
  value: { fontSize: 15, fontWeight: "500", color: "#000" },
  detailRow: { marginTop: 6 },
  btns: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: "#ddd",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  historyButton: {
    backgroundColor: "#2E3B59",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  cancelText: { color: "#2E3B59" },
  historyText: { color: "#fff" },
});
