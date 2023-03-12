import React, { useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Platform,
  Text,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useFocusEffect } from "@react-navigation/native";
import { globalStyles } from "../components/GlobalStyles";
import { LineChart } from "react-native-chart-kit";
import { Linechart } from "../components/Linechart";

const dataExerciseWeight = {
  labels: ["Janry", "Feary", "March", "April", "May", "June", "asda"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43, 99],
      color: (opacity = 1) => `rgba(59, 130, 247, ${opacity})`,
      strokeWidth: 2,
    },
  ],
  legend: ["Peso (kg)"],
};

const dataPersonalWeight = {
  labels: ["Janry", "Feary", "March", "April", "May", "June", "asda"],
  datasets: [
    {
      data: [20, 59, 28, 80, 99, 43, 99],
      color: (opacity = 1) => `rgba(59, 130, 247, ${opacity})`,
      strokeWidth: 2,
    },
  ],
  legend: ["Peso corporeo (kg)"],
};

export const Statistics = () => {
  const [selectedValue, setSelectedValue] = useState<number | null>(null);
  const [selectedValuePersonalWeight, setSelectedValuePersonalWeight] =
    useState<number | null>(null);
  const [chartParentWidth, setChartParentWidth] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState();

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setSelectedValue(null);
        setSelectedValuePersonalWeight(null);
      };
    }, [])
  );

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.main}>
        <SafeAreaView style={styles.header}>
          <View style={styles.spacingTitle}>
            <Text style={styles.textTitle}>Statistiche</Text>
          </View>
        </SafeAreaView>
        <ScrollView>
          <View>
            <View style={styles.spacingSubtitle}>
              <Text style={styles.fontSubtitle}>
                Andamento del carico allenante
              </Text>
            </View>
            <View style={{ backgroundColor: "white" }}>
              <Picker
                selectedValue={selectedLanguage}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedLanguage(itemValue)
                }
              >
                <Picker.Item
                  label="Java"
                  value="java"
                  style={{ color: "white" }}
                />
                <Picker.Item label="JavaScript" value="js" />
              </Picker>
            </View>
            <View
              onLayout={({ nativeEvent }) =>
                setChartParentWidth(nativeEvent.layout.width)
              }
              style={styles.containerChart}
            >
              <Linechart
                data={dataExerciseWeight}
                chartParentWidth={chartParentWidth}
                setValue={setSelectedValue}
                value={selectedValue}
              />
            </View>
          </View>
          <View style={styles.spacingChart}>
            <View>
              <Text style={styles.fontSubtitle}>
                Andamento del peso corporeo
              </Text>
            </View>
            <View style={styles.containerChart}>
              <Linechart
                data={dataPersonalWeight}
                chartParentWidth={chartParentWidth}
                setValue={setSelectedValuePersonalWeight}
                value={selectedValuePersonalWeight}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: Platform.OS === "ios" ? 90 : 60,
    borderBottomWidth: 0.5,
    paddingBottom: 15,
    borderColor: "#38383A",
  },
  spacingTitle: {
    marginBottom: 15,
  },
  textTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  spacingSubtitle: {
    marginTop: 20,
  },
  fontSubtitle: {
    color: "white",
    fontWeight: "500",
    fontSize: 15,
  },
  containerChart: {
    marginTop: 20,
  },
  spacingChart: {
    paddingTop: 15,
    borderTopWidth: 0.5,
    borderColor: "#38383A",
    marginTop: 30,
  },
});
