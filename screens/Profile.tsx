import React, { useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Platform,
  Text,
  ScrollView,
  TouchableHighlight,
} from "react-native";
import { globalStyles } from "../components/GlobalStyles";
import { MaterialIcons } from "@expo/vector-icons";
import { UpdateProfileModal } from "../components/UpdateProfileModal";

export const Profile = () => {
  const [updateProfileModal, setUpdateProfileModal] = useState<boolean>(false);
  const altezza = "190";
  const stringNome = "Nome";
  const nome = "alessandro";
  const stringAltezza = "Altezza (cm)";
  const stringEta = "Età";
  const stringPeso = "Peso corporeo (kg)";
  const peso = "90";
  const eta = "20";
  const [value, setValue] = useState<string>("");
  const [placeholder, setPlaceholder] = useState<string>("");

  const handleTouch = (value: string, string: string) => {
    setUpdateProfileModal(true);
    setValue(value);
    setPlaceholder(string);
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
                handleTouch(nome, stringNome);
              }}
            >
              <View style={styles.flex}>
                <Text style={styles.textTouchable}>Nome (opzionale)</Text>
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
                handleTouch(altezza, stringAltezza);
              }}
            >
              <View style={styles.flex}>
                <Text style={styles.textTouchable}>Altezza (cm)</Text>
                <View style={styles.flex}>
                  <Text style={styles.valuePofile}>180</Text>
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
                handleTouch(eta, stringEta);
              }}
            >
              <View style={styles.flex}>
                <Text style={styles.textTouchable}>Età</Text>
                <View style={styles.flex}>
                  <Text style={styles.valuePofile}>20</Text>
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
                handleTouch(peso, stringPeso);
              }}
            >
              <View style={styles.flex}>
                <Text style={styles.textTouchable}>Peso corporeo (kg)</Text>
                <View style={styles.flex}>
                  <Text style={styles.valuePofile}>90</Text>
                  <MaterialIcons
                    name="keyboard-arrow-right"
                    size={24}
                    color="#38383A"
                  />
                </View>
              </View>
            </TouchableHighlight>
          </View>
        </ScrollView>
      </View>
      <UpdateProfileModal
        value={value}
        placeholder={placeholder}
        updateProfileModal={updateProfileModal}
        setUpdateProfileModal={setUpdateProfileModal}
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
});
