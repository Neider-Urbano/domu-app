import { listMyProperties, Propiedad } from "@/api/propiedad.service";
import { useAuth } from "@/context/AuthContext";
import { COLORS } from "@/theme/color";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function MisPropiedadesScreen() {
  const { token } = useAuth();
  const [propiedades, setPropiedades] = useState<Propiedad[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPropiedades = useCallback(async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    setLoading(true);
    const res = await listMyProperties(token);

    if (res.success && res.data) {
      setPropiedades(res.data);
    }

    setLoading(false);
  }, [token]);

  useFocusEffect(
    useCallback(() => {
      fetchPropiedades();
    }, [fetchPropiedades])
  );

  const renderItem = ({ item }: { item: Propiedad }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.replace(`/propiedad/${item._id}`)}
    >
      <Image
        resizeMode="cover"
        style={styles.image}
        source={{
          uri:
            item.fotos?.[0] ||
            "https://media.istockphoto.com/id/1398814566/es/foto/interior-de-peque%C3%B1o-apartamento-sala-de-estar-para-oficina-en-casa.jpg?s=612x612&w=0&k=20&c=lWNztTsDHPBnB89Y2diqkMDrgoPODj8Nm_9DX6w5eQo=",
        }}
      />
      <Text style={styles.cardTitle}>{item.nombre}</Text>
      <Text style={styles.cardText}>{item.direccion}</Text>
      <View style={styles.cardFooter}>
        <Text style={styles.cardPrice}>${item.precioBase}</Text>
        <Text style={styles.cardStatus}>Estado: {item.estado}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Cargando tus inmuebles...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Mis Inmuebles</Text>
          <TouchableOpacity onPress={() => router.push("/create-property")}>
            <Text style={styles.addText}>+ Agregar Propiedad</Text>
          </TouchableOpacity>
        </View>

        {propiedades.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              Aún no has registrado propiedades.
            </Text>
          </View>
        ) : (
          <FlatList
            data={propiedades}
            keyExtractor={(item) => item._id}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.textDark,
  },
  addText: {
    color: COLORS.primary,
    textAlign: "right",
    fontWeight: "bold",
    cursor: "pointer",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 160,
    borderRadius: 12,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.textDark,
  },
  cardText: {
    fontSize: 14,
    color: COLORS.textDark,
    marginTop: 2,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    alignItems: "center",
  },
  cardPrice: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: "600",
  },
  cardStatus: {
    fontSize: 14,
    color: COLORS.textDark,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: COLORS.textDark,
    textAlign: "center",
    marginBottom: 14,
  },
  registerButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },
  registerButtonText: {
    color: COLORS.textLight,
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.secondary,
  },
  loadingText: {
    marginTop: 12,
    color: COLORS.textDark,
  },
  listContent: {
    paddingBottom: 30,
  },
});
