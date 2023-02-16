import React from "react";
import { StyleSheet, Text, View, Platform, TextInput } from "react-native";
import { Navbar } from "../components/Navbar";
import { Ionicons } from "@expo/vector-icons";
import { Exercise } from "../components/Exercise";

export const Exercises = () => {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <View style={styles.header}>
          <View style={styles.spacingTitle}>
            <Text style={styles.textTitle}>Esercizi</Text>
          </View>
          <View style={styles.containerInput}>
            <Ionicons name="search" size={16} color="#606669" />
            <TextInput
              placeholder="Ricerca"
              placeholderTextColor="#606669"
              style={styles.input}
            />
          </View>
        </View>
        <View style={styles.containerExercises}>
          <Exercise />
          <Exercise />
          <Exercise />
        </View>
      </View>

      <Navbar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    paddingHorizontal: 16,
    flex: 1,
  },
  header: {
    marginTop: Platform.OS === "ios" ? 90 : 60,
    borderBottomWidth: 0.5,
    paddingBottom: 15,
    borderColor: "#38383A",
  },
  textTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  spacingTitle: {
    marginBottom: 15,
  },
  containerInput: {
    flexDirection: "row",
    backgroundColor: "#323135",
    borderRadius: 9,
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: Platform.OS === "ios" ? 10 : 0,
  },
  input: {
    flex: 1,
    marginLeft: 5,
    color: "#fff",
  },
  containerExercises: {
    flex: 1,
  },
});