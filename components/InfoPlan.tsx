import React, { useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { ExampleData } from "./Programs";
import { UpdatePlan } from "./UpdatePlan";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface infoplanProps {
  infoPlanModal: boolean;
  setInfoPlanModal: (infoPlanModal: boolean) => void;
  infoPlan: ExampleData;
  setInfoPlan: (infoPlan: ExampleData) => void;
  fecthPlansData: () => void;
}

export const InfoPlan: React.FC<infoplanProps> = ({
  infoPlanModal,
  setInfoPlanModal,
  setInfoPlan,
  infoPlan,
  fecthPlansData,
}) => {
  const [updatePlanModal, setUpdatePlanModal] = useState<boolean>(false);

  const handleOpenUpdateModal = () => {
    setInfoPlanModal(false);
    setUpdatePlanModal(true);
  };

  const resetInfoPlan = () => {
    setInfoPlanModal(false);
    setInfoPlan({ id: "", name: "", note: "", type: "", exercises: [] });
  };

  const deletePlan = async (id: string) => {
    let plansData = await AsyncStorage.getItem("plansData");
    try {
      if (plansData) {
        const plansDataParsed = JSON.parse(plansData);
        const updatedPlans = plansDataParsed.filter(
          (plan: any) => plan.id !== id
        );
        await AsyncStorage.setItem("plansData", JSON.stringify(updatedPlans));
      }
      fecthPlansData();
      setInfoPlanModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Modal transparent={true} visible={infoPlanModal} animationType="slide">
        <View style={styles.container}>
          <View style={styles.modalContainer}>
            <View style={styles.main}>
              <View style={styles.containerHeader}>
                <View style={styles.flex}>
                  <AntDesign
                    name="close"
                    size={22}
                    color="#3B82F7"
                    onPress={resetInfoPlan}
                    style={styles.closeBtn}
                  />
                </View>

                <View style={styles.flex2}>
                  <Text
                    style={[
                      infoPlan.name.length < 15
                        ? styles.namePlan
                        : styles.namePlanLong,
                      infoPlan.type === "Personal Plan"
                        ? { textAlign: "center" }
                        : { textAlign: "left" },
                    ]}
                  >
                    {infoPlan.name}
                  </Text>
                </View>
                {infoPlan.type === "Personal Plan" && (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={handleOpenUpdateModal}
                    style={styles.flex}
                  >
                    <Text style={styles.fontButton}>Modifica</Text>
                  </TouchableOpacity>
                )}
              </View>

              <FlatList
                data={infoPlan.exercises}
                style={styles.containerExercisePlan}
                renderItem={({ item }) => (
                  <View style={styles.exercisePlan}>
                    <View>
                      <Text style={styles.textSeriesReps}>
                        [ {item.series} x {item.reps} ]
                      </Text>
                      {item.weight && item.weight !== "0" && (
                        <Text style={styles.textSeriesReps}>
                          [ {item.weight} kg ]
                        </Text>
                      )}
                    </View>

                    <View style={styles.textExercisePlan}>
                      <Text style={styles.textExerciseName}>
                        {item.nameExercise}
                      </Text>
                      <Text style={styles.textExerciseTarget}>
                        {item.target}
                      </Text>
                    </View>
                  </View>
                )}
              />
              {infoPlan.note && (
                <View style={styles.containerNote}>
                  <Text style={styles.fontTitle}>Note:</Text>
                  <Text style={styles.fontTextNote}>{infoPlan.note}</Text>
                </View>
              )}

              {infoPlan.type === "Personal Plan" && (
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => deletePlan(infoPlan.id)}
                >
                  <Text style={styles.buttonText}>Elimina</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </Modal>
      <UpdatePlan
        updatePlanModal={updatePlanModal}
        setUpdatePlanModal={setUpdatePlanModal}
        infoPlan={infoPlan}
        fecthPlansData={fecthPlansData}
      />
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
    height: "65%",
    borderRadius: 10,
  },
  main: {
    padding: 16,
    flex: 1,
  },
  containerHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  closeBtn: {
    alignSelf: "flex-start",
  },
  updateBtn: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  flex: {
    flex: 1,
  },
  flex2: {
    flex: 2,
  },
  fontButton: {
    color: "#3B82F7",
    fontSize: 16,
    textAlign: "right",
  },
  namePlan: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  namePlanLong: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  containerExercisePlan: {
    marginTop: 15,
    flex: 1,
  },
  exercisePlan: {
    flexDirection: "row",
    marginVertical: 10,
  },
  textExercisePlan: {
    flex: 3,
  },
  textExerciseName: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  textExerciseTarget: {
    color: "#CACCCD",
    fontWeight: "500",
  },
  textSeriesReps: {
    color: "white",
    fontWeight: "500",
    fontSize: 16,
    flex: 1,
    alignSelf: "center",
    marginRight: 13,
  },
  containerNote: {
    marginBottom: 15,
  },
  fontTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  fontTextNote: {
    color: "#CACCCD",
    fontWeight: "500",
  },
  deleteButton: {
    backgroundColor: "rgba(255, 0, 0, 0.04)",
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 9,
  },
  buttonText: {
    color: "#EB5545",
    fontSize: 15,
    fontWeight: "600",
  },
});
