import { COLORS } from "@/theme/color";
import { Movimiento, ResumenData } from "@/types/home.type";
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { CardResumen, CardSmall, MovementsList, QuickActions } from "./shared";

export default function OwnerHome() {
  const cobrosPendientes: number = 180;
  const arriendosPorVencer: number = 5;

  const resumen: ResumenData = {
    monto: 4500,
    total: 3,
    pagados: 2,
    nombre: "Mr Rakib",
  };

  const movimientos: Movimiento[] = [
    { name: "Neider Urbano", amount: 25.5 },
    { name: "Julian Bastilla", amount: 30.5 },
  ];

  const acciones: string[] = [
    "Gestionar Inmuebles",
    "Crear Contrato",
    "Generar Reporte",
    "Enviar Notificación",
    "Ver Inquilinos",
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.addText}>+ Agregar Propiedad</Text>
        <CardResumen title="Resumen de Cartera" data={resumen} />

        <View style={styles.row}>
          <CardSmall title="Cobros Pendientes" value={`$${cobrosPendientes}`} />
          <CardSmall title="Arriendos por Vencer" value={arriendosPorVencer} />
        </View>

        <QuickActions title="Acciones Rápidas" actions={acciones} />

        <MovementsList title="Movimientos Recientes" data={movimientos} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    padding: 16,
  },
  addText: {
    color: COLORS.primary,
    textAlign: "right",
    marginBottom: 10,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
});
