import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Platform,
  ScrollView,
  Image,
  ImageBackground,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

interface ExerciseData {
  bodyPart: string;
  equipment: string;
  gifUrl: string;
  id: string;
  name: string;
  target: string;
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
  infoExerciseData.name =
    infoExerciseData.name.charAt(0).toUpperCase() +
    infoExerciseData.name.slice(1);
  infoExerciseData.equipment =
    infoExerciseData.equipment.charAt(0).toUpperCase() +
    infoExerciseData.equipment.slice(1);
  infoExerciseData.bodyPart =
    infoExerciseData.bodyPart.charAt(0).toUpperCase() +
    infoExerciseData.bodyPart.slice(1);

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
              <ImageBackground
                imageStyle={styles.imgResize}
                source={{ uri: `${infoExerciseData.gifUrl}` }}
                style={styles.imgInfo}
              />
              <View>
                <Text style={styles.fontTitle}>Parte del corpo</Text>
                <Text style={styles.fontText}>{infoExerciseData.bodyPart}</Text>
              </View>
              <View>
                <Text style={styles.fontTitle}>Equipaggiamento</Text>
                <Text style={styles.fontText}>
                  {infoExerciseData.equipment}
                </Text>
              </View>
              <View>
                <Text style={styles.fontTitle}>Muscolo</Text>
                <Text style={styles.fontText}>{infoExerciseData.target}</Text>
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
  imgResize: {
    resizeMode: "contain",
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
