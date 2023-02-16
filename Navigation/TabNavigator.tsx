import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../screens/Home";
import { Exercises } from "../screens/Exercises";
import { Premium } from "../screens/Premium";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
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
    >
      <Tab.Screen name="Esercizi" component={Exercises} />
      <Tab.Screen name="Inizia allenamento" component={Home} />
      <Tab.Screen name="Aggiorna" component={Premium} />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
