import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

interface StepsGraphProps {
  data?: {
    date: string;
    steps: number;
  }[];
}

export default function StepsGraph({ data = defaultData }: StepsGraphProps) {
  const chartData = {
    labels: data.map(d => d.date),
    datasets: [{
      data: data.map(d => d.steps)
    }]
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>DAILY STEPS</Text>
      <LineChart
        data={chartData}
        width={140}
        height={100}
        chartConfig={{
          backgroundColor: '#FFFFFF',
          backgroundGradientFrom: '#FFFFFF',
          backgroundGradientTo: '#FFFFFF',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(41, 182, 246, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(102, 102, 102, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "4",
            strokeWidth: "1",
            stroke: "#29B6F6"
          }
        }}
        bezier
        style={styles.chart}
        withVerticalLines={false}
        withHorizontalLines={false}
        withDots={true}
        withShadow={false}
        withInnerLines={false}
        withOuterLines={false}
      />
      <Text style={styles.subtitle}>Last 5 days</Text>
    </View>
  );
}

const defaultData = [
  { date: '11/5', steps: 8500 },
  { date: '12/5', steps: 10200 },
  { date: '13/5', steps: 7800 },
  { date: '14/5', steps: 9300 },
  { date: '15/5', steps: 11000 },
];

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    width: '100%',
    height: 166,
    marginBottom: 8,
    justifyContent: 'center',
  },
  title: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: '#666666',
    marginTop: 4,
  },
  chart: {
    borderRadius: 16,
    marginVertical: 4,
  }
}); 