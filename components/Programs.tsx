import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";

export const Programs = () => {
  return (
    <View style={styles.container}>
      <View style={styles.spacingTitle}>
        <Text style={[styles.colorText, styles.textTitle]}>Schede</Text>
      </View>
      <View style={styles.spacingText}>
        <Text style={styles.colorText}>Le tue schede (0)</Text>
      </View>
      <View>
        <Text style={styles.colorText}>Esempi di schede (5)</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },
  spacingTitle: {
    marginBottom: 15,
  },
  textTitle: {
    fontSize: 20,
  },
  spacingText: {
    marginBottom: 10,
  },
  colorText: {
    color: "#ffff",
    fontWeight: "500",
  },
});
