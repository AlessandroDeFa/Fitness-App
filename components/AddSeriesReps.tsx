import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Platform,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

interface seriesRepsProps {
  seriesRepsModal: boolean;
  setSeriesRepsModal: (seriesRepsModal: boolean) => void;
  exerciseName: string;
  setExerciseNote: (value: string) => void;
  handleSaveExercise: () => void;
  setReps: (value: string) => void;
  setSeries: (value: string) => void;
  newExerciseName: string;
  setNewExerciseSeries: (value: string) => void;
  setNewExerciseReps: (value: string) => void;
  updatePlanModal: boolean;
  handleUpdateSaveExercise: () => void;
}

export const AddSeriesReps: React.FC<seriesRepsProps> = ({
  seriesRepsModal,
  setSeriesRepsModal,
  exerciseName,
  handleSaveExercise,
  setReps,
  setSeries,
  updatePlanModal,
  newExerciseName,
  setNewExerciseSeries,
  setNewExerciseReps,
  handleUpdateSaveExercise,
  setExerciseNote,
}) => {
  return (
    <View>
      <Modal visible={seriesRepsModal} transparent={true} animationType="slide">
        <View style={styles.container}>
          <View style={styles.modalContainer}>
            <View style={styles.main}>
              <View style={styles.containerHeader}>
                <View style={styles.flex}>
                  <AntDesign
                    name="close"
                    size={22}
                    color="#3B82F7"
                    onPress={() => setSeriesRepsModal(false)}
                    style={styles.closeBtn}
                  />
                </View>
                <View style={styles.flex2}>
                  <Text style={styles.fontTextHeader}>Serie e Ripetizioni</Text>
                </View>
                <View style={[styles.flex, styles.containerButton]}>
                  <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.8}
                    onPress={
                      updatePlanModal
                        ? handleUpdateSaveExercise
                        : handleSaveExercise
                    }
                  >
                    <Text style={styles.textButton}>Salva</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.containerInputNote}>
                <TextInput
                  placeholder="Note"
                  maxLength={50}
                  onChangeText={
                    updatePlanModal
                      ? (value) => {}
                      : (value) => setExerciseNote(value)
                  }
                  style={styles.inputNoteExercise}
                />
              </View>
              <View style={styles.containerForm}>
                <Text style={styles.fontNameExercise}>
                  {exerciseName || newExerciseName}
                </Text>
                <View style={styles.containerOptions}>
                  <View>
                    <View>
                      <Text style={styles.textOptions}>N. serie</Text>
                    </View>
                    <View style={styles.spacingInput}>
                      <TextInput
                        keyboardType="numeric"
                        maxLength={2}
                        onChangeText={
                          updatePlanModal
                            ? (value) => setNewExerciseSeries(value)
                            : (value) => setSeries(value)
                        }
                        style={styles.inputExercise}
                      />
                    </View>
                  </View>
                  <View>
                    <View>
                      <Text style={styles.textOptions}>Ripetizioni</Text>
                    </View>
                    <View style={styles.spacingInput}>
                      <TextInput
                        keyboardType="numeric"
                        maxLength={2}
                        onChangeText={
                          updatePlanModal
                            ? (value) => setNewExerciseReps(value)
                            : (value) => setReps(value)
                        }
                        style={styles.inputExercise}
                      />
                    </View>
                  </View>
                </View>
              </View>
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
    height: 200,
    borderRadius: 10,
  },
  main: {
    padding: 16,
    flex: 1,
  },
  containerHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  flex: {
    flex: 1,
  },
  flex2: {
    flex: 2,
  },
  closeBtn: {
    alignSelf: "flex-start",
  },
  fontTextHeader: {
    color: "white",
    fontWeight: "500",
    textAlign: "center",
  },
  containerButton: {
    alignItems: "flex-end",
  },
  textButton: {
    color: "#3B82F7",
    fontSize: 15,
    fontWeight: "600",
  },
  button: {
    backgroundColor: "#1C1C1E",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 9,
  },
  containerInputs: {
    marginTop: 45,
  },
  fontNameExercise: {
    color: "white",
    fontWeight: "500",
    flex: 1.1,
  },
  containerForm: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  containerOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
  textOptions: {
    color: "white",
    fontWeight: "500",
    textAlign: "center",
    fontSize: 15,
  },
  inputExercise: {
    backgroundColor: "#323135",
    borderRadius: 9,
    paddingVertical: Platform.OS === "ios" ? 8 : 5,
    paddingHorizontal: 5,
    width: 50,
    textAlign: "center",
    alignSelf: "center",
    color: "white",
  },
  inputNoteExercise: {
    backgroundColor: "#323135",
    borderRadius: 9,
    paddingHorizontal: 8,
    paddingVertical: Platform.OS === "ios" ? 5 : 0,
    color: "white",
  },
  containerInputNote: {
    marginTop: 25,
  },
  spacingInput: {
    marginTop: 7,
  },
});
