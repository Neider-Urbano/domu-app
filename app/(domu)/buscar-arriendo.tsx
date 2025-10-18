import {
  buscarPropiedadesDisponibles,
  Propiedad,
} from "@/api/propiedad.service";
import { useAuth } from "@/context/AuthContext";
import { COLORS } from "@/theme/color";
import { Feather, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { showMessage } from "react-native-flash-message";

export default function BuscarArriendoScreen() {
  const { token } = useAuth();

  const [query, setQuery] = useState("");
  const [propiedades, setPropiedades] = useState<Propiedad[]>([]);
  const [selectedPropiedad, setSelectedPropiedad] = useState<Propiedad | null>(
    null
  );

  const [searching, setSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!query.trim() || !token) {
      setError("Por favor, ingrese un término de búsqueda.");
      return;
    }

    setError(null);
    setSearching(true);
    Keyboard.dismiss();

    const res = await buscarPropiedadesDisponibles(query, token);

    if (res.success && res.data) {
      setPropiedades(res.data);

      if (res.data.length === 0) {
        setError("No se encontraron propiedades con ese criterio.");
      }
    } else {
      setError(res.message || "Error al buscar propiedades.");
      setPropiedades([]);
    }

    setSearching(false);
  };

  const handleSolicitarArriendo = () => {
    if (!selectedPropiedad) {
      showMessage({
        message: "Debe seleccionar una propiedad para solicitar el arriendo.",
        type: "danger",
      });
      return;
    } else {
      showMessage({
        message: "Solicitud Enviada.",
        type: "success",
      });

      setQuery("");
      setPropiedades([]);
      setSelectedPropiedad(null);
      setSearching(false);
      setError(null);
    }
  };

  const renderPropiedad = ({ item }: { item: Propiedad }) => {
    const isSelected = selectedPropiedad?._id === item._id;

    const imageUri =
      item.fotos?.[0] || `https://via.placeholder.com/60?text=Prop`;

    return (
      <TouchableOpacity
        style={[styles.propiedadCard, isSelected && styles.selectedCard]}
        onPress={() => setSelectedPropiedad(item)}
      >
        <Image style={styles.propiedadImage} source={{ uri: imageUri }} />
        <View style={styles.propiedadInfo}>
          <Text style={styles.propiedadName} numberOfLines={1}>
            {item.nombre}
          </Text>
          <Text style={styles.propiedadAddress} numberOfLines={1}>
            {item.direccion}
          </Text>
        </View>
        <Ionicons
          size={24}
          color={COLORS.placeholder}
          name={isSelected ? "checkmark-circle" : "radio-button-off"}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscar Arriendo</Text>

      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Ubicación / Precio / Tipo"
          placeholderTextColor={COLORS.placeholder}
          value={query}
          onChangeText={setQuery}
          style={styles.searchInput}
          onSubmitEditing={handleSearch}
        />
        <Feather
          name="search"
          size={20}
          color={COLORS.placeholder}
          style={styles.searchIcon}
        />
      </View>

      <TouchableOpacity
        style={styles.searchButton}
        onPress={handleSearch}
        disabled={searching}
      >
        {searching ? (
          <ActivityIndicator color={COLORS.secondary} />
        ) : (
          <Text style={styles.searchButtonText}>Buscar Propiedad</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.listTitle}>Lista de Propiedades</Text>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <FlatList
        data={propiedades}
        keyExtractor={(item) => item._id}
        renderItem={renderPropiedad}
        ListEmptyComponent={
          !searching && !error ? (
            <Text style={styles.emptyText}>
              Ingresa un término para buscar propiedades disponibles.
            </Text>
          ) : null
        }
        contentContainerStyle={{ paddingBottom: 20 }}
        style={styles.flatList}
      />

      <TouchableOpacity
        onPress={() => router.push(`/propiedad/${selectedPropiedad?._id}`)}
      >
        <View style={styles.selectedBox}>
          <Text style={styles.selectedBoxLabel}>Propiedad Seleccionada</Text>
          <Text style={styles.selectedBoxValue} numberOfLines={1}>
            {selectedPropiedad ? selectedPropiedad.nombre : "Ninguna"}
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.actionButton,
          !selectedPropiedad && styles.actionButtonDisabled,
        ]}
        onPress={handleSolicitarArriendo}
        disabled={!selectedPropiedad}
      >
        <Text style={styles.actionButtonText}>Solicitar Arriendo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.textDark,
    textAlign: "center",
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.secondary,
    borderRadius: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: COLORS.placeholder,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: COLORS.textDark,
  },
  searchIcon: {
    marginLeft: 10,
  },
  searchButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    marginTop: 15,
    paddingVertical: 12,
    alignItems: "center",
  },
  searchButtonText: {
    color: COLORS.secondary,
    fontWeight: "700",
    fontSize: 16,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.textDark,
    marginTop: 25,
    marginBottom: 10,
  },
  flatList: {
    maxHeight: 250, // Limitar la altura de la lista de resultados
    marginBottom: 10,
  },
  propiedadCard: {
    flexDirection: "row",
    backgroundColor: COLORS.secondary,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "transparent",
  },
  selectedCard: {
    borderColor: COLORS.primary,
    backgroundColor: "#E6E8F0",
  },
  propiedadImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 15,
    backgroundColor: COLORS.placeholder,
  },
  propiedadInfo: {
    flex: 1,
    marginRight: 10,
  },
  propiedadName: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.textDark,
  },
  propiedadAddress: {
    fontSize: 14,
    color: COLORS.placeholder,
    marginTop: 2,
  },
  selectedBox: {
    backgroundColor: COLORS.secondary,
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: COLORS.primary,
    marginBottom: 20,
  },
  selectedBoxLabel: {
    fontSize: 12,
    color: COLORS.placeholder,
    marginBottom: 5,
  },
  selectedBoxValue: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.primary,
  },
  actionButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
  },
  actionButtonDisabled: {
    opacity: 0.7,
  },
  actionButtonText: {
    color: COLORS.secondary,
    fontWeight: "700",
    fontSize: 18,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
  },
  emptyText: {
    textAlign: "center",
    color: COLORS.placeholder,
    marginTop: 20,
  },
});
