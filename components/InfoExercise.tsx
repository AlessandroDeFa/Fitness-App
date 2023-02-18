import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Platform,
  ScrollView,
} from "react-native";
import { globalStyles } from "../components/GlobalStyles";
import { AntDesign } from "@expo/vector-icons";

interface ExerciseData {
  name: string;
  difficulty: string;
  equipment: string;
  muscle: string;
  instructions: string;
}
interface InfoExerciseProps {
  exercisesInfo: boolean;
  setExercisesInfo: (exercisesInfo: boolean) => void;
  infoExerciseData: ExerciseData;
}

export const InfoExercise: React.FC<InfoExerciseProps> = ({
  setExercisesInfo,
  exercisesInfo,
  infoExerciseData,
}) => {
  return (
    <Modal transparent={true} visible={exercisesInfo} animationType="slide">
      <View style={styles.container}>
        <View style={styles.modalContainer}>
          <View style={styles.main}>
            <View style={styles.containerHeader}>
              <View>
                <AntDesign
                  name="close"
                  size={22}
                  color="#3B82F7"
                  onPress={() => setExercisesInfo(false)}
                />
              </View>
              <View style={styles.flex}>
                <Text style={styles.nameExercise}>{infoExerciseData.name}</Text>
              </View>
            </View>
            <ScrollView style={styles.containerInfo}>
              <View style={styles.imgInfo}></View>
              <View>
                <Text style={styles.fontTitle}>Difficoltá</Text>
                <Text style={styles.fontText}>
                  {infoExerciseData.difficulty}
                </Text>
              </View>
              <View>
                <Text style={styles.fontTitle}>Equipaggiamento</Text>
                <Text style={styles.fontText}>
                  {infoExerciseData.equipment}
                </Text>
              </View>
              <View>
                <Text style={styles.fontTitle}>Muscolo</Text>
                <Text style={styles.fontText}>{infoExerciseData.muscle}</Text>
              </View>
              <View>
                <Text style={styles.fontTitle}>Istruzioni</Text>
                <Text style={styles.fontText}>
                  {infoExerciseData.instructions}
                </Text>
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    </Modal>
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
  containerHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  nameExercise: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "right",
  },
  flex: {
    flex: 1,
  },
  containerInfo: {
    flex: 1,
    marginTop: 20,
  },
  imgInfo: {
    backgroundColor: "white",
    width: "100%",
    height: 225,
    borderRadius: 10,
    marginBottom: Platform.OS === "ios" ? 25 : 15,
  },
  fontTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 7,
  },
  fontText: {
    fontSize: Platform.OS === "ios" ? 16 : 13,
    fontWeight: "500",
    color: "#CACCCD",
    marginBottom: Platform.OS === "ios" ? 20 : 13,
  },
});
