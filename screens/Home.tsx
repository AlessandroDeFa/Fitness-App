import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { globalStyles } from "../components/GlobalStyles";
import { Header } from "../components/Header";
import { Programs } from "../components/Programs";
import { AddPlan } from "../components/AddPlan";
import { useContext } from "react";
import { ContextApp } from "../Navigation/TabNavigator";

export const Home = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { plansData, fecthPlansData } = useContext(ContextApp);

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
