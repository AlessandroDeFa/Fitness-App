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

export const AddedExercise = () => {
  return (
    <View style={styles.containerExercise}>
      <View>
        <Text style={styles.fontTitle}>Running</Text>
      </View>
      <View style={styles.containerOptions}>
        <View style={styles.option}>
          <View>
            <Text style={styles.textOptions}>N. serie</Text>
          </View>
          <View style={styles.spacingInput}>
            <TextInput
              keyboardType="numeric"
              maxLength={3}
              style={styles.inputExercise}
            />
          </View>
        </View>
        <View style={styles.option}>
          <View>
            <Text style={styles.textOptions}>Ripetizioni</Text>
          </View>
          <View style={styles.spacingInput}>
            <TextInput
              keyboardType="numeric"
              maxLength={3}
              style={styles.inputExercise}
            />
          </View>
        </View>
        <View style={styles.option}>
          <View>
            <Text style={styles.textOptions}>Peso (Kg)</Text>
          </View>
          <View style={styles.spacingInput}>
            <TextInput
              keyboardType="numeric"
              maxLength={3}
              style={styles.inputExercise}
            />
          </View>
        </View>
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
  containerOptions: {
    flexDirection: "row",
    marginTop: 10,
  },
  option: {
    flex: 1,
  },
  textOptions: {
    color: "white",
    fontWeight: "500",
    textAlign: "center",
    fontSize: 15,
  },
  inputExercise: {
    backgroundColor: "#1C1C1E",
    borderRadius: 9,
    paddingVertical: 5,
    paddingHorizontal: 5,
    width: 50,
    textAlign: "center",
    alignSelf: "center",
    color: "white",
  },
  spacingInput: {
    marginTop: 7,
  },
});
