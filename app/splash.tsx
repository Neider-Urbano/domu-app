import { COLORS } from "@/theme/color";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => router.replace("/welcome"), 2000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/domu-logo.png")}
        style={styles.logo}
      />
      <Text style={styles.text}>DOMU</Text>
      <Text style={styles.designed}>Designed by @neider</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  text: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.primary,
    marginTop: 10,
  },
  designed: {
    position: "absolute",
    bottom: 30,
    fontSize: 12,
    color: COLORS.primary,
  },
});
