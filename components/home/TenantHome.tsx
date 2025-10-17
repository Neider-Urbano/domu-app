import { COLORS } from "@/theme/color";
import { ContratoData, Movimiento } from "@/types/home.type";
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { CardResumen, CardSmall, MovementsList, QuickActions } from "./shared";

export default function TenantHome() {
  const contrato: ContratoData = {
    monto: 4500,
    fechaInicio: "15/09/2025",
    nombre: "Arriendo 1",
  };

  const pagosRealizados: number = 9;
  const proximoVencimiento: string = "12/12/2025";

  const movimientos: Movimiento[] = [
    { name: "Arriendo 1", amount: 25.5 },
    { name: "Arriendo 1", amount: 30.5 },
  ];

  const acciones: string[] = [
    "Contactar Arrendador",
    "Ver Contrato",
    "Solicitar Reparación",
    "Registrar Pago",
    "Descargar Reporte",
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.addText}>+ Pagar Ahora</Text>

        <CardResumen title="Mi Contrato Activo" data={contrato} />

        <View style={styles.row}>
          <CardSmall title="Pagos Realizados" value={pagosRealizados} />
          <CardSmall title="Próximo Vencimiento" value={proximoVencimiento} />
        </View>

        <QuickActions title="Acciones Rápidas" actions={acciones} />

        <MovementsList title="Movimientos Recientes" data={movimientos} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  container: { padding: 16 },
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
