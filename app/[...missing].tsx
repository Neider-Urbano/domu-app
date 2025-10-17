import { COLORS } from "@/theme/color";
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function NotFound() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>404</Text>
      <Text style={styles.message}>Página no encontrada</Text>
      <Link href="/(auth)/login" style={styles.link}>
        Volver al inicio
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  message: {
    fontSize: 18,
    color: COLORS.textDark,
    marginBottom: 20,
  },
  link: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: "bold",
  },
});
