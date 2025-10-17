import { registerUser, Rol } from "@/api/auth.service";
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

interface CustomIconProps {
  emoji: string;
  size: number;
  color: string;
}

const CustomIcon: React.FC<CustomIconProps> = ({ emoji, size, color }) => (
  <Text
    style={{
      fontSize: size,
      color: color,
      paddingHorizontal: 4,
      fontWeight: "bold",
    }}
  >
    {emoji}
  </Text>
);

const RegisterScreen: React.FC = () => {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<Rol>(Rol.PROPIETARIO);
  const [loading, setLoading] = useState<boolean>(false);

  const getRoleDisplayName = (role: Rol): string => {
    switch (role) {
      case Rol.PROPIETARIO:
        return "Propietario";
      case Rol.INQUILINO:
        return "Inquilino";
      default:
        return "";
    }
  };

  const handleRegister = async (): Promise<void> => {
    if (!name || !email || !password || !confirmPassword) {
      showMessage({
        message: "Por favor, complete todos los campos.",
        type: "warning",
      });

      return;
    }

    if (password.length < 6) {
      showMessage({
        message: "La contraseña debe tener al menos 6 caracteres.",
        type: "warning",
      });
      return;
    }

    if (password !== confirmPassword) {
      showMessage({
        message: "Las contraseñas no coinciden.",
        type: "warning",
      });
      return;
    }

    setLoading(true);

    try {
      const data = await registerUser({
        name,
        email,
        password,
        role: selectedRole,
      });

      if (data) {
        showMessage({
          message: `Registro Exitoso. ¡Cuenta de ${getRoleDisplayName(
            selectedRole
          )} creada! Ahora puedes iniciar sesión.`,
          type: "success",
        });

        router.replace("/(auth)/login");
      } else {
        showMessage({
          message: "Error de Registro",
          type: "danger",
        });
      }
    } catch {
      showMessage({
        message: "Error de Red",
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
        <Text style={styles.title}>Sign Up</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter Your Name"
          placeholderTextColor={COLORS.placeholder}
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Enter Your Email"
          placeholderTextColor={COLORS.placeholder}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Create Your Password"
          secureTextEntry
          placeholderTextColor={COLORS.placeholder}
          value={password}
          onChangeText={setPassword}
        />

        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
          placeholderTextColor={COLORS.placeholder}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <Text style={styles.roleLabel}>Selecciona tu Rol:</Text>

        <View style={styles.roleContainer}>
          <TouchableOpacity
            style={[
              styles.roleButton,
              selectedRole === Rol.PROPIETARIO && styles.roleButtonActive,
            ]}
            onPress={() => setSelectedRole(Rol.PROPIETARIO)}
            disabled={loading}
          >
            <CustomIcon
              emoji="🏠"
              size={24}
              color={
                selectedRole === Rol.PROPIETARIO
                  ? COLORS.textLight
                  : COLORS.primary
              }
            />
            <Text
              style={[
                styles.roleText,
                selectedRole === Rol.PROPIETARIO && styles.roleTextActive,
              ]}
            >
              Propietario
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.roleButton,
              selectedRole === Rol.INQUILINO && styles.roleButtonActive,
            ]}
            onPress={() => setSelectedRole(Rol.INQUILINO)}
            disabled={loading}
          >
            <CustomIcon
              emoji="👤"
              size={24}
              color={
                selectedRole === Rol.INQUILINO
                  ? COLORS.textLight
                  : COLORS.primary
              }
            />
            <Text
              style={[
                styles.roleText,
                selectedRole === Rol.INQUILINO && styles.roleTextActive,
              ]}
            >
              Inquilino
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={COLORS.textLight} />
          ) : (
            <Text style={styles.buttonText}>Sign Up</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.linkText}>
          Already Have An Account?{" "}
          <Text
            style={styles.link}
            onPress={() => router.push("/(auth)/login")}
          >
            Log In
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

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
  roleLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.textDark,
    marginBottom: 10,
  },
  roleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    marginHorizontal: -5,
  },
  roleButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.secondary,
    paddingVertical: 15,
    borderRadius: 12,
    borderColor: COLORS.placeholder,
    borderWidth: 1,
    marginHorizontal: 5,
  },
  roleButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  roleText: {
    marginLeft: 8,
    color: COLORS.primary,
    fontWeight: "600",
    fontSize: 16,
  },
  roleTextActive: {
    color: COLORS.textLight,
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

export default RegisterScreen;
