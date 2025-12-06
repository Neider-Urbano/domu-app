import { User } from "@/api/auth.service";
import { getPropiedad, Propiedad } from "@/api/propiedad.service";
import { buscarUsuarios } from "@/api/user.service";
import { useAuth } from "@/context/AuthContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function AsignarInquilinoScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { token } = useAuth();
  const router = useRouter();

  const [propiedad, setPropiedad] = useState<Propiedad | null>(null);
  const [query, setQuery] = useState("");
  const [usuarios, setUsuarios] = useState<User[]>([]);
  const [selected, setSelected] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    const fetchPropiedad = async () => {
      const res = await getPropiedad(id!);
      if (res.success && res.data) {
        setPropiedad(res.data);
      }
      setLoading(false);
    };
    fetchPropiedad();
  }, [id]);

  const handleSearch = async () => {
    if (!query.trim() || !token) return;
    setSearching(true);

    const res = await buscarUsuarios(query, token);

    if (res.success && res.data) {
      setUsuarios(res.data);
    }

    setSearching(false);
  };

  const handleAssign = () => {
    if (!selected) {
      return;
    }

    router.push({
      pathname: "/contrato/crear",
      params: {
        idPropiedad: id,
        idInquilino: selected._id,
      },
    });
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2E3B59" />
        <Text style={{ marginTop: 10 }}>Cargando propiedad...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestionar Inquilinos</Text>
      <Text style={styles.title}>{propiedad?.nombre}</Text>

      <TextInput
        placeholder="Email / Nombre"
        value={query}
        onChangeText={setQuery}
        style={styles.input}
      />

      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.searchText}>Buscar Inquilino</Text>
      </TouchableOpacity>

      {searching ? (
        <ActivityIndicator size="small" color="#2E3B59" />
      ) : (
        <FlatList
          data={usuarios}
          keyExtractor={(item) => item._id}
          horizontal
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.avatarContainer,
                selected?._id === item._id && styles.selectedAvatar,
              ]}
              onPress={() => setSelected(item)}
            >
              <Image
                style={styles.avatar}
                source={{
                  uri: `https://ui-avatars.com/api/?name=${item.nombre}`,
                }}
              />
            </TouchableOpacity>
          )}
          contentContainerStyle={{ marginVertical: 15 }}
        />
      )}

      {selected && (
        <TouchableOpacity
          onPress={() => router.push(`/usuario/${selected._id}`)}
        >
          <View style={styles.selectedBox}>
            <Image
              source={{
                uri: `https://ui-avatars.com/api/?name=${selected.nombre}`,
              }}
              style={styles.avatarSmall}
            />
            <Text style={styles.selectedName}>{selected.nombre}</Text>
          </View>
        </TouchableOpacity>
      )}

      <View style={styles.btnsAction}>
        <TouchableOpacity
          onPress={() => router.push(`/propiedad/${id}`)}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>Volver</Text>
        </TouchableOpacity>

        <TouchableOpacity
          disabled={!selected}
          onPress={handleAssign}
          style={[styles.addButton, !selected && { opacity: 0.6 }]}
        >
          <Text style={styles.addButtonText}>Añadir Inquilino</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  searchButton: {
    backgroundColor: "#fff",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#2E3B59",
    marginTop: 10,
    paddingVertical: 10,
    alignItems: "center",
  },
  searchText: {
    color: "#2E3B59",
    fontWeight: "600",
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginHorizontal: 5,
    backgroundColor: "#DADADA",
    justifyContent: "center",
    alignItems: "center",
  },
  selectedAvatar: {
    borderWidth: 2,
    borderColor: "#2E3B59",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  selectedBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E2E2E2",
    borderRadius: 10,
    padding: 10,
    marginVertical: 20,
  },
  avatarSmall: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  selectedName: {
    fontSize: 16,
    fontWeight: "500",
  },
  addButton: {
    width: "47%",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: "#2E3B59",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    width: "47%",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#ddd",
  },
  backButtonText: {
    fontSize: 16,
    color: "#2E3B59",
    fontWeight: "500",
    textAlign: "center",
  },
  btnsAction: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
