import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { globalStyles } from "../components/GlobalStyles";
import { Header } from "../components/Header";
import { Programs } from "../components/Programs";
import { AddPlan } from "../components/AddPlan";
import { ExampleData } from "../components/Programs";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Home = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [plansData, setPlansData] = useState<ExampleData[]>([]);
  // const { setDataLoaded } = useContext(ContextApp);

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

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.main}>
        <Header setModalOpen={setModalOpen} />
        <Programs plansData={plansData} fecthPlansData={fecthPlansData} />
        <AddPlan
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          fecthPlansData={fecthPlansData}
        />
      </View>
    </View>
  );
};
