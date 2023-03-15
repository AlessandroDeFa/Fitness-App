import React, { useState, useEffect } from "react";
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
  Vibration,
} from "react-native";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { globalStyles } from "../components/GlobalStyles";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { profileDataStrocture } from "../screens/Profile";

interface UpdateProfileProps {
  updateProfileModal: boolean;
  setUpdateProfileModal: (updateProfileModal: boolean) => void;
  fecthProfileData: () => void;
  profileData: profileDataStrocture;
}

export const UpdateProfileModal: React.FC<UpdateProfileProps> = ({
  updateProfileModal,
  setUpdateProfileModal,
  fecthProfileData,
  profileData,
}) => {
  const [buttonScale] = useState(new Animated.Value(1));
  const [updateName, setUpdateName] = useState<string>("");
  const [updateHeight, setUpdateHeight] = useState<string>("");
  const [updateAge, setUpdateAge] = useState<string>("");
  const [updateWeight, setUpdateWeight] = useState<string>("");
  let day: number | string;
  let month: number | string;
  let formattedDate: string;

  useEffect(() => {
    setUpdateName(profileData.name);
    setUpdateAge(profileData.age);
    setUpdateHeight(profileData.height);
    setUpdateWeight(profileData.personalWeight);
  }, [profileData.personalWeight]);

  const handleSubmitUpdateProfile = async () => {
    const updatedWeight = updateWeight.replace(/,/g, ".");

    if (
      (updateHeight.trim() !== "" && isNaN(+updateHeight)) ||
      (updateAge.trim() !== "" && isNaN(+updateAge)) ||
      (updatedWeight.trim() !== "" && isNaN(+updatedWeight))
    ) {
      Vibration.vibrate([0, 50, 0, 0]);
      Animated.sequence([
        Animated.timing(buttonScale, {
          toValue: 5,
          duration: 75,
          useNativeDriver: true,
        }),
        Animated.timing(buttonScale, {
          toValue: -5,
          duration: 75,
          useNativeDriver: true,
        }),
        Animated.timing(buttonScale, {
          toValue: 0,
          duration: 75,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      try {
        let ProfileData = await AsyncStorage.getItem("profileData");
        ProfileData = ProfileData
          ? JSON.parse(ProfileData)
          : {
              id: "",
              name: "",
              age: "",
              height: "",
              personalWeight: "",
              personalWeightChart: [],
            };
        const uniqueId = uuidv4();

        //get Date for dataChart
        const date = new Date();
        day = date.getDate();
        month = date.getMonth() + 1;

        if (day < 10) {
          day = "0" + day;
        }
        if (month < 10) {
          month = "0" + month;
        }
        formattedDate = `${day}-${month}`;

        let dataChart = {
          kg: parseFloat(updatedWeight),
          date: formattedDate,
        };

        const personalWeightArray = ProfileData?.personalWeightChart || [];
        updateWeight !== "" && personalWeightArray.push(dataChart);

        const profileDataObject = {
          id: uniqueId,
          name: updateName.trim(),
          age: updateAge,
          height: updateHeight,
          personalWeight: updateWeight,
          personalWeightChart: personalWeightArray,
        };

        await AsyncStorage.setItem(
          "profileData",
          JSON.stringify(profileDataObject)
        );
        fecthProfileData();
        setUpdateProfileModal(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

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
                  style={{ transform: [{ translateX: buttonScale }] }}
                >
                  <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.8}
                    onPress={handleSubmitUpdateProfile}
                  >
                    <Text style={styles.textButton}>Salva</Text>
                  </TouchableOpacity>
                </Animated.View>
              </View>
            </View>
            <View style={styles.containerNameInput}>
              <TextInput
                style={styles.updateInputsName}
                placeholder="Nome"
                placeholderTextColor={Platform.OS === "ios" ? "" : "#606669"}
                defaultValue={profileData.name}
                maxLength={20}
                onChangeText={(value) => setUpdateName(value)}
              />
            </View>
            <View style={styles.containerFirstInputs}>
              <TextInput
                style={styles.updateInputs}
                placeholder="Altezza (cm)"
                keyboardType="numeric"
                maxLength={3}
                placeholderTextColor={Platform.OS === "ios" ? "" : "#606669"}
                defaultValue={profileData.height}
                onChangeText={(value) => setUpdateHeight(value)}
              />
              <TextInput
                style={styles.updateInputs}
                placeholder="Età"
                keyboardType="numeric"
                placeholderTextColor={Platform.OS === "ios" ? "" : "#606669"}
                maxLength={3}
                defaultValue={profileData.age}
                onChangeText={(value) => setUpdateAge(value)}
              />
              <TextInput
                style={styles.inputsNote}
                placeholder="Peso corporeo (kg)"
                keyboardType="numeric"
                placeholderTextColor={Platform.OS === "ios" ? "" : "#606669"}
                maxLength={5}
                defaultValue={profileData.personalWeight}
                onChangeText={(value) => setUpdateWeight(value)}
              />
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
  containerNameInput: {
    backgroundColor: "#1C1C1E",
    borderRadius: 9,
    paddingHorizontal: 15,
    marginTop: 40,
  },
  containerFirstInputs: {
    backgroundColor: "#1C1C1E",
    borderRadius: 9,
    paddingHorizontal: 15,
    paddingBottom: 10,
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
