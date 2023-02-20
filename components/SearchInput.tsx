import React from "react";
import { StyleSheet, View, Platform, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { ContextApp } from "../Navigation/TabNavigator";

export const SearchInput = () => {
  const { filterExercises } = useContext(ContextApp);

  return (
    <View style={styles.containerInput}>
      <Ionicons name="search" size={16} color="#606669" />
      <TextInput
        placeholder="Ricerca"
        placeholderTextColor="#606669"
        style={styles.input}
        onChangeText={(value) => filterExercises(value)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
});
