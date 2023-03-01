import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  Vibration,
  Animated,
} from "react-native";
import { ExampleData } from "./Programs";
import { ExerciseData } from "./Programs";
import { AddedExercise } from "./AddedExercise";
import { AntDesign } from "@expo/vector-icons";
import { globalStyles } from "../components/GlobalStyles";

interface UpdatePlanProps {
  updatePlanModal: boolean;
  setUpdatePlanModal: (updatePlanModal: boolean) => void;
  infoPlan: ExampleData;
}

export const UpdatePlan: React.FC<UpdatePlanProps> = ({
  updatePlanModal,
  setUpdatePlanModal,
  infoPlan,
}) => {
  const [newName, setNewName] = useState<string>("");
  const [newNote, setNewNote] = useState<string>("");
  const [newExercises, setNewExercises] = useState<ExerciseData[]>([]);

  useEffect(() => {
    setNewName(infoPlan.name);
    setNewNote(infoPlan.note);
    setNewExercises(infoPlan.exercises);
  }, [infoPlan.name, infoPlan.note, infoPlan.exercises]);

  const handleUpdatePlan = () => {};

  console.log(newName);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Modal visible={updatePlanModal} animationType="slide">
        <SafeAreaView style={globalStyles.container}>
          <View style={globalStyles.main}>
            <View style={styles.containerHeader}>
              <View style={styles.containerCloseBtn}>
                <AntDesign
                  name="close"
                  size={22}
                  color="#3B82F7"
                  onPress={() => setUpdatePlanModal(false)}
                />
              </View>
              <View style={styles.flex}>
                <Text style={styles.fontTextHeader}>Modifica scheda</Text>
              </View>
              <View style={[styles.flex, styles.containerButton]}>
                <Animated.View
                // style={{ transform: [{ translateX: buttonScale }] }}
                >
                  <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.8}
                    // onPress={prova}
                  >
                    <Text style={styles.textButton}>Salva</Text>
                  </TouchableOpacity>
                </Animated.View>
              </View>
            </View>
            <ScrollView>
              <View style={styles.containerInputs}>
                <TextInput
                  style={styles.inputName}
                  multiline={true}
                  placeholder="Nome scheda"
                  placeholderTextColor="#606669"
                  maxLength={30}
                  defaultValue={newName}
                  onChangeText={(value) => setNewName(value)}
                />
                <TextInput
                  style={styles.inputNote}
                  multiline={true}
                  placeholder="Note"
                  placeholderTextColor="#606669"
                  maxLength={100}
                  defaultValue={newNote}
                  onChangeText={(value) => setNewNote(value)}
                />
                <TouchableOpacity
                  style={styles.button}
                  activeOpacity={0.8}
                  // onPress={() => setExerciseForm(true)}
                >
                  <Text style={styles.textButton}>Aggiungi esercizi</Text>
                </TouchableOpacity>
              </View>
              <Text></Text>
              {newExercises.map((item) => (
                <AddedExercise
                  data={item}
                  // setExercises={setExercises}
                  // exercises={exercises}
                />
              ))}
              {/* <ListExerciseForm
              ExerciseForm={ExerciseForm}
              setExerciseForm={setExerciseForm}
              setExercises={setExercises}
              exercises={exercises}
              setExerciseName={setExerciseName}
              exerciseName={exerciseName}
              setExerciseTarget={setExerciseTarget}
              exerciseTarget={exerciseTarget}
            /> */}
            </ScrollView>
          </View>
        </SafeAreaView>
      </Modal>
    </TouchableWithoutFeedback>
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
  containerCloseBtn: {
    flex: 1,
    flexDirection: "row",
  },
  button: {
    backgroundColor: "#1C1C1E",
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 9,
  },
  containerInputs: {
    marginTop: 45,
  },
  inputName: {
    fontSize: 23,
    fontWeight: "500",
    color: "white",
    marginBottom: 10,
  },
  inputNote: {
    color: "white",
    fontSize: 17,
    fontWeight: "400",
    marginBottom: 70,
  },
});
