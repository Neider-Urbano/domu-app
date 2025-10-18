import { Contrato, getContrato } from "@/api/contrato.service";
import { useAuth } from "@/context/AuthContext";
import { COLORS } from "@/theme/color";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function DetalleContratoScreen() {
  const { token } = useAuth();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [contrato, setContrato] = useState<Contrato | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContrato = async () => {
      if (!id || !token) return;

      const res = await getContrato(id, token);

      if (res.success && res.data) {
        setContrato(res.data);
      }

      setLoading(false);
    };

    fetchContrato();
  }, [id, token]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-CO", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={{ color: COLORS.textDark, marginTop: 10 }}>
          Cargando detalles del contrato...
        </Text>
      </View>
    );
  }

  if (!contrato) {
    return (
      <View style={styles.center}>
        <Text style={{ color: COLORS.placeholder }}>
          No se encontró el contrato o no tienes permiso para verlo.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Detalles del Contrato</Text>

      <View style={styles.card}>
        <View style={styles.statusSection}>
          <Feather name="shield" size={60} color={COLORS.placeholder} />
          <Text
            style={[
              styles.statusText,
              {
                color: COLORS.placeholder,
              },
            ]}
          >
            Activo
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <View style={styles.iconInfo}>
            <Ionicons
              name="home-outline"
              size={24}
              color={COLORS.placeholder}
            />
          </View>
          <View>
            <Text style={styles.infoLabel}>Propiedad</Text>
            <Text style={styles.infoValue}>{contrato.idPropiedad.nombre}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.iconInfo}>
            <Ionicons
              name="person-outline"
              size={24}
              color={COLORS.placeholder}
            />
          </View>
          <View>
            <Text style={styles.infoLabel}>Inquilino</Text>
            <Text style={styles.infoValue}>{contrato.idInquilino.nombre}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.datePriceRow}>
          <View style={styles.dateItem}>
            <Text style={styles.dateLabel}>Firmado</Text>
            <Text style={styles.dateValue}>
              {formatDate(contrato.createdAt || contrato.fechaInicio)}
            </Text>
          </View>
          <View style={styles.priceItem}>
            <Text style={styles.dateLabel}>Precio Mensual</Text>
            <Text style={styles.priceValue}>
              <MaterialCommunityIcons
                name="currency-usd"
                size={18}
                color={COLORS.primary}
              />
              {contrato.idPropiedad.precioBase.toLocaleString("es-CO")}
            </Text>
          </View>
        </View>

        <View style={styles.datePriceRow}>
          <View style={styles.dateItem}>
            <Text style={styles.dateLabel}>Duración</Text>
            <Text style={styles.dateValue}>{contrato.duracion}</Text>
          </View>
          <View style={styles.dateItem}>
            <Text style={styles.dateLabel}>Vence</Text>
            <Text style={styles.dateValue}>
              {formatDate(contrato.fechaFin)}
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={{ width: "100%" }}>
          <Text style={styles.conditionsLabel}>Condiciones y Cláusulas</Text>
          <Text style={styles.conditionsText}>
            {contrato.condiciones ||
              "No se especificaron condiciones adicionales."}
          </Text>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.actionButton, styles.terminateButton]}
            onPress={() => alert("Función 'Terminar' no implementada.")}
          >
            <Text style={styles.buttonText}>Terminar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.renewButton]}
            onPress={() => alert("Función 'Renovar' no implementada.")}
          >
            <Text style={styles.buttonText}>Renovar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: COLORS.textDark,
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
    marginBottom: 40,
  },
  statusSection: {
    alignItems: "center",
    marginBottom: 15,
  },
  statusText: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 5,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.placeholder,
    width: "100%",
    marginVertical: 15,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  iconInfo: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.secondary,
    borderRadius: 5,
    marginRight: 15,
  },
  infoLabel: {
    fontSize: 12,
    color: COLORS.placeholder,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.textDark,
  },
  datePriceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
  },
  dateItem: {
    flex: 1,
  },
  dateLabel: {
    fontSize: 12,
    color: COLORS.placeholder,
    marginBottom: 2,
  },
  dateValue: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.textDark,
  },
  priceItem: {
    flex: 1,
    alignItems: "flex-end",
  },
  priceValue: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
  },
  conditionsLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textDark,
    marginBottom: 5,
  },
  conditionsText: {
    fontSize: 14,
    color: COLORS.textDark,
    textAlign: "justify",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
    width: "100%",
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 6,
    borderRadius: 10,
    alignItems: "center",
  },
  terminateButton: {
    backgroundColor: COLORS.primary,
  },
  renewButton: {
    backgroundColor: COLORS.primary,
  },
  buttonText: {
    fontWeight: "600",
    color: COLORS.secondary,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
});
