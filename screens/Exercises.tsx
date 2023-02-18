import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  ScrollView,
} from "react-native";
import { globalStyles } from "../components/GlobalStyles";
import { Ionicons } from "@expo/vector-icons";
import { Exercise } from "../components/Exercise";
import { InfoExercise } from "../components/InfoExercise";

export const Exercises = () => {
  const [data, setData] = useState([]);
  const [exercisesInfo, setExercisesInfo] = useState<boolean>(false);

  useEffect(() => {
    const fechData = async () => {
      fetch("https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key":
            "725db0c7a7msh6847c4a29f115cfp1cd79djsn0205ddb957c3",
          "X-RapidAPI-Host": "exercises-by-api-ninjas.p.rapidapi.com",
        },
      })
        .then((response) => response.json())
        .then((data) => setData(data))
        .catch((error) => console.error(error));
    };

    fechData();
  }, []);

  return (
    <View style={globalStyles.container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={globalStyles.main}>
          <View style={styles.header}>
            <View style={styles.spacingTitle}>
              <Text style={styles.textTitle}>Esercizi</Text>
            </View>
            <View style={styles.containerInput}>
              <Ionicons name="search" size={16} color="#606669" />
              <TextInput
                placeholder="Ricerca"
                placeholderTextColor="#606669"
                style={styles.input}
              />
            </View>
          </View>
          <View style={styles.containerExercises}>
            <FlatList
              data={data}
              renderItem={({ item }) => (
                <Exercise
                  data={item}
                  setExercisesInfo={setExercisesInfo}
                  exercisesInfo={exercisesInfo}
                />
              )}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
      <InfoExercise
        exercisesInfo={exercisesInfo}
        setExercisesInfo={setExercisesInfo}
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
