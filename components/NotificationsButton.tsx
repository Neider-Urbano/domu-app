import { COLORS } from "@/theme/color";
import { Notification } from "@/types/notification.type";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Nuevo pago recibido",
    message: "El inquilino ha pagado el arriendo.",
  },
  {
    id: "2",
    title: "Contrato por vencer",
    message: "Tu contrato vence en 15 días.",
  },
  {
    id: "3",
    title: "Reparación solicitada",
    message: "El inquilino solicitó una reparación.",
  },
];

export const NotificationsButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleModal = () => setVisible((prev) => !prev);

  return (
    <>
      <TouchableOpacity onPress={toggleModal} style={{ marginRight: 16 }}>
        <Ionicons name="notifications-outline" size={24} color="#fff" />
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Notificaciones</Text>
            <FlatList
              data={mockNotifications}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.notificationItem}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.message}>{item.message}</Text>
                </View>
              )}
            />

            <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
              <Text style={{ color: "#fff", textAlign: "center" }}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: "70%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  notificationItem: {
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  title: {
    fontWeight: "600",
  },
  message: {
    color: "#444",
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 8,
  },
});
