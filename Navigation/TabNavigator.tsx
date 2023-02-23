import React, { useState, createContext, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../screens/Home";
import { Exercises } from "../screens/Exercises";
import { Premium } from "../screens/Premium";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import Constants from "expo-constants";

export const ContextApp = createContext<any>(undefined);
const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  const [data, setData] = useState([]);
  let [filteredExercises, setFilteredExercises] = useState<object[]>([]);
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);
  const apiKey = Constants.manifest!.extra!.API_KEY;

  useEffect(() => {
    const fechData = async () => {
      fetch("https://exercisedb.p.rapidapi.com/exercises", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key": apiKey,
          "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
        },
      })
        .then((response) => response.json())
        .then((data) => setData(data))
        .catch((error) => console.error(error));
    };

    fechData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      setFilteredExercises(data);
    }
  }, [data]);

  const filterExercises = (value: string) => {
    setFilteredExercises(
      data.filter((exercise) => {
        return exercise.name.toLowerCase().startsWith(value.toLowerCase());
      })
    );
  };

  return (
    <ContextApp.Provider
      value={{
        data,
        filterExercises,
        filteredExercises,
        setDataLoaded,
        dataLoaded,
      }}
    >
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => {
            let iconName;
            if (route.name === "Inizia allenamento") {
              iconName = "plus";
              return (
                <FontAwesome
                  name={iconName}
                  size={22}
                  color={focused ? "#3B82F7" : color}
                />
              );
            } else if (route.name === "Esercizi") {
              iconName = "barbell-sharp";
              return (
                <Ionicons
                  name={iconName}
                  size={22}
                  color={focused ? "#3B82F7" : color}
                />
              );
            } else if (route.name === "Aggiorna") {
              iconName = "crown";
              return (
                <FontAwesome5
                  name={iconName}
                  size={22}
                  color={focused ? "#3B82F7" : color}
                />
              );
            }
          },
          tabBarStyle: {
            backgroundColor: "#121212",
            borderWidth: 0.5,
            borderTopColor: "#38383A",
          },
        })}
        initialRouteName="Inizia allenamento"
      >
        <Tab.Screen name="Esercizi" component={Exercises} />
        <Tab.Screen name="Inizia allenamento" component={Home} />
        <Tab.Screen name="Aggiorna" component={Premium} />
      </Tab.Navigator>
    </ContextApp.Provider>
  );
}

export default BottomTabNavigator;
