import React from "react";
import { Text, View } from "react-native";
import { globalStyles } from "../components/GlobalStyles";
import { Header } from "../components/Header";
import { Programs } from "../components/Programs";

export const Home = () => {
  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.main}>
        <Header />
        <Programs />
      </View>
    </View>
  );
};
