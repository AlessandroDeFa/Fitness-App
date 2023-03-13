import React, { useState } from "react";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
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
import { InfoExercise } from "./InfoExercise";
import { useContext } from "react";
import { ContextApp } from "../Navigation/TabNavigator";
import { AddSeriesReps } from "./AddSeriesReps";
import { ExerciseData } from "./Programs";
import { AddNewExercise } from "./AddNewExercise";

interface ListExerciseProps {
  ExerciseForm: boolean;
  setExerciseForm: (ExerciseForm: boolean) => void;
  exercises: ExerciseData[];
  setExercises: (exercises: ExerciseData[]) => void;
  exerciseName: string;
  setExerciseName: (exerciseName: string) => void;
  exerciseTarget: string;
  setExerciseTarget: (exerciseTarget: string) => void;
  exerciseNote: string;
  setExerciseNote: (exerciseNote: string) => void;
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
  setExerciseNote,
  exerciseNote,
}) => {
  const { filteredExercises } = useContext(ContextApp);
  const [seriesRepsModal, setSeriesRepsModal] = useState<boolean>(false);
  const [newExerciseModal, setNewExerciseModal] = useState<boolean>(false);
  const [series, setSeries] = useState<string>("");
  const [reps, setReps] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const uniqueId = uuidv4();
  let day: number | string;
  let month: number | string;
  let formattedDate: string;

  const handleSaveExercise = () => {
    if (series === "" || reps === "") {
      Vibration.vibrate([0, 50, 0, 0]);
    } else {
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

      let ObjectExercise = {
        id: uniqueId,
        nameExercise: exerciseName,
        series: series,
        reps: reps,
        weight: weight,
        target: exerciseTarget,
        note: exerciseNote,
        dataChart: [{ kg: parseInt(weight), date: formattedDate }],
      };

      setExercises([...exercises, ObjectExercise]);
      setSeriesRepsModal(false);
    }
  };

  const handleSaveNewExercise = () => {
    if (
      exerciseName === "" ||
      exerciseTarget === "" ||
      series === "" ||
      reps === ""
    ) {
      Vibration.vibrate([0, 50, 0, 0]);
    } else {
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

      let ObjectNewExercise = {
        id: uniqueId,
        nameExercise: exerciseName,
        series: series,
        reps: reps,
        weight: weight,
        target: exerciseTarget,
        note: exerciseNote,
        dataChart: [{ kg: parseInt(weight), date: formattedDate }],
      };

      setExercises([...exercises, ObjectNewExercise]);
      setNewExerciseModal(false);
      setExerciseName("");
      setExerciseTarget("");
      setExerciseNote("");
      setSeries("");
      setReps("");
      setWeight("");
    }
  };

  const handleCloseExerciseForm = () => {
    setExerciseForm(false);
  };

  const handleNewExerciseForm = () => {
    setExerciseForm(false);
    setNewExerciseModal(true);
  };

  return (
    <View>
      <Modal visible={ExerciseForm} transparent={true} animationType="slide">
        <View style={styles.container}>
          <View style={styles.modalContainer}>
            <View style={styles.main}>
              <View>
                <View style={styles.containerButton}>
                  <View style={styles.flex}>
                    <AntDesign
                      style={styles.closeBtn}
                      name="close"
                      size={22}
                      color="#3B82F7"
                      onPress={handleCloseExerciseForm}
                    />
                  </View>
                  <Text style={styles.fontTitle}>Seleziona esercizio</Text>
                  <View style={styles.flex}>
                    <AntDesign
                      style={styles.iconPlus}
                      name="plus"
                      size={22}
                      color="#3B82F7"
                      onPress={handleNewExerciseForm}
                    />
                  </View>
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
        exerciseTarget={exerciseTarget}
        handleSaveExercise={handleSaveExercise}
        setExerciseNote={setExerciseNote}
        setReps={setReps}
        setSeries={setSeries}
        setWeight={setWeight}
      />
      <AddNewExercise
        newExerciseModal={newExerciseModal}
        setNewExerciseModal={setNewExerciseModal}
        handleSaveNewExercise={handleSaveNewExercise}
        setExerciseName={setExerciseName}
        setExerciseTarget={setExerciseTarget}
        setExerciseNote={setExerciseNote}
        setReps={setReps}
        setSeries={setSeries}
        setWeight={setWeight}
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
  closeBtn: {
    alignSelf: "flex-start",
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
    alignSelf: "flex-end",
  },
  exercisePlan: {
    marginTop: 10,
  },
});
