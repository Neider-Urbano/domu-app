import {
  createPropiedad,
  CreatePropiedadData,
  TipoPropiedad,
} from "@/api/propiedad.service";
import { useAuth } from "@/context/AuthContext";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { showMessage } from "react-native-flash-message";

const COLORS = {
  primary: "#2E3B59",
  background: "#F5F5F5",
  white: "#FFFFFF",
  gray: "#A0AEC0",
  textDark: "#333333",
};

export default function CreatePropertyScreen() {
  const { token } = useAuth();

  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [precioBase, setPrecioBase] = useState("");
  const [caracteristicas, setCaracteristicas] = useState("");
  const [tipo, setTipo] = useState<TipoPropiedad>("departamento");

  const handleSubmit = async () => {
    if (!token) {
      alert("Usuario no autenticado");
      return;
    }

    const payload: CreatePropiedadData = {
      nombre,
      direccion,
      fotos: [],
      tipo: tipo,
      caracteristicas,
      precioBase: parseFloat(precioBase.replace(/[^0-9.]/g, "")) || 0,
    };

    const res = await createPropiedad(payload, token);

    if (!res.success) {
      showMessage({
        message: res.message || "Error al crear propiedad",
        type: "danger",
      });
      return;
    }

    showMessage({
      message: "Propiedad creada correctamente",
      type: "success",
    });

    router.push("/mis-propiedades");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Nueva Propiedad</Text>

        <Text style={styles.label}>Nombre de la propiedad</Text>
        <TextInput
          value={nombre}
          onChangeText={setNombre}
          placeholder="Ej: Arriendo 1"
          style={styles.input}
        />

        <Text style={styles.label}>Dirección completa</Text>
        <TextInput
          value={direccion}
          onChangeText={setDireccion}
          placeholder="Ej: Calle 123 #45-67"
          style={styles.input}
        />

        <Text style={styles.label}>Tipo de Inmueble</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={tipo}
            onValueChange={(value) => setTipo(value)}
            style={styles.picker}
          >
            <Picker.Item label="Casa" value="casa" />
            <Picker.Item label="Apartamento" value="departamento" />
            <Picker.Item label="Otro" value="otro" />
          </Picker>
        </View>

        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Monto del Arriendo</Text>
            <TextInput
              value={precioBase}
              onChangeText={setPrecioBase}
              placeholder="$120.000"
              keyboardType="numeric"
              style={styles.input}
            />
          </View>
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={styles.label}>Características</Text>
            <TextInput
              value={caracteristicas}
              onChangeText={setCaracteristicas}
              placeholder="Ej: Cocina, Patio"
              style={styles.input}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Registrar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  container: {
    padding: 20,
    flexGrow: 1,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.primary,
    textAlign: "center",
    marginBottom: 25,
  },
  label: {
    fontSize: 14,
    color: COLORS.textDark,
    marginBottom: 6,
    marginTop: 10,
  },
  input: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.gray,
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    color: COLORS.textDark,
  },
  pickerContainer: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.gray,
    borderWidth: 1,
    borderRadius: 10,
  },
  picker: { height: 50, color: COLORS.textDark },
  row: { flexDirection: "row", justifyContent: "space-between" },
  button: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 30,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "700",
  },
});
