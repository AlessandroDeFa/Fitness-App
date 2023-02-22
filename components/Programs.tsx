import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, FlatList, ScrollView } from "react-native";
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
      {
        nameExercise: "Bench Press (Barbell)",
        series: "3",
        reps: "13",
      },
      {
        nameExercise: "Bent Over Row (Barbell)",
        series: "4",
        reps: "12",
      },
      {
        nameExercise: "Incline Bench Press (Dumbbell)",
        series: "3",
        reps: "10",
      },
      {
        nameExercise: "Incline Curl (Dumbbell)",
        series: "3",
        reps: "8",
      },
      {
        nameExercise: "Lat Pulldown (Cable)",
        series: "4",
        reps: "10",
      },
    ],
  },
  {
    id: 2,
    name: "Lower Body",
    note: "",
    type: "Example",
    exercises: [
      {
        nameExercise: "Squat (Barbell)",
        series: "4",
        reps: "6",
      },
      {
        nameExercise: "Standing Calf Raise (Dumbbell)",
        series: "4",
        reps: "15",
      },
      {
        nameExercise: "Romanian Deadlift (Barbell)",
        series: "4",
        reps: "7",
      },
    ],
  },
  {
    id: 3,
    name: "Full Body",
    note: "",
    type: "Example",
    exercises: [
      {
        nameExercise: "Squat (Barbell)",
        series: "3",
        reps: "10",
      },
      {
        nameExercise: "Bench Press (Barbell)",
        series: "4",
        reps: "8",
      },
      {
        nameExercise: "Curl (Barbell)",
        series: "3",
        reps: "12",
      },
      {
        nameExercise: "Crunch",
        series: "4",
        reps: "15",
      },
    ],
  },
];

export interface ExerciseData {
  nameExercise: string;
  series: string;
  reps: string;
}

export interface ExampleData {
  id: number;
  name: string;
  note: string;
  type: string;
  exercises?: ExerciseData[];
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
  const [plansData, setPlansData] = useState<ExampleData[]>([]);

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
