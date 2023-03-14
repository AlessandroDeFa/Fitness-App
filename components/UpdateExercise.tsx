import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Animated,
  Vibration,
  Platform,
} from "react-native";
import { ExampleData } from "./Programs";
import { globalStyles } from "../components/GlobalStyles";
import { MaterialIcons } from "@expo/vector-icons";
import { ExerciseData } from "./Programs";

interface UpdateExerciseProps {
  updateExerciseModal: boolean;
  setUpdateExerciseModal: (updateExerciseModal: boolean) => void;
  updateExerciseModalUpdate: boolean;
  setUpdateExerciseModalUpdate: (updateExerciseModal: boolean) => void;
  updatePlanModal: boolean;
  exerciseToUpdate: ExerciseData;
  exercises: ExerciseData[];
  setExercises: (exercises: ExerciseData[]) => void;
  exerciseToUpdateModalUpdate: ExerciseData;
  infoPlan: ExampleData;
  fecthPlansData: () => void;
  newExercises: ExerciseData[];
  setNewExercises: (newExercises: ExerciseData[]) => void;
}

export const UpdateExercise: React.FC<UpdateExerciseProps> = ({
  updateExerciseModal,
  setUpdateExerciseModal,
  updatePlanModal,
  updateExerciseModalUpdate,
  setUpdateExerciseModalUpdate,
  exerciseToUpdateModalUpdate,
  exerciseToUpdate,
  setExercises,
  exercises,
  infoPlan,
  fecthPlansData,
  newExercises,
  setNewExercises,
}) => {
  useEffect(() => {
    setUpdateNameExercise(
      exerciseToUpdate?.nameExercise ||
        exerciseToUpdateModalUpdate?.nameExercise
    );
    setUpdateTargetExercise(
      exerciseToUpdate?.target || exerciseToUpdateModalUpdate?.target
    );
    setUpdateNoteExercise(
      exerciseToUpdate?.note || exerciseToUpdateModalUpdate?.note
    );
    setUpdateSeriesExercise(
      exerciseToUpdate?.series || exerciseToUpdateModalUpdate?.series
    );
    setUpdateRepsExercise(
      exerciseToUpdate?.reps || exerciseToUpdateModalUpdate?.reps
    );
    setUpdateWeightExercise(
      exerciseToUpdate?.weight || exerciseToUpdateModalUpdate?.weight || ""
    );
  }, [
    exerciseToUpdate?.nameExercise,
    exerciseToUpdate?.target,
    exerciseToUpdate?.note,
    exerciseToUpdate?.series,
    exerciseToUpdate?.reps,
    exerciseToUpdate?.weight,
    exerciseToUpdateModalUpdate?.nameExercise,
    exerciseToUpdateModalUpdate?.target,
    exerciseToUpdateModalUpdate?.note,
    exerciseToUpdateModalUpdate?.series,
    exerciseToUpdateModalUpdate?.reps,
    exerciseToUpdateModalUpdate?.weight,
  ]);

  const [buttonScale] = useState(new Animated.Value(1));
  const [updateNameExercise, setUpdateNameExercise] = useState<string>("");
  const [updateTargetExercise, setUpdateTargetExercise] = useState<string>("");
  const [updateNoteExercise, setUpdateNoteExercise] = useState<string>("");
  const [updateSeriesExercise, setUpdateSeriesExercise] = useState<string>("");
  const [updateRepsExercise, setUpdateRepsExercise] = useState<string>("");
  const [updateWeightExercise, setUpdateWeightExercise] = useState<string>("");
  let day: number | string;
  let month: number | string;
  let formattedDate: string;

  const handleSubmitUpdateExercise = (id: string) => {
    const updatedWeight = updateWeightExercise.replace(/,/g, ".");

    if (
      updateNameExercise.trim() === "" ||
      updateTargetExercise.trim() === "" ||
      updateSeriesExercise.trim() === "" ||
      updateRepsExercise.trim() === "" ||
      isNaN(+updateSeriesExercise) ||
      isNaN(+updateRepsExercise) ||
      (updatedWeight.trim() !== "" && isNaN(+updatedWeight))
    ) {
      Vibration.vibrate([0, 50, 0, 0]);
      Animated.sequence([
        Animated.timing(buttonScale, {
          toValue: 5,
          duration: 75,
          useNativeDriver: true,
        }),
        Animated.timing(buttonScale, {
          toValue: -5,
          duration: 75,
          useNativeDriver: true,
        }),
        Animated.timing(buttonScale, {
          toValue: 0,
          duration: 75,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      try {
        const exerciseToChange = exercises.find(
          (exercise) => exercise.id === id
        );
        //get Date for dataChart
        const date = new Date();
        day = date.getDate();
        month = date.getMonth() + 1;

        if (day < 10) {
          day = "0" + day;
        }
        if (month < 10) {
          month = "0" + month;
        }
        formattedDate = `${day}-${month}`;

        let dataChart = {
          kg: parseFloat(updatedWeight),
          date: formattedDate,
        };

        if (exerciseToChange) {
          exerciseToChange.nameExercise = updateNameExercise;
          exerciseToChange.target = updateTargetExercise;
          exerciseToChange.note = updateNoteExercise;
          exerciseToChange.series = updateSeriesExercise;
          exerciseToChange.reps = updateRepsExercise;
          exerciseToChange.weight = updatedWeight;
          exerciseToChange.weight !== "" &&
            exerciseToChange.dataChart.push(dataChart);
        }

        setUpdateExerciseModal(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleSubmitUpdateExerciseModalUpdate = async (id: string) => {
    const updatedWeight = updateWeightExercise.replace(/,/g, ".");

    if (
      updateNameExercise.trim() === "" ||
      updateTargetExercise.trim() === "" ||
      updateSeriesExercise.trim() === "" ||
      updateRepsExercise.trim() === "" ||
      isNaN(+updateSeriesExercise) ||
      isNaN(+updateRepsExercise) ||
      (updatedWeight.trim() !== "" && isNaN(+updatedWeight))
    ) {
      Vibration.vibrate([0, 50, 0, 0]);
      Animated.sequence([
        Animated.timing(buttonScale, {
          toValue: 5,
          duration: 75,
          useNativeDriver: true,
        }),
        Animated.timing(buttonScale, {
          toValue: -5,
          duration: 75,
          useNativeDriver: true,
        }),
        Animated.timing(buttonScale, {
          toValue: 0,
          duration: 75,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      try {
        const exerciseToChange = newExercises.find(
          (exercise) => exercise.id === id
        );
        //get Date for dataChart
        const date = new Date();
        day = date.getDate();
        month = date.getMonth() + 1;

        if (day < 10) {
          day = "0" + day;
        }
        if (month < 10) {
          month = "0" + month;
        }
        formattedDate = `${day}-${month}`;

        let dataChart = {
          kg: parseFloat(updatedWeight),
          date: formattedDate,
        };
        if (exerciseToChange) {
          exerciseToChange.nameExercise = updateNameExercise;
          exerciseToChange.target = updateTargetExercise;
          exerciseToChange.note = updateNoteExercise;
          exerciseToChange.series = updateSeriesExercise;
          exerciseToChange.reps = updateRepsExercise;
          exerciseToChange.weight = updatedWeight;
          exerciseToChange.weight !== "" &&
            exerciseToChange.dataChart.push(dataChart);
        }

        fecthPlansData();
        setUpdateExerciseModalUpdate(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <View>
      <Modal
        visible={
          updatePlanModal ? updateExerciseModalUpdate : updateExerciseModal
        }
        animationType="slide"
      >
        <SafeAreaView style={globalStyles.container}>
          <View style={globalStyles.main}>
            <View style={styles.containerHeader}>
              <TouchableOpacity
                style={[styles.flex, styles.closeModal]}
                activeOpacity={0.8}
                onPress={
                  updatePlanModal
                    ? () => setUpdateExerciseModalUpdate(false)
                    : () => setUpdateExerciseModal(false)
                }
              >
                <MaterialIcons
                  name="keyboard-arrow-down"
                  size={24}
                  color="#3B82F7"
                />
                <Text style={styles.fontCloseModal}>Annulla</Text>
              </TouchableOpacity>
              <View style={styles.flex2}>
                <Text style={styles.fontTextHeader}>Modifica esercizio</Text>
              </View>
              <View style={[styles.flex, styles.containerButton]}>
                <Animated.View
                  style={{ transform: [{ translateX: buttonScale }] }}
                >
                  <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.8}
                    onPress={
                      updatePlanModal
                        ? () =>
                            handleSubmitUpdateExerciseModalUpdate(
                              exerciseToUpdateModalUpdate.id
                            )
                        : () => handleSubmitUpdateExercise(exerciseToUpdate.id)
                    }
                  >
                    <Text style={styles.textButton}>Salva</Text>
                  </TouchableOpacity>
                </Animated.View>
              </View>
            </View>
            <View style={styles.containerFirstInputs}>
              <TextInput
                style={styles.updateInputs}
                placeholder="Nome eserizio"
                placeholderTextColor={Platform.OS === "ios" ? "" : "#606669"}
                defaultValue={
                  exerciseToUpdate?.nameExercise ||
                  exerciseToUpdateModalUpdate?.nameExercise
                }
                onChangeText={(value) => setUpdateNameExercise(value)}
              />
              <TextInput
                style={styles.updateInputs}
                placeholder="Target"
                placeholderTextColor={Platform.OS === "ios" ? "" : "#606669"}
                maxLength={25}
                defaultValue={
                  exerciseToUpdate?.target ||
                  exerciseToUpdateModalUpdate?.target
                }
                onChangeText={(value) => setUpdateTargetExercise(value)}
              />
              <TextInput
                style={styles.inputsNote}
                placeholder="Note"
                placeholderTextColor={Platform.OS === "ios" ? "" : "#606669"}
                maxLength={70}
                defaultValue={
                  exerciseToUpdate?.note || exerciseToUpdateModalUpdate?.note
                }
                onChangeText={(value) => setUpdateNoteExercise(value)}
              />
            </View>
            <View style={styles.spacingInputs}>
              <Text style={styles.titleValues}>VALORI</Text>
              <View style={styles.containerSecondInputs}>
                <TextInput
                  style={styles.updateInputs}
                  placeholder="Serie"
                  keyboardType="numeric"
                  placeholderTextColor={Platform.OS === "ios" ? "" : "#606669"}
                  maxLength={2}
                  defaultValue={
                    exerciseToUpdate?.series ||
                    exerciseToUpdateModalUpdate?.series
                  }
                  onChangeText={(value) => setUpdateSeriesExercise(value)}
                />
                <TextInput
                  style={styles.updateInputs}
                  placeholder="Ripetizioni"
                  keyboardType="numeric"
                  placeholderTextColor={Platform.OS === "ios" ? "" : "#606669"}
                  maxLength={2}
                  defaultValue={
                    exerciseToUpdate?.reps || exerciseToUpdateModalUpdate?.reps
                  }
                  onChangeText={(value) => setUpdateRepsExercise(value)}
                />
                <TextInput
                  style={styles.inputsWeight}
                  placeholder="Peso"
                  keyboardType="numeric"
                  placeholderTextColor={Platform.OS === "ios" ? "" : "#606669"}
                  maxLength={4}
                  defaultValue={
                    exerciseToUpdate?.weight ||
                    exerciseToUpdateModalUpdate?.weight
                  }
                  onChangeText={(value) => setUpdateWeightExercise(value)}
                />
              </View>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  containerHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  flex: {
    flex: 1,
  },
  flex2: {
    flex: 2,
  },
  closeModal: {
    flexDirection: "row",
    alignItems: "center",
  },
  fontCloseModal: {
    color: "#3B82F7",
    fontWeight: "500",
  },
  fontTextHeader: {
    color: "white",
    fontWeight: "500",
    textAlign: "center",
  },
  containerButton: {
    alignItems: "flex-end",
  },
  textButton: {
    color: "#3B82F7",
    fontSize: 15,
    fontWeight: "600",
  },
  closeBtn: {
    alignSelf: "flex-start",
  },
  button: {
    backgroundColor: "#1C1C1E",
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 9,
  },
  //First Inputs
  containerFirstInputs: {
    backgroundColor: "#1C1C1E",
    borderRadius: 9,
    paddingHorizontal: 15,
    paddingBottom: 10,
    marginTop: 40,
  },
  containerSecondInputs: {
    backgroundColor: "#1C1C1E",
    borderRadius: 9,
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  spacingInputs: {
    marginTop: 30,
  },
  updateInputs: {
    backgroundColor: "#1C1C1E",
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    fontSize: 16,
    color: "white",
    borderColor: "#38383A",
  },
  inputsNote: {
    backgroundColor: "#1C1C1E",
    paddingTop: 10,
    fontSize: 16,
    color: "white",
  },
  titleValues: {
    color: "#CACCCD",
    fontWeight: "500",
    marginBottom: 10,
    marginLeft: 15,
  },
  inputsWeight: {
    backgroundColor: "#1C1C1E",
    paddingTop: 10,
    fontSize: 16,
    color: "white",
  },
});
