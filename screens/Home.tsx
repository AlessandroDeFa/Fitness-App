import React, { useState } from "react";
import { View } from "react-native";
import { globalStyles } from "../components/GlobalStyles";
import { Header } from "../components/Header";
import { Programs } from "../components/Programs";
import { AddPlan } from "../components/AddPlan";

export const Home = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.main}>
        <Header setModalOpen={setModalOpen} />
        <Programs />
        <AddPlan modalOpen={modalOpen} setModalOpen={setModalOpen} />
      </View>
    </View>
  );
};
