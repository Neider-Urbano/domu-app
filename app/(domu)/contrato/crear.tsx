import { User } from "@/api/auth.service";
import { createContrato } from "@/api/contrato.service";
import { getPropiedad, Propiedad } from "@/api/propiedad.service";
import { getUsuarioById } from "@/api/user.service";
import { useAuth } from "@/context/AuthContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { showMessage } from "react-native-flash-message";

export default function CrearContratoScreen() {
  const { idInquilino, idPropiedad } = useLocalSearchParams<{
    idInquilino: string;
    idPropiedad: string;
  }>();
  const { token } = useAuth();
  const router = useRouter();

  const [inquilino, setInquilino] = useState<User | null>(null);
  const [propiedad, setPropiedad] = useState<Propiedad | null>(null);
  const [loading, setLoading] = useState(true);
  const [duracion, setDuracion] = useState<number>(12);
  const [condiciones, setCondiciones] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const [resInquilino, resPropiedad] = await Promise.all([
        getUsuarioById(idInquilino!, token!),
        getPropiedad(idPropiedad!),
      ]);

      if (resInquilino.data) {
        setInquilino(resInquilino.data);
      }
      if (resPropiedad.data) {
        setPropiedad(resPropiedad.data);
      }

      setLoading(false);
    };

    fetchData();
  }, [idInquilino, idPropiedad]);

  const handleCreateContract = async () => {
    if (!token || !inquilino || !propiedad) return;

    const hoy = new Date();
    const fin = new Date(hoy);
    fin.setMonth(fin.getMonth() + 12);

    const contratoData = {
      fechaInicio: hoy.toISOString(),
      fechaFin: fin.toISOString(),
      duracion,
      condiciones,
      idInquilino: inquilino._id,
      idPropiedad: propiedad._id,
    };

    const res = await createContrato(contratoData, token);

    if (res.success) {
      showMessage({
        message: "Contrato creado exitosamente",
        type: "success",
      });

      setDuracion(12);
      setCondiciones("");

      router.push(`/propiedad/${idPropiedad}`);
    } else {
      showMessage({
        message: "Error al crear contrato: " + res.message,
        type: "danger",
      });
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2E3B59" />
        <Text style={{ marginTop: 10 }}>Cargando datos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Contrato</Text>

      <Text style={styles.label}>Monto Mensual de Arriendo</Text>
      <TextInput
        style={styles.input}
        value={propiedad?.precioBase?.toString() || ""}
        editable={false}
      />

      <Text style={styles.label}>Inquilino Asociado</Text>
      <TextInput
        style={styles.input}
        value={inquilino?.nombre || ""}
        editable={false}
      />

      <Text style={styles.label}>Propiedad Asociada</Text>
      <TextInput
        style={styles.input}
        value={propiedad?.nombre || ""}
        editable={false}
      />

      <Text style={styles.label}>Duración del Contrato en Meses</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={duracion.toString()}
        onChangeText={(text) => setDuracion(Number(text))}
      />

      <Text style={styles.label}>Términos Adicionales</Text>
      <TextInput
        style={[styles.input, styles.textarea]}
        multiline
        value={condiciones}
        onChangeText={setCondiciones}
      />

      <TouchableOpacity
        style={styles.createButton}
        onPress={handleCreateContract}
      >
        <Text style={styles.createText}>Crear Contrato</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    fontWeight: "600",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 15,
  },
  textarea: {
    height: 80,
    textAlignVertical: "top",
  },
  createButton: {
    backgroundColor: "#2E3B59",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  createText: {
    color: "#fff",
    fontWeight: "600",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
