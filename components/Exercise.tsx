import React from "react";
import { StyleSheet, Text, View, Platform } from "react-native";

export const Exercise = () => {
  return (
    <View style={styles.coantainer}>
      <View style={styles.containerImg}>
        <Text>IMG</Text>
      </View>
      <View style={styles.containerInfoExercise}>
        <View>
          <Text style={styles.textTitle}>Running</Text>
        </View>
        <View>
          <Text style={styles.textMuscle}>Cardio</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  coantainer: {
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderColor: "#38383A",
    flexDirection: "row",
  },
  containerImg: {
    backgroundColor: "white",
  },
  containerInfoExercise: {
    flex: 1,
    marginLeft: 15,
  },
  textTitle: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 16,
  },
  textMuscle: {
    color: "#888",
  },
});
