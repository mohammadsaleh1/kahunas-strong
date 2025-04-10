import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

interface StatBoxProps {
  title: string;
  value: string;
  subtitle?: string;
}

export default function StatBox({ title, value, subtitle }: StatBoxProps) {
  return (
    <View style={styles.statBox}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  statBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    width: '100%',
    height: 165,
    marginBottom: 8,
    justifyContent: 'center',
  },
  title: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  value: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  subtitle: {
    fontSize: 12,
    color: '#666666',
    marginTop: 4,
  },
}); 