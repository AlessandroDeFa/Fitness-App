import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Home } from "./screens/Home";
import { Exercises } from "./screens/Exercises";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Home />
      {/* <Exercises /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#010300",
  },
});
