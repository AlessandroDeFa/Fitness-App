import { globalStyles } from "../components/GlobalStyles";
import { LineChart } from "react-native-chart-kit";
import { View, Text } from "react-native";
import React from "react";

interface datasetsChart {
  data: number[];
}

interface LineChartProps {
  data: {
    labels: string[];
    datasets: datasetsChart[];
    legend: string[];
  };
  chartParentWidth: number;
  value: number | null;
  setValue: (value: number) => void;
}

export const Linechart: React.FC<LineChartProps> = ({
  data,
  chartParentWidth,
  setValue,
  value,
}) => {
  return (
    <LineChart
      onDataPointClick={({ index }) => setValue(index)}
      renderDotContent={({ x, y, index, indexData }) =>
        value === index && (
          <View key={index} style={{ position: "absolute", top: y, left: x }}>
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
  );
};
