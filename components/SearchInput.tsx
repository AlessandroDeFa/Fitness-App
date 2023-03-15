import React, { useState } from "react";
import { StyleSheet, View, Platform, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { ContextApp } from "../Navigation/TabNavigator";

export const SearchInput = () => {
  const { filterExercises } = useContext(ContextApp);
  const [value, setValue] = useState<string>("");

  const handleInputChange = (text: string) => {
    setValue(text);
    filterExercises(text);
  };

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setValue("");
        filterExercises(value);
      };
    }, [])
  );

  return (
    <View style={styles.containerInput}>
      <Ionicons name="search" size={16} color="#606669" />
      <TextInput
        value={value}
        placeholder="Ricerca"
        placeholderTextColor="#606669"
        style={styles.input}
        onChangeText={(value) => handleInputChange(value)}
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
    marginBottom: 10,
    paddingVertical: Platform.OS === "ios" ? 10 : 0,
  },
  input: {
    flex: 1,
    marginLeft: 5,
    color: "#fff",
  },
});
