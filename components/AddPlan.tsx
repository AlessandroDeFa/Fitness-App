import React, { useState, useEffect } from "react";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AddedExercise } from "./AddedExercise";
import { globalStyles } from "../components/GlobalStyles";
import { AntDesign } from "@expo/vector-icons";
import { ListExerciseForm } from "./ListExerciseForm";
import { ExerciseData } from "./Programs";
import { UpdateExercise } from "./UpdateExercise";

interface AddPlanProps {
  modalOpen: boolean;
  setModalOpen: (modalOpen: boolean) => void;
  fecthPlansData: () => void;
}

export const AddPlan: React.FC<AddPlanProps> = ({
  modalOpen,
  setModalOpen,
  fecthPlansData,
}) => {
  const [buttonScale] = useState(new Animated.Value(1));
  const [namePlan, setNamePlan] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [exercises, setExercises] = useState<ExerciseData[]>([]);
  const [exerciseName, setExerciseName] = useState<string>("");
  const [exerciseTarget, setExerciseTarget] = useState<string>("");
  const [exerciseNote, setExerciseNote] = useState<string>("");
  const [ExerciseForm, setExerciseForm] = useState<boolean>(false);

  //Update exercise values
  const [exerciseToUpdate, setExerciseToUpdate] = useState<ExerciseData>();
  const [updateExerciseModal, setUpdateExerciseModal] =
    useState<boolean>(false);

  const handleClosemodal = () => {
    setNamePlan("");
    setNote("");
    setExercises([]);
    setModalOpen(false);
  };

  const handleSubmit = async () => {
    if (namePlan === "") {
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
        let formData: any = await AsyncStorage.getItem("plansData");
        formData = formData ? JSON.parse(formData) : [];
        const uniqueId = uuidv4();

        const planData = {
          id: uniqueId,
          name: namePlan,
          note: note,
          type: "Personal Plan",
          exercises: exercises,
        };

        formData.push(planData);

        await AsyncStorage.setItem("plansData", JSON.stringify(formData));
        fecthPlansData();
        handleClosemodal();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Modal visible={modalOpen} animationType="slide">
        <SafeAreaView style={globalStyles.container}>
          <View style={globalStyles.main}>
            <View style={styles.containerHeader}>
              <View style={styles.flex}>
                <AntDesign
                  name="close"
                  size={22}
                  color="#3B82F7"
                  onPress={handleClosemodal}
                  style={styles.closeBtn}
                />
              </View>
              <View style={styles.flex}>
                <Text style={styles.fontTextHeader}>Nuova scheda</Text>
              </View>
              <View style={[styles.flex, styles.containerButton]}>
                <Animated.View
                  style={{ transform: [{ translateX: buttonScale }] }}
                >
                  <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.8}
                    onPress={handleSubmit}
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
                  onChangeText={(value) => setNamePlan(value)}
                />
                <TextInput
                  style={styles.inputNote}
                  multiline={true}
                  placeholder="Note"
                  placeholderTextColor="#606669"
                  maxLength={100}
                  onChangeText={(value) => setNote(value)}
                />
                <TouchableOpacity
                  style={styles.button}
                  activeOpacity={0.8}
                  onPress={() => setExerciseForm(true)}
                >
                  <Text style={styles.textButton}>Aggiungi esercizi</Text>
                </TouchableOpacity>
              </View>
              {exercises.map((item) => (
                <AddedExercise
                  data={item}
                  key={item.id}
                  setExercises={setExercises}
                  exercises={exercises}
                  setUpdateExerciseModal={setUpdateExerciseModal}
                  setExerciseToUpdate={setExerciseToUpdate}
                />
              ))}
              <ListExerciseForm
                ExerciseForm={ExerciseForm}
                setExerciseForm={setExerciseForm}
                setExercises={setExercises}
                exercises={exercises}
                setExerciseName={setExerciseName}
                exerciseName={exerciseName}
                setExerciseTarget={setExerciseTarget}
                exerciseTarget={exerciseTarget}
                setExerciseNote={setExerciseNote}
                exerciseNote={exerciseNote}
              />
            </ScrollView>
          </View>
        </SafeAreaView>
        <UpdateExercise
          setUpdateExerciseModal={setUpdateExerciseModal}
          updateExerciseModal={updateExerciseModal}
          exerciseToUpdate={exerciseToUpdate}
          setExercises={setExercises}
          exercises={exercises}
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
