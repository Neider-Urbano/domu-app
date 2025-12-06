import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Notification = {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
};

const DUMMY_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    title: "Pago Recibido",
    message: "El pago de tu arriendo ha sido exitoso. Gracias!",
    date: "Hace 5 minutos",
    read: false,
  },
  {
    id: "2",
    title: "Nueva Solicitud",
    message: "Tienes una nueva solicitud de arriendo para el apartamento 101.",
    date: "Hace 1 hora",
    read: false,
  },
  {
    id: "3",
    title: "Mantenimiento Programado",
    message: "El mantenimiento del elevador será el 15/12.",
    date: "Ayer",
    read: true,
  },
  {
    id: "4",
    title: "Alerta de Vencimiento",
    message: "Recuerda que tu contrato de arriendo vence en 30 días.",
    date: "28 Nov, 2025",
    read: true,
  },
];

const NotificationItem: React.FC<{ item: Notification }> = ({ item }) => (
  <TouchableOpacity
    style={[styles.notificationCard, item.read ? styles.readCard : null]}
    onPress={() => {
      console.log(`Ver detalle de notificación ${item.id}`);
    }}
  >
    <View style={styles.iconContainer}>
      <Ionicons
        name={item.read ? "mail-open-outline" : "mail-outline"}
        size={24}
        color={item.read ? "#6c757d" : "#007bff"}
      />
    </View>
    <View style={styles.content}>
      <Text style={[styles.titleText, item.read ? styles.readText : null]}>
        {item.title}
      </Text>
      <Text style={styles.message} numberOfLines={2}>
        {item.message}
      </Text>
      <Text style={styles.date}>{item.date}</Text>
    </View>
  </TouchableOpacity>
);

export default function NotificationsScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.pageTitle}>Notificaciones y Alertas</Text>

        <View>
          <FlatList
            data={DUMMY_NOTIFICATIONS}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <NotificationItem item={item} />}
            contentContainerStyle={styles.listContent}
            scrollEnabled={false}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No tienes notificaciones.</Text>
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  scrollContainer: {
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 20,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#343a40",
    marginBottom: 20,
  },
  listContent: {
    paddingVertical: 10,
  },
  notificationCard: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#007bff",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  readCard: {
    backgroundColor: "#e9ecef",
    borderLeftColor: "#6c757d",
  },
  iconContainer: {
    marginRight: 15,
    justifyContent: "center",
  },
  content: {
    flex: 1,
  },
  titleText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#343a40",
    marginBottom: 2,
  },
  readText: {
    fontWeight: "normal",
    color: "#6c757d",
  },
  message: {
    fontSize: 14,
    color: "#495057",
    marginBottom: 5,
  },
  date: {
    fontSize: 12,
    color: "#6c757d",
    textAlign: "right",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "#6c757d",
  },
});
