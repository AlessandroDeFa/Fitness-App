import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  TextInput,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
} from "react-native";
import { AddedExercise } from "./AddedExercise";
import { globalStyles } from "../components/GlobalStyles";
import { AntDesign } from "@expo/vector-icons";

interface AddPlanProps {
  modalOpen: boolean;
  setModalOpen: (modalOpen: boolean) => void;
}

export const AddPlan: React.FC<AddPlanProps> = ({
  modalOpen,
  setModalOpen,
}) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Modal visible={modalOpen} animationType="slide">
        <SafeAreaView style={globalStyles.container}>
          <View style={globalStyles.main}>
            <View style={styles.containerHeader}>
              <View style={styles.flex}>
                <AntDesign
                  name="close"
                  size={22}
                  color="#3B82F7"
                  onPress={() => setModalOpen(false)}
                />
              </View>
              <View style={styles.flex}>
                <Text style={styles.fontTextHeader}>Nuova scheda</Text>
              </View>
              <View style={[styles.flex, styles.containerButton]}>
                <TouchableOpacity style={styles.button} activeOpacity={0.8}>
                  <Text style={styles.textButton}>Salva</Text>
                </TouchableOpacity>
              </View>
            </View>
            <ScrollView>
              <View style={styles.containerInputs}>
                <TextInput
                  style={styles.inputName}
                  multiline={true}
                  placeholder="Nome scheda"
                  placeholderTextColor="#606669"
                />
                <TextInput
                  style={styles.inputNote}
                  multiline={true}
                  placeholder="Note"
                  placeholderTextColor="#606669"
                />
                <TouchableOpacity style={styles.button} activeOpacity={0.8}>
                  <Text style={styles.textButton}>Aggiungi esercizi</Text>
                </TouchableOpacity>
              </View>
              <AddedExercise />
            </ScrollView>
          </View>
        </SafeAreaView>
      </Modal>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  containerHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  flex: {
    flex: 1,
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
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 9,
  },
  containerInputs: {
    marginTop: 45,
  },
  inputName: {
    fontSize: 23,
    fontWeight: "500",
    color: "white",
    marginBottom: 10,
  },
  inputNote: {
    color: "white",
    fontSize: 17,
    fontWeight: "400",
    marginBottom: 70,
  },
});
