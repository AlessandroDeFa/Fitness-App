import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  Animated,
} from "react-native";
import { globalStyles } from "../components/GlobalStyles";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

interface UpdateExerciseProps {
  updateExerciseModal: boolean;
  setUpdateExerciseModal: (updateExerciseModal: boolean) => void;
  updateExerciseModalUpdate: boolean;
  setUpdateExerciseModalUpdate: (updateExerciseModal: boolean) => void;
  updatePlanModal: boolean;
}

export const UpdateExercise: React.FC<UpdateExerciseProps> = ({
  updateExerciseModal,
  setUpdateExerciseModal,
  updatePlanModal,
  updateExerciseModalUpdate,
  setUpdateExerciseModalUpdate,
}) => {
  return (
    <View>
      <Modal
        visible={
          updatePlanModal ? updateExerciseModalUpdate : updateExerciseModal
        }
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <SafeAreaView style={globalStyles.container}>
            <View style={globalStyles.main}>
              <View style={styles.containerHeader}>
                <TouchableOpacity
                  style={[styles.flex, styles.closeModal]}
                  activeOpacity={0.8}
                  onPress={
                    updatePlanModal
                      ? () => setUpdateExerciseModalUpdate(false)
                      : () => setUpdateExerciseModal(false)
                  }
                >
                  <MaterialIcons
                    name="keyboard-arrow-down"
                    size={24}
                    color="#3B82F7"
                  />
                  <Text style={styles.fontCloseModal}>Annulla</Text>
                </TouchableOpacity>
                <View style={styles.flex2}>
                  <Text style={styles.fontTextHeader}>Modifica esercizio</Text>
                </View>
                <View style={[styles.flex, styles.containerButton]}>
                  <Animated.View
                  // style={{ transform: [{ translateX: buttonScale }] }}
                  >
                    <TouchableOpacity
                      style={styles.button}
                      activeOpacity={0.8}
                      // onPress={handleSubmit}
                    >
                      <Text style={styles.textButton}>Salva</Text>
                    </TouchableOpacity>
                  </Animated.View>
                </View>
              </View>
            </View>
          </SafeAreaView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "red",
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
  closeModal: {
    flexDirection: "row",
    alignItems: "center",
  },
  fontCloseModal: {
    color: "#3B82F7",
    fontWeight: "500",
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
  closeBtn: {
    alignSelf: "flex-start",
  },
  button: {
    backgroundColor: "#1C1C1E",
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 9,
  },
});
