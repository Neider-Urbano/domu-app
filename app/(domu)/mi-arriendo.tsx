// app/(home)/tenant/mi-arriendo.tsx

import { Contrato, listContratos } from "@/api/contrato.service"; // Asegúrate de que Contrato y listContratos estén disponibles
import { useAuth } from "@/context/AuthContext";
import { COLORS } from "@/theme/color";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
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

export default function MiArriendoScreen() {
  const { token } = useAuth();
  const [contratos, setContratos] = useState<Contrato[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContratos = async () => {
      if (!token) return;

      const res = await listContratos(token);

      if (res.success && res.data) {
        setContratos(res.data);
      } else {
        setContratos([]);
      }

      setLoading(false);
    };

    fetchContratos();
  }, []);

  const handleVerDetalles = (contratoId: string) => {
    router.push(`/contrato/${contratoId}`);
  };

  const handlePagarArriendo = () => {
    router.push(`/pay-rent`);
  };

  const renderItem = ({ item }: { item: Contrato }) => (
    <View style={styles.card}>
      <Image
        resizeMode="cover"
        style={styles.image}
        source={{
          uri: "https://via.placeholder.com/612?text=Inmueble",
        }}
      />

      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.idPropiedad?.nombre}</Text>
        <Text style={styles.cardText}>
          <Ionicons
            name="location-outline"
            size={14}
            color={COLORS.placeholder}
          />{" "}
          {item.idPropiedad?.direccion}
        </Text>
        <Text style={styles.cardPrice}>
          <MaterialCommunityIcons
            name="currency-usd"
            size={16}
            color={COLORS.primary}
          />
          {item.idPropiedad?.precioBase.toFixed(2)} / mes
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.detailsButton]}
            onPress={() => handleVerDetalles(item._id)}
          >
            <Text style={styles.buttonText}>Ver Contrato</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.payButton]}
            onPress={() => handlePagarArriendo()}
          >
            <Text style={[styles.buttonText, styles.payButtonText]}>
              Pagar Arriendo
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>
          Buscando tus contratos activos...
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Mi Arriendo</Text>

        {contratos.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons
              size={50}
              name="alert-circle-outline"
              color={COLORS.placeholder}
            />
            <Text style={styles.emptyText}>
              No tienes contratos de arriendo activos en este momento.
            </Text>
            <TouchableOpacity
              style={styles.searchButton}
              onPress={() => router.push("/buscar-arriendo")}
            >
              <Text style={styles.searchButtonText}>Buscar Propiedades</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={contratos}
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.textDark,
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    backgroundColor: COLORS.secondary,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 3,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 180,
    marginBottom: 10,
  },
  cardContent: {
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.textDark,
  },
  cardText: {
    fontSize: 14,
    color: COLORS.placeholder,
    marginTop: 4,
  },
  cardPrice: {
    fontSize: 18,
    color: COLORS.primary,
    fontWeight: "700",
    marginTop: 8,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    paddingVertical: 10,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
    marginHorizontal: 5,
  },
  detailsButton: {
    backgroundColor: COLORS.primary,
  },
  payButton: {
    backgroundColor: "#ddd",
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.secondary,
  },
  payButtonText: {
    color: "#333",
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
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },
  emptyText: {
    color: COLORS.placeholder,
    textAlign: "center",
    marginTop: 15,
    fontSize: 16,
    marginBottom: 20,
  },
  searchButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },
  searchButtonText: {
    color: COLORS.secondary,
    fontWeight: "bold",
  },
  listContent: {
    paddingBottom: 30,
  },
});
