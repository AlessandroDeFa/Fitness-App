import React from "react";
import { StyleSheet, View, Text, TouchableHighlight } from "react-native";
import { ExampleData } from "./Programs";

interface planProps {
  infoPlanModal: boolean;
  setInfoPlanModal: (infoPlanModal: boolean) => void;
  infoPlan: ExampleData;
  setInfoPlan: (infoPlan: ExampleData) => void;
  data: ExampleData;
}

export const Plan: React.FC<planProps> = ({
  infoPlanModal,
  setInfoPlanModal,
  setInfoPlan,
  infoPlan,
  data,
}) => {
  const handleClickPlan = () => {
    setInfoPlanModal(true);
    setInfoPlan(data);
  };

  const exerciseNames = data.exercises.map((exercise) => exercise.nameExercise);
  const exerciseNamesString = exerciseNames.join(", ");

  return (
    <TouchableHighlight
      style={styles.container}
      activeOpacity={1}
      underlayColor="#323135"
      onPress={handleClickPlan}
    >
      <View style={styles.containerPlan}>
        <Text
          ellipsizeMode="tail"
          numberOfLines={2}
          style={data.name.length < 15 ? styles.text : styles.namePlanLong}
        >
          {data.name}
        </Text>

        <View style={styles.containerExercises}>
          {data.exercises.length > 0 ? (
            <Text
              ellipsizeMode="tail"
              numberOfLines={3}
              style={styles.textExercise}
            >
              {exerciseNamesString}
            </Text>
          ) : (
            <Text style={styles.textExercise}>Nessun esercizio</Text>
          )}
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1 / 2,
    marginTop: 15,
    marginRight: 10,
    height: 115,
    borderRadius: 9,
    borderColor: "#38383A",
    borderWidth: 1,
  },
  containerPlan: {
    flex: 1,
    padding: 10,
    position: "relative",
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  namePlanLong: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },
  containerExercises: {
    marginTop: 10,
    flex: 1,
  },
  textExercise: {
    color: "#CACCCD",
    fontWeight: "500",
  },
});
