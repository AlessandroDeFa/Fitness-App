import React, { createRef } from "react";
import { StyleSheet, View, Text, TouchableHighlight } from "react-native";
import { ExampleData } from "./Programs";
import { Ionicons } from "@expo/vector-icons";

interface planProps {
  infoPlanModal: boolean;
  setInfoPlanModal: (infoPlanModal: boolean) => void;
  infoPlan: ExampleData;
  setInfoPlan: (infoPlan: ExampleData) => void;
  data: ExampleData;
  handleButtonClick: (index: number, data: ExampleData) => void;
  buttonRef: React.MutableRefObject<View[]>;
  selectedButtonIndex: number | null;
  index: number;
  visible: boolean;
}

export const Plan: React.FC<planProps> = ({
  infoPlanModal,
  setInfoPlanModal,
  setInfoPlan,
  infoPlan,
  data,
  handleButtonClick,
  buttonRef,
  index,
  selectedButtonIndex,
  visible,
}) => {
  const handleClickPlan = () => {
    setInfoPlanModal(true);
    setInfoPlan(data);
  };

  const exerciseNames = data.exercises.map((exercise) => exercise.nameExercise);
  const exerciseNamesString = exerciseNames.join(", ");

  return (
    <>
      <TouchableHighlight
        style={styles.container}
        activeOpacity={1}
        underlayColor="#323135"
        onPress={handleClickPlan}
      >
        <View style={styles.containerPlan}>
          <View style={styles.containerTitle}>
            <Text
              ellipsizeMode="tail"
              numberOfLines={2}
              style={data.name.length < 15 ? styles.text : styles.namePlanLong}
            >
              {data.name}
            </Text>
            <View
              collapsable={false}
              ref={(ref) => (buttonRef.current[index] = ref)}
              style={{ paddingLeft: 5 }}
            >
              <Ionicons
                name="ellipsis-horizontal-circle-outline"
                size={24}
                color={
                  selectedButtonIndex === index && visible
                    ? "#1E3E63"
                    : "#3B82F7"
                }
                onPress={() => handleButtonClick(index, data)}
              />
            </View>
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
    </>
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
  containerTitle: {
    flexDirection: "row",
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "left",
    flex: 1,
  },
  namePlanLong: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "left",
    flex: 1,
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
