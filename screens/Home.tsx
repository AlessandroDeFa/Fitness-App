import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Header } from "../components/Header";
import { Programs } from "../components/Programs";

export const Home = () => {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Header />
        <Programs />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#010300",
  },
  main: {
    paddingHorizontal: 16,
    flex: 1,
  },
});
