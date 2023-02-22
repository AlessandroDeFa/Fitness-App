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
import { ExerciseData } from "./Programs";

interface AddedExerciseProps {
  data: ExerciseData;
}

export const AddedExercise: React.FC<AddedExerciseProps> = ({ data }) => {
  return (
    <View style={styles.containerExercise}>
      <View>
        <Text style={styles.fontTitle}>{data.nameExercise}</Text>
        <View style={styles.containerOptions}>
          <View style={styles.option}>
            <View>
              <Text style={styles.textOptions}>N. serie</Text>
            </View>
            <View style={styles.spacingInput}>
              <View style={styles.containerSeriesReps}>
                <View style={styles.borderRadius}>
                  <Text style={styles.fontSeriesReps}>{data.series}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.option}>
            <View>
              <Text style={styles.textOptions}>Ripetizioni</Text>
            </View>
            <View style={styles.spacingInput}>
              <View style={styles.containerSeriesReps}>
                <View style={styles.borderRadius}>
                  <Text style={styles.fontSeriesReps}>{data.reps}</Text>
                </View>
              </View>
            </View>
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
    justifyContent: "center",
  },
  option: {
    flex: 0.25,
  },
  textOptions: {
    color: "white",
    fontWeight: "500",
    textAlign: "center",
    fontSize: 15,
  },
  spacingInput: {
    marginTop: 7,
  },
  fontSeriesReps: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
  },
  borderRadius: {
    backgroundColor: "#1C1C1E",
    paddingVertical: Platform.OS === "ios" ? 8 : 5,
    paddingHorizontal: 5,
    width: 50,
    borderRadius: 9,
  },
  containerSeriesReps: {
    alignItems: "center",
    justifyContent: "center",
  },
});
