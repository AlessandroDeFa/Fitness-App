import React, { useState, createContext, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../screens/Home";
import { Profile } from "../screens/Profile";
import { Exercises } from "../screens/Exercises";
import { Statistics } from "../screens/Statistics";
import { Premium } from "../screens/Premium";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { ExampleData } from "../components/Programs";
import { profileDataStrocture } from "../screens/Profile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

export const ContextApp = createContext<any>(undefined);
const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  const [dataApi, setDataApi] = useState([]);
  let [filteredExercises, setFilteredExercises] = useState<object[]>([]);
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);
  const apiKey = Constants.manifest!.extra!.API_KEY;

  //fetch exercisesData from api

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
        .then((data) => setDataApi(data))
        .catch((error) => console.error(error));
    };

    fechData();
  }, []);

  useEffect(() => {
    if (dataApi.length > 0) {
      setFilteredExercises(dataApi);
    }
  }, [dataApi]);

  const filterExercises = (value: string) => {
    setFilteredExercises(
      dataApi.filter((exercise) => {
        return exercise.name.toLowerCase().includes(value.toLowerCase());
      })
    );
  };

  //fecth plansData from local storage

  const [plansData, setPlansData] = useState<ExampleData[]>([]);

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

  useEffect(() => {
    fecthPlansData();
  }, []);

  //fetch profileData from local storage

  const [profileData, setProfileData] = useState<profileDataStrocture>({
    id: "",
    name: "",
    age: "",
    height: "",
    personalWeight: "",
    personalWeightChart: [],
  });

  const fecthProfileData = async () => {
    try {
      const data = await AsyncStorage.getItem("profileData");
      if (data !== null) {
        setProfileData(JSON.parse(data));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fecthProfileData();
  }, []);

  return (
    <ContextApp.Provider
      value={{
        dataApi,
        filterExercises,
        filteredExercises,
        setFilteredExercises,
        setDataLoaded,
        dataLoaded,
        plansData,
        fecthPlansData,
        profileData,
        fecthProfileData,
      }}
    >
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => {
            if (route.name === "Nuovo workout") {
              return (
                <FontAwesome
                  name="plus"
                  size={22}
                  color={focused ? "#3B82F7" : color}
                />
              );
            } else if (route.name === "Profilo") {
              return (
                <Ionicons
                  name="ios-person-circle-outline"
                  size={26}
                  color={focused ? "#3B82F7" : color}
                />
              );
            } else if (route.name === "Esercizi") {
              return (
                <MaterialCommunityIcons
                  name="dumbbell"
                  size={22}
                  color={focused ? "#3B82F7" : color}
                  style={{ transform: [{ scaleX: -1 }] }}
                />
              );
            } else if (route.name === "Statistiche") {
              return (
                <Ionicons
                  name="stats-chart"
                  size={22}
                  color={focused ? "#3B82F7" : color}
                />
              );
            } else if (route.name === "Aggiorna") {
              return (
                <FontAwesome5
                  name="crown"
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
        initialRouteName="Nuovo workout"
      >
        <Tab.Screen name="Profilo" component={Profile} />
        <Tab.Screen name="Esercizi" component={Exercises} />
        <Tab.Screen name="Nuovo workout" component={Home} />
        <Tab.Screen name="Statistiche" component={Statistics} />
        <Tab.Screen name="Aggiorna" component={Premium} />
      </Tab.Navigator>
    </ContextApp.Provider>
  );
}

export default BottomTabNavigator;
