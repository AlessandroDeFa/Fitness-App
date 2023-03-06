import React from "react";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

interface Data {
  bodyPart: string;
  equipment: string;
  gifUrl: string;
  id: string;
  name: string;
  target: string;
}

interface ExerciseInfoData {
  bodyPart: string;
  equipment: string;
  gifUrl: string;
  id: string;
  name: string;
  target: string;
}

interface ExerciseProps {
  data: Data;
  exercisesInfo: boolean;
  setExercisesInfo: (exercisesInfo: boolean) => void;
  infoExerciseData: ExerciseInfoData;
  setInfoExerciseData: (infoExerciseData: ExerciseInfoData) => void;
  ExerciseForm: boolean;
  setExerciseForm: (ExerciseForm: boolean) => void;
  setSeriesRepsModal: (seriesRepsModal: boolean) => void;
  setExerciseName: (value: string) => void;
  setExerciseTarget: (value: string) => void;
  updatePlanModal: boolean;
  setNewExerciseName: (value: string) => void;
  setNewExerciseTarget: (value: string) => void;
  setUpdateExercisesForm: (value: boolean) => void;
}

export const Exercise: React.FC<ExerciseProps> = ({
  data,
  setExercisesInfo,
  setInfoExerciseData,
  ExerciseForm,
  setExerciseForm,
  setSeriesRepsModal,
  setExerciseName,
  setExerciseTarget,
  updatePlanModal,
  setNewExerciseName,
  setNewExerciseTarget,
  setUpdateExercisesForm,
}) => {
  const HandleClickExercise = () => {
    setInfoExerciseData(data);
    setExercisesInfo(true);
  };

  const handlePressExerciseForm = () => {
    setExerciseName(data.name);
    setExerciseTarget(data.target);
    setSeriesRepsModal(true);
    setExerciseForm(false);
  };

  const handlePressUpadateExerciseForm = () => {
    setNewExerciseName(data.name);
    setNewExerciseTarget(data.target);
    setSeriesRepsModal(true);
    setUpdateExercisesForm(false);
  };

  data.name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
  data.target = data.target.charAt(0).toUpperCase() + data.target.slice(1);

  return (
    <TouchableHighlight
      style={styles.container}
      activeOpacity={1}
      underlayColor="#323135"
      onPress={
        updatePlanModal
          ? handlePressUpadateExerciseForm
          : ExerciseForm
          ? handlePressExerciseForm
          : HandleClickExercise
      }
    >
      <View style={styles.containerInfoExercise}>
        <View style={styles.flex}>
          <View>
            <Text style={styles.textTitle}>{data.name}</Text>
          </View>
          <View>
            <Text style={styles.textMuscle}>{data.target}</Text>
          </View>
        </View>
        <MaterialIcons name="keyboard-arrow-right" size={24} color="#38383A" />
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  flex: {
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
