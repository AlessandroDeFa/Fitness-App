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
import { ListExerciseUpdateForm } from "./ListExerciseUpdateForm";
import { UpdateExercise } from "./UpdateExercise";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface UpdatePlanProps {
  updatePlanModal: boolean;
  setUpdatePlanModal: (updatePlanModal: boolean) => void;
  infoPlan: ExampleData;
  fecthPlansData: () => void;
}

export const UpdatePlan: React.FC<UpdatePlanProps> = ({
  updatePlanModal,
  setUpdatePlanModal,
  infoPlan,
  fecthPlansData,
}) => {
  const [buttonScale] = useState(new Animated.Value(1));
  const [newName, setNewName] = useState<string>("");
  const [newNote, setNewNote] = useState<string>("");
  const [newExercises, setNewExercises] = useState<ExerciseData[]>([]);
  const [newExerciseName, setNewExerciseName] = useState<string>("");
  const [newExerciseNote, setNewExerciseNote] = useState<string>("");
  const [newExerciseTarget, setNewExerciseTarget] = useState<string>("");
  const [updateExercisesForm, setUpdateExercisesForm] =
    useState<boolean>(false);

  //Update exercise values
  const [exerciseToUpdateModalUpdate, setExerciseToUpdateModalUpdate] =
    useState<ExerciseData>();
  const [updateExerciseModalUpdate, setUpdateExerciseModalUpdate] =
    useState<boolean>(false);

  useEffect(() => {
    setNewName(infoPlan.name);
    setNewNote(infoPlan.note);
    setNewExercises([...infoPlan.exercises]);
  }, [infoPlan.name, infoPlan.note, infoPlan.exercises]);

  const handleCloseModal = () => {
    setUpdatePlanModal(false);
    setNewExercises([...infoPlan.exercises]);
  };

  const handleUpdatePlan = async () => {
    if (newName === "") {
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
        const plansDataString = await AsyncStorage.getItem("plansData");
        const plansData = JSON.parse(plansDataString);

        const planToUpdate = plansData.find(
          (plan: ExampleData) => plan.id === infoPlan.id
        );
        if (planToUpdate) {
          planToUpdate.name = newName;
          planToUpdate.note = newNote;
          planToUpdate.exercises = newExercises;

          await AsyncStorage.setItem("plansData", JSON.stringify(plansData));
          fecthPlansData();
          setUpdatePlanModal(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

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
                  onPress={handleCloseModal}
                />
              </View>
              <View style={styles.flex}>
                <Text style={styles.fontTextHeader}>Modifica scheda</Text>
              </View>
              <View style={[styles.flex, styles.containerButton]}>
                <Animated.View
                  style={{ transform: [{ translateX: buttonScale }] }}
                >
                  <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.8}
                    onPress={handleUpdatePlan}
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
                  defaultValue={infoPlan.name}
                  onChangeText={(value) => setNewName(value)}
                />
                <TextInput
                  style={styles.inputNote}
                  multiline={true}
                  placeholder="Note"
                  placeholderTextColor="#606669"
                  maxLength={100}
                  defaultValue={infoPlan.note}
                  onChangeText={(value) => setNewNote(value)}
                />
                <TouchableOpacity
                  style={styles.button}
                  activeOpacity={0.8}
                  onPress={() => setUpdateExercisesForm(true)}
                >
                  <Text style={styles.textButton}>Aggiungi esercizi</Text>
                </TouchableOpacity>
              </View>
              {newExercises.map((item) => (
                <AddedExercise
                  data={item}
                  key={item.id}
                  updatePlanModal={updatePlanModal}
                  setNewExercises={setNewExercises}
                  newExercises={newExercises}
                  setUpdateExerciseModalUpdate={setUpdateExerciseModalUpdate}
                  setExerciseToUpdateModalUpdate={
                    setExerciseToUpdateModalUpdate
                  }
                />
              ))}
              <ListExerciseUpdateForm
                updatePlanModal={updatePlanModal}
                updateExercisesForm={updateExercisesForm}
                setUpdateExercisesForm={setUpdateExercisesForm}
                setNewExercises={setNewExercises}
                newExercises={newExercises}
                setNewExerciseName={setNewExerciseName}
                newExerciseName={newExerciseName}
                setNewExerciseTarget={setNewExerciseTarget}
                newExerciseTarget={newExerciseTarget}
                setNewExerciseNote={setNewExerciseNote}
                newExerciseNote={newExerciseNote}
              />
            </ScrollView>
          </View>
        </SafeAreaView>
        <UpdateExercise
          infoPlan={infoPlan}
          updatePlanModal={updatePlanModal}
          setUpdateExerciseModalUpdate={setUpdateExerciseModalUpdate}
          updateExerciseModalUpdate={updateExerciseModalUpdate}
          exerciseToUpdateModalUpdate={exerciseToUpdateModalUpdate}
          fecthPlansData={fecthPlansData}
          setNewExercises={setNewExercises}
          newExercises={newExercises}
        />
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
