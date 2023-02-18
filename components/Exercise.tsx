import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableHighlight,
} from "react-native";

interface Data {
  name: string;
  difficulty: string;
  equipment: string;
  muscle: string;
  instructions: string;
}

interface ExerciseData {
  name: string;
  difficulty: string;
  equipment: string;
  muscle: string;
  instructions: string;
}

interface ExerciseProps {
  data: Data;
  exercisesInfo: boolean;
  setExercisesInfo: (exercisesInfo: boolean) => void;
  infoExerciseData: ExerciseData;
  setInfoExerciseData: (infoExerciseData: ExerciseData) => void;
}

export const Exercise: React.FC<ExerciseProps> = ({
  data,
  exercisesInfo,
  setExercisesInfo,
  infoExerciseData,
  setInfoExerciseData,
}) => {
  const HandleClickExercise = () => {
    setInfoExerciseData(data);
    setExercisesInfo(true);
  };

  return (
    <TouchableHighlight
      style={styles.container}
      activeOpacity={1}
      underlayColor="#323135"
      onPress={HandleClickExercise}
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
