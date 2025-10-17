import { updateUser } from "@/api/auth.service";
import { useAuth } from "@/context/AuthContext";
import { COLORS } from "@/theme/color";
import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { showMessage } from "react-native-flash-message";

export default function AccountScreen() {
  const { user, token } = useAuth();

  const [formData, setFormData] = useState({
    nombre: user?.nombre || "",
    correo: user?.correo || "",
  });

  const [editMode, setEditMode] = useState({
    nombre: false,
    correo: false,
  });

  const handleUpdate = async () => {
    if (!user || !token) return;

    const result = await updateUser(
      {
        id: user.id,
        nombre: formData.nombre,
        correo: formData.correo,
      },
      token
    );

    if (result.success) {
      showMessage({
        message: "Tu perfil ha sido actualizado.",
        type: "success",
      });
      setEditMode({ nombre: false, correo: false });
    } else {
      showMessage({
        message: result.message || "No se pudo actualizar.",
        type: "danger",
      });
    }
  };

  const toggleEdit = (field: keyof typeof editMode) => {
    setEditMode({ ...editMode, [field]: !editMode[field] });
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  if (!user) return null;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: "https://ui-avatars.com/api/?name=Juan+Perez" }}
              style={styles.avatar}
            />
          </View>
        </View>

        <EditableField
          label="NAME"
          value={formData.nombre}
          editable={editMode.nombre}
          onEdit={() => toggleEdit("nombre")}
          onChange={(val) => handleChange("nombre", val)}
        />
        <EditableField
          label="Email"
          value={formData.correo}
          editable={editMode.correo}
          onEdit={() => toggleEdit("correo")}
          onChange={(val) => handleChange("correo", val)}
        />
        <EditableField
          label="Role"
          value={user.rol.charAt(0).toUpperCase() + user.rol.slice(1)}
          editable={false}
        />

        <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
          <Text style={styles.updateText}>Actualizar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const EditableField = ({
  label,
  value,
  editable,
  onEdit,
  onChange,
}: {
  label: string;
  value: string;
  editable: boolean;
  onEdit?: () => void;
  onChange?: (value: string) => void;
}) => (
  <View style={styles.fieldRow}>
    <Text style={styles.fieldLabel}>{label}</Text>
    <View style={styles.fieldValueContainer}>
      {editable ? (
        <TextInput
          value={value}
          onChangeText={onChange}
          style={styles.textInput}
        />
      ) : (
        <Text style={styles.fieldValue}>{value}</Text>
      )}
      {onEdit && (
        <TouchableOpacity style={styles.editIcon} onPress={onEdit}>
          <Feather
            name={editable ? "x" : "edit-3"}
            size={16}
            color={COLORS.primary}
          />
        </TouchableOpacity>
      )}
    </View>
    <View style={styles.separator} />
  </View>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },
  container: {
    paddingHorizontal: 20,
  },
  profileHeader: {
    backgroundColor: COLORS.primary,
    alignItems: "center",
    paddingVertical: 30,
    marginBottom: 20,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: COLORS.textLight,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  fieldRow: {
    marginBottom: 15,
  },
  fieldLabel: {
    fontSize: 12,
    color: COLORS.textDark,
    fontWeight: "600",
    marginBottom: 4,
  },
  fieldValueContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
  },
  fieldValue: {
    fontSize: 16,
    color: COLORS.textDark,
    flex: 1,
  },
  editIcon: {
    paddingHorizontal: 10,
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.line,
    marginTop: 5,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.textDark,
    borderBottomWidth: 1,
    borderColor: COLORS.line,
    paddingVertical: 2,
  },
  updateButton: {
    marginTop: 30,
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  updateText: {
    color: COLORS.textLight,
    fontWeight: "bold",
  },
});
