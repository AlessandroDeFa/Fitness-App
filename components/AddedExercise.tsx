import React, { useState } from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import { ExerciseData } from "./Programs";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface AddedExerciseProps {
  data: ExerciseData;
  exercises: ExerciseData[];
  setExercises: (exercises: ExerciseData[]) => void;
  updatePlanModal: boolean;
  newExercises: ExerciseData[];
  setNewExercises: (newExercises: ExerciseData[]) => void;
  setUpdateExerciseModal: (value: boolean) => void;
  setUpdateExerciseModalUpdate: (value: boolean) => void;
  setExerciseToUpdate: (value: ExerciseData) => void;
  setExerciseToUpdateModalUpdate: (value: ExerciseData) => void;
}

export const AddedExercise: React.FC<AddedExerciseProps> = ({
  data,
  setExercises,
  exercises,
  updatePlanModal,
  setNewExercises,
  newExercises,
  setUpdateExerciseModal,
  setUpdateExerciseModalUpdate,
  setExerciseToUpdate,
  setExerciseToUpdateModalUpdate,
}) => {
  const handleRemoveExercise = (id: string) => {
    setExercises(exercises.filter((exercise) => exercise.id !== id));
  };

  const handleUpdateExercises = (id: string) => {
    setNewExercises(newExercises.filter((exercise) => exercise.id !== id));
  };

  const handleUpdateOpenUpdateModal = (data: ExerciseData) => {
    setUpdateExerciseModalUpdate(true);
    setExerciseToUpdateModalUpdate(data);
  };

  const handleOpenUpdateModal = (data: ExerciseData) => {
    setUpdateExerciseModal(true);
    setExerciseToUpdate(data);
  };

  return (
    <View style={styles.containerExercise}>
      <View>
        <View style={styles.containerInfoExercise}>
          <Text ellipsizeMode="tail" numberOfLines={1} style={styles.fontTitle}>
            {data.nameExercise}
          </Text>
          <View style={styles.containerIcons}>
            <MaterialCommunityIcons
              name="square-edit-outline"
              size={23}
              color="#3B82F7"
              onPress={
                updatePlanModal
                  ? () => handleUpdateOpenUpdateModal(data)
                  : () => handleOpenUpdateModal(data)
              }
            />
            <Ionicons
              style={styles.removeExercise}
              name="remove-circle"
              size={23}
              onPress={
                updatePlanModal
                  ? () => handleUpdateExercises(data.id)
                  : () => handleRemoveExercise(data.id)
              }
            />
          </View>
        </View>
        <View>
          <Text style={styles.fontTarget}>{data.target}</Text>
        </View>
        {data.note && (
          <View style={styles.containerNote}>
            <Text style={styles.fontNote}>{data.note}</Text>
          </View>
        )}

        <View style={styles.containerOptions}>
          <View style={styles.option}>
            <View>
              <Text style={styles.textOptions}>N. serie</Text>
            </View>
            <View style={styles.spacingInput}>
              <View style={styles.containerSeriesReps}>
                <View style={styles.borderRadius}>
                  <Text style={styles.fontSeriesReps}>{data.series}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.option}>
            <View>
              <Text style={styles.textOptions}>Ripetizioni</Text>
            </View>
            <View style={styles.spacingInput}>
              <View style={styles.containerSeriesReps}>
                <View style={styles.borderRadius}>
                  <Text style={styles.fontSeriesReps}>{data.reps}</Text>
                </View>
              </View>
            </View>
          </View>
          {data.weight && data.weight !== "0" && (
            <View style={styles.option}>
              <View>
                <Text style={styles.textOptions}>Peso (kg)</Text>
              </View>
              <View style={styles.spacingInput}>
                <View style={styles.containerSeriesReps}>
                  <View style={styles.borderRadius}>
                    <Text style={styles.fontSeriesReps}>{data.weight}</Text>
                  </View>
                </View>
              </View>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerExercise: {
    marginTop: 25,
  },
  containerInfoExercise: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  containerIcons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    flex: 1,
  },
  removeExercise: {
    color: "#E93323",
    marginLeft: 20,
  },
  fontTitle: {
    flex: 3,
    color: "#3B82F7",
    fontSize: 17,
    fontWeight: "bold",
  },
  fontTarget: {
    color: "white",
    fontWeight: "500",
  },
  containerNote: {
    marginTop: 12,
    borderBottomWidth: 0.5,
    borderColor: "#38383A",
  },
  fontNote: {
    color: "#CACCCD",
    fontWeight: "500",
    paddingBottom: 6,
  },
  containerOptions: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "center",
  },
  option: {
    flex: 0.25,
  },
  textOptions: {
    color: "white",
    fontWeight: "500",
    textAlign: "center",
    fontSize: 15,
  },
  spacingInput: {
    marginTop: 7,
  },
  fontSeriesReps: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
  },
  borderRadius: {
    backgroundColor: "#1C1C1E",
    paddingVertical: Platform.OS === "ios" ? 8 : 5,
    paddingHorizontal: 5,
    width: 50,
    borderRadius: 9,
  },
  containerSeriesReps: {
    alignItems: "center",
    justifyContent: "center",
  },
});
