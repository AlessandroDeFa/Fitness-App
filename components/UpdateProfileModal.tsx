import React from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Platform,
  Text,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  Modal,
  Animated,
  TextInput,
} from "react-native";
import { globalStyles } from "../components/GlobalStyles";
import { MaterialIcons } from "@expo/vector-icons";

interface UpdateProfileProps {
  updateProfileModal: boolean;
  setUpdateProfileModal: (updateProfileModal: boolean) => void;
  value: string;
  placeholder: string;
}

export const UpdateProfileModal: React.FC<UpdateProfileProps> = ({
  updateProfileModal,
  setUpdateProfileModal,
  value,
  placeholder,
}) => {
  return (
    <View>
      <Modal visible={updateProfileModal} animationType="slide">
        <SafeAreaView style={globalStyles.container}>
          <View style={globalStyles.main}>
            <View style={styles.containerHeader}>
              <TouchableOpacity
                style={[styles.flex, styles.closeModal]}
                activeOpacity={0.8}
                onPress={() => setUpdateProfileModal(false)}
              >
                <MaterialIcons
                  name="keyboard-arrow-down"
                  size={24}
                  color="#3B82F7"
                />
                <Text style={styles.fontCloseModal}>Annulla</Text>
              </TouchableOpacity>
              <View style={styles.flex2}>
                <Text style={styles.fontTextHeader}>Modifica Profilo</Text>
              </View>
              <View style={[styles.flex, styles.containerButton]}>
                <Animated.View
                // style={{ transform: [{ translateX: buttonScale }] }}
                >
                  <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.8}
                    // onPress={
                    //   updatePlanModal
                    //     ? () =>
                    //         handleSubmitUpdateExerciseModalUpdate(
                    //           exerciseToUpdateModalUpdate.id
                    //         )
                    //     : () => handleSubmitUpdateExercise(exerciseToUpdate.id)
                    // }
                  >
                    <Text style={styles.textButton}>Salva</Text>
                  </TouchableOpacity>
                </Animated.View>
              </View>
            </View>
            <View style={styles.containerFirstInputs}>
              <TextInput
                style={styles.updateInputsName}
                placeholder={placeholder}
                placeholderTextColor={Platform.OS === "ios" ? "" : "#606669"}
                defaultValue={value}
                // onChangeText={(value) => setUpdateNameExercise(value)}
              />
              {/* <TextInput
                style={styles.updateInputs}
                placeholder="Target"
                placeholderTextColor={Platform.OS === "ios" ? "" : "#606669"}
                maxLength={25}
                defaultValue={
                  exerciseToUpdate?.target ||
                  exerciseToUpdateModalUpdate?.target
                }
                onChangeText={(value) => setUpdateTargetExercise(value)}
              />
              <TextInput
                style={styles.inputsNote}
                placeholder="Note"
                placeholderTextColor={Platform.OS === "ios" ? "" : "#606669"}
                maxLength={70}
                defaultValue={
                  exerciseToUpdate?.note || exerciseToUpdateModalUpdate?.note
                }
                onChangeText={(value) => setUpdateNoteExercise(value)}
              /> */}
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </View>
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
  containerFirstInputs: {
    backgroundColor: "#1C1C1E",
    borderRadius: 9,
    paddingHorizontal: 15,

    marginTop: 40,
  },
  spacingInputs: {
    marginTop: 30,
  },
  updateInputsName: {
    backgroundColor: "#1C1C1E",
    paddingVertical: 10,
    fontSize: 16,
    color: "white",
  },
  updateInputs: {
    backgroundColor: "#1C1C1E",
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    fontSize: 16,
    color: "white",
    borderColor: "#38383A",
  },
  inputsNote: {
    backgroundColor: "#1C1C1E",
    paddingTop: 10,
    fontSize: 16,
    color: "white",
  },
  titleValues: {
    color: "#CACCCD",
    fontWeight: "500",
    marginBottom: 10,
    marginLeft: 15,
  },
});
