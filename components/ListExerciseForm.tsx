import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  FlatList,
  Vibration,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { SearchInput } from "./SearchInput";
import { Exercise } from "./Exercise";
import { useContext } from "react";
import { ContextApp } from "../Navigation/TabNavigator";
import { AddSeriesReps } from "./AddSeriesReps";
import { ExerciseData } from "./Programs";

interface ListExerciseProps {
  ExerciseForm: boolean;
  setExerciseForm: (ExerciseForm: boolean) => void;
  exercises: ExerciseData[];
  setExercises: (exercises: ExerciseData[]) => void;
  exerciseName: string;
  setExerciseName: (exerciseName: string) => void;
  exerciseTarget: string;
  setExerciseTarget: (exerciseTarget: string) => void;
}

export const ListExerciseForm: React.FC<ListExerciseProps> = ({
  ExerciseForm,
  setExerciseForm,
  exercises,
  setExercises,
  setExerciseName,
  exerciseName,
  setExerciseTarget,
  exerciseTarget,
}) => {
  const { filteredExercises, setFilteredExercises, dataApi } =
    useContext(ContextApp);
  const [seriesRepsModal, setSeriesRepsModal] = useState<boolean>(false);

  const handleSaveExercise = (series: string, reps: string) => {
    if (series === "" || reps === "") {
      Vibration.vibrate([0, 50, 0, 0]);
    } else {
      let ObjectExercise = {
        nameExercise: exerciseName,
        series: series,
        reps: reps,
        target: exerciseTarget,
      };

      setExercises([...exercises, ObjectExercise]);
      setSeriesRepsModal(false);
    }
  };

  const handleCloseExerciseForm = () => {
    setExerciseForm(false);
    setFilteredExercises(dataApi);
  };

  const handleNewExerciseForm = () => {};

  return (
    <View>
      <Modal visible={ExerciseForm} transparent={true} animationType="slide">
        <View style={styles.container}>
          <View style={styles.modalContainer}>
            <View style={styles.main}>
              <View>
                <View style={styles.containerButton}>
                  <AntDesign
                    style={styles.flex}
                    name="close"
                    size={22}
                    color="#3B82F7"
                    onPress={handleCloseExerciseForm}
                  />
                  <Text style={styles.fontTitle}>Seleziona esercizio</Text>
                  <AntDesign
                    style={[styles.flex, styles.iconPlus]}
                    name="plus"
                    size={22}
                    color="#3B82F7"
                    onPress={handleNewExerciseForm}
                  />
                </View>
                <SearchInput />
              </View>
              <FlatList
                data={filteredExercises}
                style={styles.exercisePlan}
                renderItem={({ item }) => (
                  <Exercise
                    data={item}
                    key={item.id}
                    ExerciseForm={ExerciseForm}
                    setExerciseForm={setExerciseForm}
                    setExercises={setExercises}
                    exercises={exercises}
                    setExerciseName={setExerciseName}
                    setSeriesRepsModal={setSeriesRepsModal}
                    setExerciseTarget={setExerciseTarget}
                  />
                )}
              />
            </View>
          </View>
        </View>
      </Modal>
      <AddSeriesReps
        setSeriesRepsModal={setSeriesRepsModal}
        seriesRepsModal={seriesRepsModal}
        exerciseName={exerciseName}
        handleSaveExercise={handleSaveExercise}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#1C1C1E",
    width: "90%",
    height: "80%",
    borderRadius: 10,
  },
  main: {
    padding: 16,
    flex: 1,
  },
  containerButton: {
    marginBottom: 15,
    flexDirection: "row",
  },
  flex: {
    flex: 1,
  },
  fontTitle: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    flex: 2,
  },
  iconPlus: {
    textAlign: "right",
  },
  exercisePlan: {
    marginTop: 10,
  },
});
