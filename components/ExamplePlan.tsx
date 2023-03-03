import React from "react";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import { ExampleData } from "./Programs";

interface examplePlanProps {
  data: ExampleData;
  infoPlanModal: boolean;
  setInfoPlanModal: (infoPlanModal: boolean) => void;
  infoPlan: ExampleData;
  setInfoPlan: (infoPlan: ExampleData) => void;
}

export const ExamplePlan: React.FC<examplePlanProps> = ({
  infoPlanModal,
  setInfoPlanModal,
  infoPlan,
  setInfoPlan,
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
        <View>
          <Text ellipsizeMode="tail" numberOfLines={2} style={styles.text}>
            {data.name}
          </Text>
        </View>

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
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
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
