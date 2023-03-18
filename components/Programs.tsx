import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ScrollView,
  findNodeHandle,
  UIManager,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { Plan } from "./Plan";
import { InfoPlan } from "./InfoPlan";
import { ExamplePlan } from "./ExamplePlan";
import { PopUpMenu } from "../components/PopUpMenu";
import ActionSheet from "react-native-actionsheet";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
        weight: "50",
        note: "",
        dataChart: [{ kg: 1, date: "12-03-2021" }],
      },
      {
        id: "116",
        nameExercise: "Bent Over Row (Barbell)",
        series: "4",
        reps: "12",
        target: "Upper Back",
        weight: "30",
        note: "",
        dataChart: [{ kg: 1, date: "12-03-2021" }],
      },
      {
        id: "117",
        nameExercise: "Incline Bench Press (Dumbbell)",
        series: "3",
        reps: "10",
        target: "Pectorals",
        weight: "40",
        note: "",
        dataChart: [{ kg: 1, date: "12-03-2021" }],
      },
      {
        id: "118",
        nameExercise: "Incline Curl (Dumbbell)",
        series: "3",
        reps: "8",
        target: "Biceps",
        weight: "12",
        note: "",
        dataChart: [{ kg: 1, date: "12-03-2021" }],
      },
      {
        id: "119",
        nameExercise: "Lat Pulldown (Cable)",
        series: "4",
        reps: "10",
        target: "Lats",
        weight: "55",
        note: "",
        dataChart: [{ kg: 1, date: "12-03-2021" }],
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
        weight: "70",
        note: "",
        dataChart: [{ kg: 1, date: "12-03-2021" }],
      },
      {
        id: "121",
        nameExercise: "Standing Calf Raise (Dumbbell)",
        series: "4",
        reps: "15",
        target: "Legs",
        weight: "25",
        note: "",
        dataChart: [{ kg: 1, date: "12-03-2021" }],
      },
      {
        id: "122",
        nameExercise: "Romanian Deadlift (Barbell)",
        series: "4",
        reps: "7",
        target: "Legs",
        weight: "90",
        note: "",
        dataChart: [{ kg: 1, date: "12-03-2021" }],
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
        weight: "60",
        note: "",
        dataChart: [{ kg: 1, date: "12-03-2021" }],
      },
      {
        id: "124",
        nameExercise: "Bench Press (Barbell)",
        series: "4",
        reps: "8",
        target: "Pectorals",
        weight: "70",
        note: "",
        dataChart: [{ kg: 1, date: "12-03-2021" }],
      },
      {
        id: "125",
        nameExercise: "Curl (Barbell)",
        series: "3",
        reps: "12",
        target: "Biceps",
        weight: "10",
        note: "",
        dataChart: [{ kg: 1, date: "12-03-2021" }],
      },
      {
        id: "126",
        nameExercise: "Crunch",
        series: "4",
        reps: "15",
        target: "Abs",
        weight: "0",
        note: "",
        dataChart: [{ kg: 1, date: "12-03-2021" }],
      },
    ],
  },
];

export interface dataChart {
  kg: number;
  date: string;
}
export interface ExerciseData {
  id: string;
  nameExercise: string;
  series: string;
  reps: string;
  weight: string;
  target: string;
  note: string;
  dataChart: dataChart[] | [];
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
  const [updatePlanModal, setUpdatePlanModal] = useState<boolean>(false);
  const [infoPlan, setInfoPlan] = useState<ExampleData>({
    id: "",
    name: "",
    note: "",
    type: "",
    exercises: [],
  });

  //popUp Menu

  const [visible, setVisible] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const [selectedButtonIndex, setSelectedButtonIndex] = useState<number | null>(
    null
  );
  const buttonRef = useRef<View[]>([]);

  const handleButtonClick = (index: number, data: ExampleData) => {
    if (buttonRef.current[index]) {
      setSelectedButtonIndex(index);
      const handle = findNodeHandle(buttonRef.current[index]);
      if (handle) {
        UIManager.measureInWindow(handle, (x, y, width, height) => {
          setButtonPosition({
            x: x,
            y: y,
          });
        });
      }
      setInfoPlan(data);
      setVisible(!visible);
    }
  };

  //delete plan ActionSheet
  let actionsheet = useRef<ActionSheet | null>(null);
  let optionArray = ["Elimina", "Annulla"];
  const title: string =
    "Sei sicuro di voler eliminare questa scheda?\nQuesta azione non può essere annullata";

  const showActionSheet = () => {
    actionsheet.current &&
      actionsheet.current.setState(
        { options: optionArray },
        () => actionsheet.current?.show() && actionsheet.current?.show()
      );
  };

  const handleDeleteOption = async () => {
    let plansData = await AsyncStorage.getItem("plansData");
    try {
      if (plansData) {
        const plansDataParsed = JSON.parse(plansData);
        const updatedPlans = plansDataParsed.filter(
          (plan: any) => plan.id !== infoPlan.id
        );
        await AsyncStorage.setItem("plansData", JSON.stringify(updatedPlans));
      }
      fecthPlansData();
      setVisible(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.spacingTitle}>
          <Text style={[styles.colorText, styles.textTitle]}>Schede</Text>
        </View>
        <View style={styles.spacingText}>
          <Text style={styles.colorText}>
            Le tue schede ({plansData.length})
          </Text>
          <FlatList
            data={plansData}
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={styles.row}
            renderItem={({ item, index }) => (
              <Plan
                data={item}
                key={item.id}
                infoPlan={infoPlan}
                index={index}
                setInfoPlan={setInfoPlan}
                infoPlanModal={infoPlanModal}
                setInfoPlanModal={setInfoPlanModal}
                handleButtonClick={handleButtonClick}
                buttonRef={buttonRef}
                visible={visible}
                selectedButtonIndex={selectedButtonIndex}
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
          setUpdatePlanModal={setUpdatePlanModal}
          updatePlanModal={updatePlanModal}
        />
      </ScrollView>
      <TouchableWithoutFeedback onPress={() => setVisible(false)}>
        <View
          style={{
            display: visible ? "flex" : "none",
            backgroundColor: "transparent",
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height,
            position: "absolute",
          }}
        ></View>
      </TouchableWithoutFeedback>
      <PopUpMenu
        visible={visible}
        setVisible={setVisible}
        buttonPosition={buttonPosition}
        setUpdatePlanModal={setUpdatePlanModal}
        showActionSheet={showActionSheet}
      />
      <ActionSheet
        ref={actionsheet}
        title={title}
        options={optionArray}
        tintColor={"#3B82F7"}
        cancelButtonIndex={1}
        destructiveButtonIndex={0}
        onPress={(index: number) => {
          if (index === 0) {
            handleDeleteOption();
          }
        }}
      />
    </>
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
