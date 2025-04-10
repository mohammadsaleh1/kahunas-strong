import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';

interface DailyHabitsBoxProps {
  label: string;
  day: string;
  isChecked?: boolean;
  isFirst?: boolean;
  isLast?: boolean;
  onPress?: () => void;
}

export default function DailyHabitsBox({ label, day, isChecked = false, isFirst = false, isLast = false, onPress }: DailyHabitsBoxProps) {
  return (
    <TouchableOpacity 
      style={[
        styles.container, 
        isChecked && styles.checkedContainer,
        !isLast && styles.notLast
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <View style={styles.checkContainer}>
          <Ionicons 
            name="checkmark-circle" 
            size={18} 
            color={isChecked ? Colors.primary : '#E5E5E5'} 
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.labelText}>{label}</Text>
          <View style={styles.dayContainer}>
            <Text style={styles.dayText}>{day}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 8,
    width: 60,
    height: 85,
    borderWidth: 0.5,
    borderColor: '#E0E0E0',
  },
  checkedContainer: {
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  notLast: {
    marginRight: 8,
  },
  content: {
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
  },
  checkContainer: {
    width: 18,
    height: 18,
    marginBottom: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    alignItems: 'center',
  },
  labelText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#333333',
    marginBottom: 6,
    textAlign: 'center',
  },
  dayContainer: {
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
  },
  dayText: {
    fontSize: 10,
    color: '#666666',
    fontWeight: '500',
  },
}); 