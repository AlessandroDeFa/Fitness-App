import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableHighlight,
} from "react-native";

interface ExerciseProps {
  exercisesInfo: boolean;
  setExercisesInfo: (exercisesInfo: boolean) => void;
}

export const Exercise: React.FC<ExerciseProps> = ({
  data,
  exercisesInfo,
  setExercisesInfo,
}) => {
  return (
    <TouchableHighlight
      style={styles.container}
      activeOpacity={1}
      underlayColor="#323135"
      onPress={() => {
        setExercisesInfo(true);
      }}
    >
      <View style={styles.containerInfoExercise}>
        <View>
          <Text style={styles.textTitle}>{data.name}</Text>
        </View>
        <View>
          <Text style={styles.textMuscle}>{data.muscle}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderColor: "#38383A",
    flexDirection: "row",
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
