import React from "react";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import { ExampleData } from "./Programs";

interface planProps {
  InfoPlanModal: boolean;
  setInfoPlanModal: (infoPlanModal: boolean) => void;
  infoPlan: ExampleData;
  setInfoPlan: (infoPlan: ExampleData) => void;
  data: ExampleData;
}

export const Plan: React.FC<planProps> = ({
  InfoPlanModal,
  setInfoPlanModal,
  setInfoPlan,
  infoPlan,
  data,
}) => {
  const handleClickPlan = () => {
    setInfoPlanModal(true);
    setInfoPlan(data);
  };

  return (
    <TouchableHighlight
      style={styles.container}
      activeOpacity={1}
      underlayColor="#323135"
      onPress={handleClickPlan}
    >
      <Text style={styles.text}>{data.name}</Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1 / 2,
    marginTop: 15,
    marginRight: 10,
    height: 100,
    borderRadius: 9,
    borderColor: "#38383A",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});
