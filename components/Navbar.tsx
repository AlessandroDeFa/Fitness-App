import React from "react";
import { StyleSheet, View, Text, Platform } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#182935",
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    width: "100%",
    borderWidth: 1,
    borderTopColor: "#888",
    paddingBottom: Platform.OS === "ios" ? 15 : 0,
  },
  containerLink: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  textNav: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "400",
  },
  icon: {
    color: "#FFF",
    fontSize: 20,
  },
});

export const Navbar = () => {
  return (
    <View style={styles.container}>
      <View style={styles.containerLink}>
        <View>
          <MaterialIcons name="fitness-center" style={styles.icon} />
        </View>
        <View>
          <Text style={styles.textNav}>Esercizi</Text>
        </View>
      </View>
      <View style={styles.containerLink}>
        <View>
          <FontAwesome name="plus" style={styles.icon} />
        </View>
        <View>
          <Text style={styles.textNav}>Inizia allenamento</Text>
        </View>
      </View>
      <View style={styles.containerLink}>
        <View>
          <FontAwesome5 name="crown" style={styles.icon} />
        </View>
        <View>
          <Text style={styles.textNav}>Aggiorna</Text>
        </View>
      </View>
    </View>
  );
};
