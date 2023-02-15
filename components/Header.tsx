import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "ios" ? 90 : 60,
  },
  spacing: {
    marginTop: 25,
  },
  fontTitle: {
    color: "#fff",
    fontSize: 21,
    fontWeight: "bold",
  },
  fontText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
  button: {
    backgroundColor: "#2196F3",
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 9,
  },
});

export const Header = () => {
  return (
    <View style={styles.container}>
      <View style={styles.spacing}>
        <Text style={styles.fontTitle}>Crea la tua scheda di allenamento</Text>
      </View>
      <View style={styles.spacing}>
        <Text style={styles.fontText}>Avvio rapido</Text>
      </View>
      <View style={styles.spacing}>
        <TouchableOpacity style={styles.button} activeOpacity={0.8}>
          <Text style={styles.fontText}>Crea scheda</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
