import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Platform,
  ScrollView,
} from "react-native";
import { Plan } from "./Plan";
import { InfoPlan } from "./InfoPlan";
import { ExamplePlan } from "./ExamplePlan";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ExamplePlans = [
  {
    id: 1,
    name: "Upper Body",
    note: "",
    type: "Example",
    exercises: [
      "Bench Press (Barbell)",
      "Bent Over Row (Barbell)",
      "Incline Bench Press (Dumbbell)",
      "Incline Curl (Dumbbell)",
      "Lat Pulldown (Cable)",
    ],
  },
  {
    id: 2,
    name: "Lower Body",
    note: "",
    type: "Example",
    exercises: [
      "Squat (Barbell)",
      "Standing Calf Raise (Dumbbell)",
      "Romanian Deadlift (Barbell)",
    ],
  },
  {
    id: 3,
    name: "Full Body",
    note: "",
    type: "Example",
    exercises: [
      "Squat (Barbell)",
      "Bench Press (Barbell)",
      "Curl (Barbell)",
      "Crunch",
    ],
  },
];

export interface ExampleData {
  id: number;
  name: string;
  note: string;
  type: string;
  exercises?: string[];
}

export const Programs = () => {
  const [InfoPlanModal, setInfoPlanModal] = useState<boolean>(false);
  const [infoPlan, setInfoPlan] = useState<ExampleData>({
    id: 0,
    name: "",
    note: "",
    type: "",
    exercises: [],
  });
  const [plansData, setPlansData] = useState<any[]>([]);

  useEffect(() => {
    const fecthPlansData = async () => {
      try {
        const data = await AsyncStorage.getItem("plansData");
        if (data !== null) {
          setPlansData(JSON.parse(data));
        }
      } catch (error) {
        console.error(error);
      }
    };
    fecthPlansData();
  }, [plansData]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.spacingTitle}>
        <Text style={[styles.colorText, styles.textTitle]}>Schede</Text>
      </View>
      <View style={styles.spacingText}>
        <Text style={styles.colorText}>Le tue schede ({plansData.length})</Text>
        <FlatList
          data={plansData}
          numColumns={2}
          scrollEnabled={false}
          columnWrapperStyle={styles.row}
          renderItem={({ item }) => (
            <Plan
              data={item}
              infoPlan={infoPlan}
              setInfoPlan={setInfoPlan}
              InfoPlanModal={InfoPlanModal}
              setInfoPlanModal={setInfoPlanModal}
            />
          )}
        />
      </View>
      <View>
        <Text style={styles.colorText}>
          Esempi di schede ({ExamplePlans.length})
        </Text>
        <FlatList
          data={ExamplePlans}
          numColumns={2}
          scrollEnabled={false}
          columnWrapperStyle={styles.row}
          renderItem={({ item }) => (
            <ExamplePlan
              data={item}
              infoPlan={infoPlan}
              setInfoPlan={setInfoPlan}
              InfoPlanModal={InfoPlanModal}
              setInfoPlanModal={setInfoPlanModal}
            />
          )}
        />
      </View>
      <InfoPlan
        infoPlan={infoPlan}
        setInfoPlan={setInfoPlan}
        InfoPlanModal={InfoPlanModal}
        setInfoPlanModal={setInfoPlanModal}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },
  spacingTitle: {
    marginBottom: 15,
  },
  textTitle: {
    fontSize: 20,
  },
  spacingText: {
    marginBottom: 10,
  },
  colorText: {
    color: "#ffff",
    fontWeight: "500",
  },
  row: {
    flexWrap: "wrap",
  },
});
