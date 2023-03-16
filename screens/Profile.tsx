import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Platform,
  Text,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { globalStyles } from "../components/GlobalStyles";
import ActionSheet from "react-native-actionsheet";
import { MaterialIcons } from "@expo/vector-icons";
import { UpdateProfileModal } from "../components/UpdateProfileModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { dataChart } from "../components/Programs";
import { useContext } from "react";
import { ContextApp } from "../Navigation/TabNavigator";

export interface profileDataStrocture {
  id: string;
  name: string;
  age: string;
  height: string;
  personalWeight: string;
  personalWeightChart: dataChart[] | [];
}

export const Profile = () => {
  const { profileData, fecthProfileData } = useContext(ContextApp);
  const [updateProfileModal, setUpdateProfileModal] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [action, setAction] = useState<string>("");
  const titleLastValue: string =
    "Sei sicuro di voler eliminare l'ultimo valore del tuo peso?\nQuesta azione non può essere annullata";
  const titleAllValues: string =
    "Sei sicuro di voler eliminare tutti i valori del tuo peso?\nQuesta azione non può essere annullata";

  let actionsheet = useRef<ActionSheet | null>(null);
  let optionArray = ["Elimina", "Annulla"];

  const showActionSheet = (value: string, action: string) => {
    setTitle(value);
    setAction(action);
    actionsheet.current &&
      actionsheet.current.setState(
        { options: optionArray },
        () => actionsheet.current?.show() && actionsheet.current?.show()
      );
  };

  const RemovePersonalWeightArray = async () => {
    try {
      const profileDataString = await AsyncStorage.getItem("profileData");
      if (profileDataString) {
        const profileData: profileDataStrocture = JSON.parse(profileDataString);
        profileData.personalWeightChart = [];
        profileData.personalWeight = "";
        await AsyncStorage.setItem("profileData", JSON.stringify(profileData));
        fecthProfileData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const RemoveLastValuePersonalWeight = async () => {
    try {
      const profileDataString = await AsyncStorage.getItem("profileData");
      if (profileDataString) {
        const profileData: profileDataStrocture = JSON.parse(profileDataString);
        if (profileData.personalWeightChart.length > 0) {
          profileData.personalWeightChart.pop();
          profileData.personalWeight =
            profileData.personalWeightChart.length === 0
              ? ""
              : profileData.personalWeightChart[
                  profileData.personalWeightChart.length - 1
                ].kg.toString();
        }
        await AsyncStorage.setItem("profileData", JSON.stringify(profileData));
        fecthProfileData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.main}>
        <SafeAreaView style={styles.header}>
          <View style={styles.spacingTitle}>
            <Text style={styles.textTitle}>Profilo</Text>
          </View>
        </SafeAreaView>
        <ScrollView>
          <View style={styles.spacingSection}>
            <Text style={styles.fontSubtitle}>Nome Account</Text>
            <TouchableHighlight
              style={styles.profieTouchable}
              activeOpacity={1}
              underlayColor="#323135"
              onPress={() => {
                setUpdateProfileModal(true);
              }}
            >
              <View style={styles.flex}>
                <Text style={styles.textTouchable}>
                  {profileData.name ? profileData.name : "Nome"}
                </Text>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={24}
                  color="#38383A"
                />
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.spacingSection}>
            <Text style={styles.fontSubtitle}>Informazioni generali</Text>

            <TouchableHighlight
              style={[styles.profieSecondTouchable, styles.borderTop]}
              activeOpacity={1}
              underlayColor="#323135"
              onPress={() => {
                setUpdateProfileModal(true);
              }}
            >
              <View style={styles.flex}>
                <Text style={styles.textTouchable}>Altezza (cm)</Text>
                <View style={styles.flex}>
                  <Text style={styles.valuePofile}>{profileData.height}</Text>
                  <MaterialIcons
                    name="keyboard-arrow-right"
                    size={24}
                    color="#38383A"
                  />
                </View>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.profieSecondTouchable}
              activeOpacity={1}
              underlayColor="#323135"
              onPress={() => {
                setUpdateProfileModal(true);
              }}
            >
              <View style={styles.flex}>
                <Text style={styles.textTouchable}>Età</Text>
                <View style={styles.flex}>
                  <Text style={styles.valuePofile}>{profileData.age}</Text>
                  <MaterialIcons
                    name="keyboard-arrow-right"
                    size={24}
                    color="#38383A"
                  />
                </View>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              style={[styles.profileLastTouchable, styles.borderBottom]}
              activeOpacity={1}
              underlayColor="#323135"
              onPress={() => {
                setUpdateProfileModal(true);
              }}
            >
              <View style={styles.flex}>
                <Text style={styles.textTouchable}>Peso corporeo (kg)</Text>
                <View style={styles.flex}>
                  <Text style={styles.valuePofile}>
                    {profileData.personalWeight}
                  </Text>
                  <MaterialIcons
                    name="keyboard-arrow-right"
                    size={24}
                    color="#38383A"
                  />
                </View>
              </View>
            </TouchableHighlight>
          </View>
          <TouchableOpacity
            style={styles.deleteFirstButton}
            onPress={() => showActionSheet(titleLastValue, "ultimoDato")}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>
              Elimina solo l'ultimo dato del peso
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => showActionSheet(titleAllValues, "tuttiDato")}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>
              Elimina tutti i dati del peso{" "}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <UpdateProfileModal
        profileData={profileData}
        fecthProfileData={fecthProfileData}
        updateProfileModal={updateProfileModal}
        setUpdateProfileModal={setUpdateProfileModal}
      />
      <ActionSheet
        ref={actionsheet}
        title={title}
        options={optionArray}
        tintColor={"#3B82F7"}
        cancelButtonIndex={1}
        destructiveButtonIndex={0}
        onPress={(index: number) => {
          if (index === 0 && action === "tuttiDato") {
            RemovePersonalWeightArray();
          } else if (index === 0 && action === "ultimoDato") {
            RemoveLastValuePersonalWeight();
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: Platform.OS === "ios" ? 90 : 60,
  },
  spacingTitle: {
    marginBottom: 15,
  },
  textTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  spacingSection: {
    marginTop: 20,
  },
  fontSubtitle: {
    color: "#606669",
    fontSize: 15,
    marginBottom: 15,
  },
  flex: {
    flexDirection: "row",
    alignItems: "center",
  },
  profieTouchable: {
    backgroundColor: "#1C1C1E",
    paddingVertical: 10,
    borderRadius: 9,
    fontSize: 16,
    paddingHorizontal: 15,
    color: "white",
  },
  profieSecondTouchable: {
    backgroundColor: "#1C1C1E",
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    fontSize: 16,
    color: "white",
    paddingHorizontal: 15,
    borderColor: "#38383A",
  },
  profileLastTouchable: {
    backgroundColor: "#1C1C1E",
    paddingVertical: 10,

    fontSize: 16,
    color: "white",
    paddingHorizontal: 15,
  },
  textTouchable: {
    flex: 1,
    color: "white",
    fontSize: 15,
    fontWeight: "500",
  },
  valuePofile: {
    color: "white",
    fontSize: 15,
    fontWeight: "500",
    marginRight: 10,
  },
  borderTop: {
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
  },
  borderBottom: {
    borderBottomLeftRadius: 9,
    borderBottomRightRadius: 9,
  },
  deleteFirstButton: {
    backgroundColor: "#1C1C1E",
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 9,
    marginTop: 40,
  },
  deleteButton: {
    backgroundColor: "#1C1C1E",
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 9,
    marginTop: 20,
  },
  buttonText: {
    color: "#E93323",
    fontSize: 15,
    fontWeight: "600",
  },
});
