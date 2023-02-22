import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from "react-native";
import { globalStyles } from "../components/GlobalStyles";
import { Ionicons } from "@expo/vector-icons";
import { Exercise } from "../components/Exercise";
import { SearchInput } from "../components/SearchInput";
import { InfoExercise } from "../components/InfoExercise";
import { useContext } from "react";
import { ContextApp } from "../Navigation/TabNavigator";

export const Exercises = () => {
  const { filteredExercises } = useContext(ContextApp);

  const [exercisesInfo, setExercisesInfo] = useState<boolean>(false);
  const [infoExerciseData, setInfoExerciseData] = useState({
    bodyPart: "",
    equipment: "",
    gifUrl: "",
    id: "",
    name: "",
    target: "",
  });

  return (
    <View style={globalStyles.container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={globalStyles.main}>
          <View style={styles.header}>
            <View style={styles.spacingTitle}>
              <Text style={styles.textTitle}>Esercizi</Text>
            </View>
            <SearchInput />
          </View>
          <View style={styles.containerExercises}>
            <FlatList
              data={filteredExercises}
              renderItem={({ item }) => (
                <Exercise
                  data={item}
                  key={item.id}
                  setExercisesInfo={setExercisesInfo}
                  exercisesInfo={exercisesInfo}
                  setInfoExerciseData={setInfoExerciseData}
                  infoExerciseData={infoExerciseData}
                />
              )}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
      <InfoExercise
        exercisesInfo={exercisesInfo}
        setExercisesInfo={setExercisesInfo}
        infoExerciseData={infoExerciseData}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: Platform.OS === "ios" ? 90 : 60,
    borderBottomWidth: 0.5,
    paddingBottom: 15,
    borderColor: "#38383A",
  },
  textTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  spacingTitle: {
    marginBottom: 15,
  },
  containerInput: {
    flexDirection: "row",
    backgroundColor: "#323135",
    borderRadius: 9,
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: Platform.OS === "ios" ? 10 : 0,
  },
  input: {
    flex: 1,
    marginLeft: 5,
    color: "#fff",
  },
  containerExercises: {
    flex: 1,
  },
});
