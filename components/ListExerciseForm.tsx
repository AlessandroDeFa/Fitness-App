import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { SearchInput } from "./SearchInput";
import { Exercise } from "./Exercise";
import { useContext } from "react";
import { ContextApp } from "../Navigation/TabNavigator";

interface ListExerciseProps {
  ExerciseForm: boolean;
  setExerciseForm: (ExerciseForm: boolean) => void;
  exercises: string[];
  setExercises: (exercises: string[]) => void;
}

export const ListExerciseForm: React.FC<ListExerciseProps> = ({
  ExerciseForm,
  setExerciseForm,
  exercises,
  setExercises,
}) => {
  const { filteredExercises } = useContext(ContextApp);

  return (
    <View>
      <Modal visible={ExerciseForm} transparent={true} animationType="slide">
        <View style={styles.container}>
          <View style={styles.modalContainer}>
            <View style={styles.main}>
              <View>
                <View style={styles.containerButton}>
                  <AntDesign
                    name="close"
                    size={22}
                    color="#3B82F7"
                    onPress={() => setExerciseForm(false)}
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
                  />
                )}
              />
            </View>
          </View>
        </View>
      </Modal>
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
    marginBottom: 10,
  },
  exercisePlan: {
    marginTop: 10,
  },
});
