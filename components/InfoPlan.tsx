import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  FlatList,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { ExampleData } from "./Programs";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface infoplanProps {
  InfoPlanModal: boolean;
  setInfoPlanModal: (infoPlanModal: boolean) => void;
  infoPlan: ExampleData;
  setInfoPlan: (infoPlan: ExampleData) => void;
}

export const InfoPlan: React.FC<infoplanProps> = ({
  InfoPlanModal,
  setInfoPlanModal,
  setInfoPlan,
  infoPlan,
}) => {
  const resetInfoPlan = () => {
    setInfoPlanModal(false);
    setInfoPlan({ id: 0, name: "", note: "", type: "", exercises: [] });
  };

  const deletePlan = async (id: number) => {
    let plansData = await AsyncStorage.getItem("plansData");
    try {
      if (plansData) {
        const plansDataParsed = JSON.parse(plansData);
        const updatedPlans = plansDataParsed.filter(
          (plan: any) => plan.id !== id
        );
        await AsyncStorage.setItem("plansData", JSON.stringify(updatedPlans));
      }
      setInfoPlanModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Modal transparent={true} visible={InfoPlanModal} animationType="slide">
        <View style={styles.container}>
          <View style={styles.modalContainer}>
            <View style={styles.main}>
              <View style={styles.containerHeader}>
                <View>
                  <AntDesign
                    name="close"
                    size={22}
                    color="#3B82F7"
                    onPress={resetInfoPlan}
                  />
                </View>
                <View style={styles.flex}>
                  <Text style={styles.namePlan}>{infoPlan.name}</Text>
                </View>
              </View>

              <FlatList
                data={infoPlan.exercises}
                style={styles.containerExercisePlan}
                renderItem={({ item }) => (
                  <View style={styles.exercisePlan}>
                    <Text style={styles.textExercisePlan}>{item}</Text>
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
  flex: {
    flex: 1,
  },
  namePlan: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "right",
  },
  containerExercisePlan: {
    marginTop: 15,
    flex: 1,
  },
  exercisePlan: {
    marginVertical: 10,
  },
  textExercisePlan: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
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
