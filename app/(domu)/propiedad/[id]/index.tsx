import { Rol } from "@/api/auth.service";
import { getPropiedad, Propiedad } from "@/api/propiedad.service";
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

export default function DetallePropiedadScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const { id } = useLocalSearchParams<{ id: string }>();

  const isInquilino = user?.rol === Rol.INQUILINO;

  const [propiedad, setPropiedad] = useState<Propiedad | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPropiedad = async () => {
      if (!id) {
        return;
      }

      const res = await getPropiedad(id);

      if (res.success && res.data) {
        setPropiedad(res.data);
      }

      setLoading(false);
    };

    fetchPropiedad();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2E3B59" />
        <Text style={{ color: "#333", marginTop: 10 }}>
          Cargando detalles...
        </Text>
      </View>
    );
  }

  if (!propiedad) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "#555" }}>No se encontró la propiedad.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalles de la Propiedad</Text>

      <View style={styles.card}>
        <View style={styles.iconContainer}>
          <Image
            resizeMode="cover"
            style={styles.icon}
            source={{
              uri: "https://media.istockphoto.com/id/1398814566/es/foto/interior-de-peque%C3%B1o-apartamento-sala-de-estar-para-oficina-en-casa.jpg?s=612x612&w=0&k=20&c=lWNztTsDHPBnB89Y2diqkMDrgoPODj8Nm_9DX6w5eQo=",
            }}
          />
        </View>

        <Text style={styles.status}>{propiedad.estado}</Text>

        <View style={styles.divider} />

        <View style={styles.infoContainer}>
          {isInquilino && (
            <View style={styles.row}>
              <Image
                style={styles.avatar}
                source={{ uri: "https://ui-avatars.com/api/?name=Juan+Perez" }}
              />

              <View>
                <Text style={styles.accountTitle}>Propietario</Text>
                <Text style={styles.accountName}>
                  {propiedad.propietario.nombre}
                </Text>
              </View>
            </View>
          )}

          <View style={styles.details}>
            <Text style={styles.label}>Nombre de la Propiedad</Text>
            <Text style={styles.value}>{propiedad.nombre}</Text>

            <Text style={styles.label}>Características</Text>
            <Text style={styles.value}>{propiedad.caracteristicas}</Text>

            <View style={styles.priceRow}>
              <View>
                <Text style={styles.label}>Precio</Text>
                <Text style={styles.value}>${propiedad.precioBase}</Text>
              </View>
              <View>
                <Text style={styles.label}>Tipo</Text>
                <Text style={styles.value}>{propiedad.tipo}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#ccc" }]}
            onPress={() => {
              if (isInquilino) {
                router.push(`/buscar-arriendo`);
              } else {
                router.push(`/mis-propiedades`);
              }
            }}
          >
            <Text style={styles.buttonText}>Volver</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#2E3B59" }]}
            onPress={() => {
              if (isInquilino) {
              } else {
                router.navigate(
                  `/propiedad/${propiedad._id}/asignar-inquilino`
                );
              }
            }}
          >
            <Text style={styles.buttonTextContact}>
              {isInquilino ? "Ver Galeria de Fotos" : "Asignar Inquilino"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  card: {
    backgroundColor: "#E2E2E2",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  iconContainer: {
    backgroundColor: "#fff",
    borderRadius: 100,
    padding: 10,
    marginBottom: 8,
  },
  icon: {
    width: 160,
    height: 160,
    borderRadius: 100,
  },
  status: {
    fontSize: 16,
    color: "#2E3B59",
    fontWeight: "600",
  },
  divider: {
    height: 1,
    backgroundColor: "#ccc",
    width: "100%",
    marginVertical: 12,
  },
  infoContainer: {
    width: "100%",
  },
  row: {
    gap: 10,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 50,
    backgroundColor: "#ddd",
  },
  accountTitle: {
    fontSize: 12,
    color: "#666",
  },
  accountName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  details: {
    width: "100%",
  },
  label: {
    fontSize: 13,
    color: "#777",
    marginTop: 8,
  },
  value: {
    fontSize: 15,
    fontWeight: "500",
    color: "#333",
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
    width: "100%",
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 6,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "600",
  },
  buttonTextContact: {
    fontWeight: "600",
    color: "#fff",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
});
