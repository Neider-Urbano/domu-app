import { COLORS } from "@/theme/color";
import {
  CardResumenProps,
  CardSmallProps,
  MovementsListProps,
  QuickActionsProps,
} from "@/types/home.type";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export function CardResumen({ title, data }: CardResumenProps) {
  return (
    <View style={styles.cardResumen}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.amount}>${data.monto.toLocaleString()}</Text>
      <Text style={styles.subInfo}>
        {data.total ? `${data.pagados} / ${data.total}` : data.fechaInicio}
      </Text>
      <Text style={styles.subInfo}>{data.nombre}</Text>
    </View>
  );
}

export function CardSmall({ title, value }: CardSmallProps) {
  return (
    <View style={styles.cardSmall}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

export function QuickActions({ title, actions }: QuickActionsProps) {
  return (
    <View style={{ marginTop: 20 }}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <TouchableOpacity>
          <Text style={styles.link}>Ver Más</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 10 }}
      >
        {actions.map((action, i) => (
          <View key={i} style={styles.quickButton}>
            <Text style={styles.quickText}>{action}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

export function MovementsList({ title, data }: MovementsListProps) {
  return (
    <View style={{ marginTop: 20 }}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <TouchableOpacity>
          <Text style={styles.link}>Ver Más</Text>
        </TouchableOpacity>
      </View>
      {data.map((item, i) => (
        <View key={i} style={styles.movementItem}>
          <View style={styles.icon}>
            <Text style={{ color: COLORS.textLight, fontWeight: "bold" }}>
              {item.name[0]}
            </Text>
          </View>
          <Text style={styles.movementText}>{item.name}</Text>
          <Text style={styles.movementAmount}>${item.amount.toFixed(2)}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  cardResumen: {
    backgroundColor: COLORS.secondary,
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  cardTitle: { fontWeight: "600", marginBottom: 6 },
  amount: { fontSize: 24, fontWeight: "700", color: COLORS.primary },
  subInfo: { color: COLORS.placeholder },
  cardSmall: {
    flex: 1,
    backgroundColor: COLORS.secondary,
    padding: 15,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  value: { fontSize: 16, fontWeight: "700", color: COLORS.primary },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: { fontWeight: "700", fontSize: 16 },
  link: { color: COLORS.primary, fontWeight: "bold" },
  quickButton: {
    backgroundColor: COLORS.secondary,
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  quickText: { color: COLORS.textDark, fontSize: 12, textAlign: "center" },
  movementItem: {
    backgroundColor: COLORS.secondary,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 12,
    marginTop: 8,
  },
  icon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  movementText: { flex: 1, fontWeight: "500", color: COLORS.textDark },
  movementAmount: { fontWeight: "700", color: COLORS.textDark },
});
