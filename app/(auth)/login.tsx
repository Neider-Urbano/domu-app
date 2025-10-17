import { loginUser } from "@/api/auth.service";
import { useAuth } from "@/context/AuthContext";
import { COLORS } from "@/theme/color";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { showMessage } from "react-native-flash-message";

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async (): Promise<void> => {
    if (!email || !password) {
      showMessage({
        message: "Por favor, ingrese su email y contraseña.",
        type: "warning",
      });
      return;
    }

    setLoading(true);

    try {
      const data = await loginUser({ email, password });

      if (data.user && data.token) {
        await login(data.token, data.user);

        showMessage({
          message: `¡Bienvenido(a), ${data.user.nombre}! Has iniciado sesión como ${data.user.rol}.`,
          type: "success",
        });

        if (data.user.rol === "propietario" || data.user.rol === "inquilino") {
          router.replace("/(domu)/home");
        } else {
          showMessage({
            message:
              "Rol de usuario desconocido, por favor contacte a soporte.",
            type: "danger",
          });
        }
      } else {
        showMessage({
          message: "Ocurrió un error desconocido al iniciar sesión.",
          type: "danger",
        });
      }
    } catch {
      showMessage({
        message: "Hubo un problema de red inesperado.",
        type: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <View style={styles.container}>
        <Text style={styles.title}>Log In</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter Your Email"
          placeholderTextColor={COLORS.placeholder}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          editable={!loading}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Your Password"
          secureTextEntry
          placeholderTextColor={COLORS.placeholder}
          value={password}
          onChangeText={setPassword}
          editable={!loading}
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={COLORS.textLight} />
          ) : (
            <Text style={styles.buttonText}>Log In</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.linkText}>
          Don’t Have An Account?{" "}
          <Text
            style={styles.link}
            onPress={() => router.push("/(auth)/register")}
          >
            Sign Up
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 30,
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: COLORS.textDark,
    textAlign: "center",
    marginBottom: 40,
  },
  input: {
    backgroundColor: COLORS.secondary,
    borderColor: COLORS.placeholder,
    borderWidth: 1,
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    color: COLORS.textDark,
    fontSize: 16,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: COLORS.textLight,
    fontSize: 18,
    fontWeight: "700",
  },
  linkText: {
    textAlign: "center",
    marginTop: 30,
    color: COLORS.placeholder,
    fontSize: 14,
  },
  link: {
    color: COLORS.primary,
    fontWeight: "bold",
  },
});
