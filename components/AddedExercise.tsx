import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Platform,
  TextInput,
} from "react-native";

export const AddedExercise = ({ data }) => {
  return (
    <View style={styles.containerExercise}>
      <View>
        <Text style={styles.fontTitle}>{data}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerExercise: {
    marginTop: 25,
  },
  fontTitle: {
    color: "#3B82F7",
    fontSize: 17,
    fontWeight: "bold",
  },
});
