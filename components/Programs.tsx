import React, { useState } from "react";
import { StyleSheet, View, Text, FlatList, ScrollView } from "react-native";
import { Plan } from "./Plan";
import { InfoPlan } from "./InfoPlan";
import { ExamplePlan } from "./ExamplePlan";

const ExamplePlans = [
  {
    id: "1",
    name: "Upper Body",
    note: "",
    type: "Example",
    exercises: [
      {
        id: "115",
        nameExercise: "Bench Press (Barbell)",
        series: "3",
        reps: "13",
        target: "Pectorals",
      },
      {
        id: "116",
        nameExercise: "Bent Over Row (Barbell)",
        series: "4",
        reps: "12",
        target: "Upper Back",
      },
      {
        id: "117",
        nameExercise: "Incline Bench Press (Dumbbell)",
        series: "3",
        reps: "10",
        target: "Pectorals",
      },
      {
        id: "118",
        nameExercise: "Incline Curl (Dumbbell)",
        series: "3",
        reps: "8",
        target: "Biceps",
      },
      {
        id: "119",
        nameExercise: "Lat Pulldown (Cable)",
        series: "4",
        reps: "10",
        target: "Lats",
      },
    ],
  },
  {
    id: "2",
    name: "Lower Body",
    note: "",
    type: "Example",
    exercises: [
      {
        id: "120",
        nameExercise: "Squat (Barbell)",
        series: "4",
        reps: "6",
        target: "Legs",
      },
      {
        id: "121",
        nameExercise: "Standing Calf Raise (Dumbbell)",
        series: "4",
        reps: "15",
        target: "Legs",
      },
      {
        id: "122",
        nameExercise: "Romanian Deadlift (Barbell)",
        series: "4",
        reps: "7",
        target: "Legs",
      },
    ],
  },
  {
    id: "3",
    name: "Full Body",
    note: "",
    type: "Example",
    exercises: [
      {
        id: "123",
        nameExercise: "Squat (Barbell)",
        series: "3",
        reps: "10",
        target: "Legs",
      },
      {
        id: "124",
        nameExercise: "Bench Press (Barbell)",
        series: "4",
        reps: "8",
        target: "Pectorals",
      },
      {
        id: "125",
        nameExercise: "Curl (Barbell)",
        series: "3",
        reps: "12",
        target: "Biceps",
      },
      {
        id: "126",
        nameExercise: "Crunch",
        series: "4",
        reps: "15",
        target: "Abs",
      },
    ],
  },
];

export interface ExerciseData {
  id: string;
  nameExercise: string;
  series: string;
  reps: string;
  target: string;
}

export interface ExampleData {
  id: string;
  name: string;
  note: string;
  type: string;
  exercises: ExerciseData[];
}

interface ProgramsProps {
  plansData: ExampleData[];
  fecthPlansData: () => void;
}

export const Programs: React.FC<ProgramsProps> = ({
  plansData,
  fecthPlansData,
}) => {
  const [infoPlanModal, setInfoPlanModal] = useState<boolean>(false);
  const [infoPlan, setInfoPlan] = useState<ExampleData>({
    id: "",
    name: "",
    note: "",
    type: "",
    exercises: [],
  });

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
              infoPlanModal={infoPlanModal}
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
              infoPlanModal={infoPlanModal}
              setInfoPlanModal={setInfoPlanModal}
            />
          )}
        />
      </View>
      <InfoPlan
        infoPlan={infoPlan}
        setInfoPlan={setInfoPlan}
        infoPlanModal={infoPlanModal}
        setInfoPlanModal={setInfoPlanModal}
        fecthPlansData={fecthPlansData}
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
