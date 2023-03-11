import React, { useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Platform,
  Text,
  ScrollView,
} from "react-native";
import { globalStyles } from "../components/GlobalStyles";
import { LineChart } from "react-native-chart-kit";

const data = {
  labels: ["Janry", "Feary", "March", "April", "May", "June", "asda"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43, 99],
      color: (opacity = 1) => `rgba(59, 130, 247, ${opacity})`, // optional
      strokeWidth: 2, // optional
    },
  ],
  legend: ["Peso (kg)"], // optional
};

export const Statistics = () => {
  const [selectedValue, setSelectedValue] = useState<number>(0);
  const [chartParentWidth, setChartParentWidth] = useState(0);

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.main}>
        <SafeAreaView style={styles.header}>
          <View style={styles.spacingTitle}>
            <Text style={styles.textTitle}>Statistiche</Text>
          </View>
        </SafeAreaView>
        <ScrollView>
          <View>
            <View style={styles.spacingSubtitle}>
              <Text style={styles.fontSubtitle}>
                Andamento del carico allenante
              </Text>
            </View>
            <View
              onLayout={({ nativeEvent }) =>
                setChartParentWidth(nativeEvent.layout.width)
              }
              style={styles.containerChart}
            >
              <LineChart
                onDataPointClick={({ index }) => setSelectedValue(index)}
                renderDotContent={({ x, y, index, indexData }) =>
                  selectedValue === index && (
                    <View style={{ position: "absolute", top: y, left: x }}>
                      <Text style={{ color: "white" }}>
                        {data.datasets[0].data[index]}
                      </Text>
                    </View>
                  )
                }
                data={data}
                width={chartParentWidth}
                height={200}
                chartConfig={{
                  backgroundColor: "#e26a00",
                  backgroundGradientFrom: "#1C1C1E",
                  backgroundGradientTo: "#1C1C1E",

                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,

                  propsForDots: {
                    r: "5",
                    stroke: "#3B82F7",
                    fill: "#3B82F7",
                  },

                  style: {
                    borderRadius: 16,
                  },
                }}
                bezier
                style={{
                  paddingRight: 45,
                  borderRadius: 16,
                }}
              />
            </View>
          </View>
          <View style={styles.spacingChart}>
            <View>
              <Text style={styles.fontSubtitle}>
                Andamento del peso corporeo
              </Text>
            </View>
            <View
              onLayout={({ nativeEvent }) =>
                setChartParentWidth(nativeEvent.layout.width)
              }
              style={styles.containerChart}
            >
              <LineChart
                onDataPointClick={({ index }) => setSelectedValue(index)}
                renderDotContent={({ x, y, index, indexData }) =>
                  selectedValue === index && (
                    <View style={{ position: "absolute", top: y, left: x }}>
                      <Text style={{ color: "white" }}>
                        {data.datasets[0].data[index]}
                      </Text>
                    </View>
                  )
                }
                data={data}
                width={chartParentWidth}
                height={200}
                chartConfig={{
                  backgroundColor: "#e26a00",
                  backgroundGradientFrom: "#1C1C1E",
                  backgroundGradientTo: "#1C1C1E",

                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,

                  propsForDots: {
                    r: "5",
                    stroke: "#3B82F7",
                    fill: "#3B82F7",
                  },

                  style: {
                    borderRadius: 16,
                  },
                }}
                bezier
                style={{
                  paddingRight: 45,
                  borderRadius: 16,
                }}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: Platform.OS === "ios" ? 90 : 60,
    borderBottomWidth: 0.5,
    paddingBottom: 15,
    borderColor: "#38383A",
  },
  spacingTitle: {
    marginBottom: 15,
  },
  textTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  spacingSubtitle: {
    marginTop: 20,
  },
  fontSubtitle: {
    color: "white",
    fontWeight: "500",
    fontSize: 15,
  },
  containerChart: {
    marginTop: 20,
  },
  spacingChart: {
    paddingTop: 15,
    borderTopWidth: 0.5,
    borderColor: "#38383A",
    marginTop: 30,
  },
});
