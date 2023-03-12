import React, { useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Platform,
  Text,
  ScrollView,
} from "react-native";
import { useContext } from "react";
import { ContextApp } from "../Navigation/TabNavigator";
import { Picker } from "@react-native-picker/picker";
import { useFocusEffect } from "@react-navigation/native";
import { globalStyles } from "../components/GlobalStyles";
import { Linechart } from "../components/Linechart";
import { ExampleData } from "../components/Programs";

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
  const [selectedPlan, setSelectedPlan] = useState();

  const { plansData } = useContext(ContextApp);

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
            <View style={styles.spacingPicker}>
              <Text style={styles.fontTextPicker}>Seleziona la scheda:</Text>
              <Picker
                itemStyle={styles.pickerItem}
                style={styles.picker}
                selectedValue={selectedPlan}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedPlan(itemValue)
                }
              >
                {plansData.map((plans: ExampleData) => (
                  <Picker.Item
                    label={plans.name}
                    value={plans.name}
                    key={plans.id}
                  />
                ))}
              </Picker>
            </View>
            <View style={styles.spacingPicker}>
              <Text style={styles.fontTextPicker}>
                Seleziona l' esercizio che vuoi visualizzare:
              </Text>
              <Picker
                itemStyle={styles.pickerItem}
                style={styles.picker}
                selectedValue={selectedPlan}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedPlan(itemValue)
                }
              >
                <Picker.Item label="Java" value="java" />
                <Picker.Item label="JavaScript" value="js" />
              </Picker>
            </View>
            <View
              onLayout={({ nativeEvent }) =>
                setChartParentWidth(nativeEvent.layout.width)
              }
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
    marginBottom: 20,
  },
  spacingPicker: {
    marginVertical: 20,
  },
  fontTextPicker: {
    color: "white",
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 15,
  },
  picker: {
    height: 70,
    backgroundColor: "#010300",
    justifyContent: "center",
    overflow: "hidden",
  },
  pickerItem: {
    fontSize: 15,
    color: "white",
  },
});
