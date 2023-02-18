import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Platform,
  ImageBackground,
} from "react-native";
import { globalStyles } from "../components/GlobalStyles";
import { AntDesign } from "@expo/vector-icons";

interface ModalPricesProps {
  modalPrices: boolean;
  setModalPrices: (modalPrices: boolean) => void;
}

export const ModalPrices: React.FC<ModalPricesProps> = ({
  modalPrices,
  setModalPrices,
}) => {
  return (
    <Modal visible={modalPrices} animationType="slide">
      <ImageBackground
        source={require("../assets/bg-prices.jpg")}
        style={styles.ImageBackground}
      >
        <View style={[styles.modalContainer]}>
          <View style={globalStyles.main}>
            <View style={styles.containerHeader}>
              <View style={styles.flex}>
                <AntDesign
                  name="close"
                  size={22}
                  color="#3B82F7"
                  onPress={() => setModalPrices(false)}
                />
              </View>
            </View>
            <View style={styles.containerPrices}>
              <View style={styles.containerAllButton}>
                <TouchableOpacity
                  style={styles.buttonPrice}
                  activeOpacity={0.9}
                >
                  <View style={styles.containerTextButton}>
                    <Text style={styles.fontPrice}>5.99 €</Text>
                    <Text style={styles.fontText}>
                      Mensile - Primo Mese Gratuito
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonPrice}
                  activeOpacity={0.9}
                >
                  <View style={styles.containerTextButton}>
                    <Text style={styles.fontPrice}>34.99 €</Text>
                    <Text style={styles.fontText}>Iscrizione Annuale</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonPrice}
                  activeOpacity={0.9}
                >
                  <View style={styles.containerTextButton}>
                    <Text style={styles.fontPrice}>119.99 €</Text>
                    <Text style={styles.fontText}>
                      Sblocca il Pro Per Sempre
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    paddingTop: Platform.OS === "ios" ? 55 : 0,
    flex: 1,
  },
  ImageBackground: {
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
  containerPrices: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fontPrice: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
  fontText: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
  },
  containerAllButton: {
    flexDirection: "column",
    width: "100%",
  },
  containerTextButton: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonPrice: {
    backgroundColor: "#323030",
    borderRadius: 7,
    paddingHorizontal: 8,
    paddingVertical: 15,
    marginBottom: 15,
  },
});
