import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableHighlight,
} from "react-native";

interface Data {
  bodyPart: string;
  equipment: string;
  gifUrl: string;
  id: string;
  name: string;
  target: string;
}

interface ExerciseData {
  bodyPart: string;
  equipment: string;
  gifUrl: string;
  id: string;
  name: string;
  target: string;
}

interface ExerciseProps {
  data: Data;
  key: number;
  exercisesInfo: boolean;
  setExercisesInfo: (exercisesInfo: boolean) => void;
  infoExerciseData: ExerciseData;
  setInfoExerciseData: (infoExerciseData: ExerciseData) => void;
  ExerciseForm: boolean;
  setExerciseForm: (ExerciseForm: boolean) => void;
  exercises: string[];
  setExercises: (exercises: string[]) => void;
}

export const Exercise: React.FC<ExerciseProps> = ({
  data,
  exercisesInfo,
  setExercisesInfo,
  infoExerciseData,
  setInfoExerciseData,
  ExerciseForm,
  setExerciseForm,
  exercises,
  setExercises,
}) => {
  const HandleClickExercise = () => {
    setInfoExerciseData(data);
    setExercisesInfo(true);
  };

  const handlePressExerciseForm = () => {
    setExercises([...exercises, data.name]);
    setExerciseForm(false);
  };

  data.name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
  data.target = data.target.charAt(0).toUpperCase() + data.target.slice(1);

  return (
    <TouchableHighlight
      style={styles.container}
      activeOpacity={1}
      underlayColor="#323135"
      onPress={ExerciseForm ? handlePressExerciseForm : HandleClickExercise}
    >
      <View style={styles.containerInfoExercise}>
        <View>
          <Text style={styles.textTitle}>{data.name}</Text>
        </View>
        <View>
          <Text style={styles.textMuscle}>{data.target}</Text>
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
