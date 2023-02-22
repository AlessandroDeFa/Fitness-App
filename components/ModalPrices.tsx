import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
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
        <SafeAreaView style={styles.flex}>
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
            <View style={styles.containerMain}>
              <View>
                <View style={styles.containerTextHeader}>
                  <Text style={styles.fontTextHeader}>
                    Allenati meglio con il Pro.
                  </Text>
                  <Text style={styles.fontTitle}>
                    Sblocca la migliore app per i tuoi allenamenti, fatta per
                    farti raggiungiere i tuoi obiettivi
                  </Text>
                </View>
                <View>
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
          </View>
        </SafeAreaView>
      </ImageBackground>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
  containerMain: {
    flex: 1,
    justifyContent: "center",
  },
  containerTextHeader: {
    marginBottom: 30,
  },
  fontTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    lineHeight: 30,
  },
  fontTextHeader: {
    marginBottom: 10,
    fontSize: 18,
    color: "#CACCCD",
    fontWeight: "500",
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
    paddingVertical: 20,
    marginBottom: 15,
  },
});
