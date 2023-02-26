import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TextInput,
  Platform,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

interface AddNewExerciseProps {
  newExerciseModal: boolean;
  setNewExerciseModal: (newExerciseModal: boolean) => void;
  handleSaveNewExercise: () => void;
  setExerciseName: (value: string) => void;
  setExerciseTarget: (value: string) => void;
  setReps: (value: string) => void;
  setSeries: (value: string) => void;
}

export const AddNewExercise: React.FC<AddNewExerciseProps> = ({
  setNewExerciseModal,
  newExerciseModal,
  handleSaveNewExercise,
  setExerciseName,
  setExerciseTarget,
  setReps,
  setSeries,
}) => {
  return (
    <View>
      <Modal
        visible={newExerciseModal}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.container}>
          <View style={styles.modalContainer}>
            <View style={styles.main}>
              <View style={styles.containerHeader}>
                <View style={styles.flex}>
                  <AntDesign
                    name="close"
                    size={22}
                    color="#3B82F7"
                    onPress={() => setNewExerciseModal(false)}
                  />
                </View>
                <View style={styles.flex2}>
                  <Text style={styles.fontTextHeader}>
                    Crea un nuovo esercizio
                  </Text>
                </View>
                <View style={[styles.flex, styles.containerButton]}>
                  <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.8}
                    onPress={handleSaveNewExercise}
                  >
                    <Text style={styles.textButton}>Salva</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.containerFormExercise}>
                <View>
                  <TextInput
                    placeholder="Aggiungi nome"
                    maxLength={25}
                    onChangeText={(value) => setExerciseName(value)}
                    style={styles.inputNewExercise}
                  />
                </View>
                <View style={styles.spacingInputNewExercise}>
                  <View style={styles.containerInputTarger}>
                    <Text style={[styles.flex, styles.textTarget]}>
                      Parte del corpo
                    </Text>
                    <TextInput
                      maxLength={15}
                      onChangeText={(value) => setExerciseTarget(value)}
                      style={[styles.inputNewExercise, styles.flex]}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.containerForm}>
                <View style={styles.containerOptions}>
                  <View style={styles.spacingSeriesReps}>
                    <View>
                      <Text style={styles.textOptions}>N. serie</Text>
                    </View>
                    <View style={styles.spacingInput}>
                      <TextInput
                        keyboardType="numeric"
                        maxLength={2}
                        onChangeText={(value) => setSeries(value)}
                        style={styles.inputExercise}
                      />
                    </View>
                  </View>
                  <View style={styles.spacingSeriesReps}>
                    <View>
                      <Text style={styles.textOptions}>Ripetizioni</Text>
                    </View>
                    <View style={styles.spacingInput}>
                      <TextInput
                        keyboardType="numeric"
                        maxLength={2}
                        onChangeText={(value) => setReps(value)}
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
    height: 270,
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
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 9,
  },

  containerForm: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  containerOptions: {
    flexDirection: "row",
    justifyContent: "center",
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
  spacingSeriesReps: {
    marginHorizontal: 15,
  },
  spacingInput: {
    marginTop: 7,
  },
  containerFormExercise: {
    marginTop: 15,
  },
  inputNewExercise: {
    backgroundColor: "#323135",
    borderRadius: 9,
    paddingHorizontal: 8,
    paddingVertical: Platform.OS === "ios" ? 5 : 0,
    color: "white",
  },
  containerInputTarger: {
    flexDirection: "row",
    alignItems: "center",
  },
  spacingInputNewExercise: {
    marginTop: 25,
    paddingTop: 25,
    borderTopWidth: 0.5,
    borderTopColor: "#38383A",
  },
  textTarget: {
    color: "white",
    fontWeight: "500",
  },
});
