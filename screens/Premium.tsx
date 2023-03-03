import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  FlatList,
} from "react-native";
import { globalStyles } from "../components/GlobalStyles";
import { AntDesign } from "@expo/vector-icons";
import { ModalPrices } from "../components/ModalPrices";

export const Premium = () => {
  const items = [
    "Grafici e statistiche",
    "Tieni traccia del tuo peso",
    "Crea schede illimitate",
  ];

  const [modalPrices, setModalPrices] = useState<boolean>(false);

  return (
    <View style={globalStyles.container}>
      <ImageBackground
        source={require("../assets/bg-premium.jpg")}
        style={styles.imageBackground}
      >
        <View style={[globalStyles.main, styles.containerMainText]}>
          <View>
            <View style={styles.spacingFirstText}>
              <Text style={styles.fontText}>
                Potente, intuitivo e qualcosa.
              </Text>
            </View>
            <View style={styles.spacingTitle}>
              <Text style={styles.fontTitle}>
                Diventa Pro e sblocca tutte le funzionalitá per portare i tuoi
                allenamenti al livello successivo
              </Text>
            </View>
            <View>
              <FlatList
                scrollEnabled={false}
                data={items}
                renderItem={({ item }) => (
                  <View style={styles.containerTextList}>
                    <AntDesign name="checkcircle" size={16} color="white" />
                    <Text style={styles.fontTextList}>{item}</Text>
                  </View>
                )}
              />
            </View>
          </View>
        </View>
        <View style={styles.containerButton}>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.9}
            onPress={() => setModalPrices(true)}
          >
            <Text style={styles.buttonText}>Vedi prezzi</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <ModalPrices modalPrices={modalPrices} setModalPrices={setModalPrices} />
    </View>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
  },
  containerMainText: {
    justifyContent: "center",
  },
  fontTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    lineHeight: 27,
  },
  fontText: {
    color: "#CACCCD",
    fontSize: 17,
    fontWeight: "500",
  },
  containerTextList: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  fontTextList: {
    color: "#CACCCD",
    marginLeft: 10,
    fontSize: 15,
    fontWeight: "500",
  },
  spacingFirstText: {
    marginBottom: 10,
  },
  spacingTitle: {
    marginBottom: 35,
  },
  containerButton: {
    paddingHorizontal: 16,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#1C1C1E",
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 9,
  },
  buttonText: {
    color: "#3B82F7",
    fontSize: 15,
    fontWeight: "600",
  },
});
