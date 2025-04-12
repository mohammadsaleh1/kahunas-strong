import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CalendarDateHeaderProps {
  date: string;
  day: string;
}

export default function CalendarDateHeader({ date, day }: CalendarDateHeaderProps) {
  return (
    <View style={styles.dateHeader}>
      <View style={styles.dateInfo}>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{date}</Text>
          <View style={styles.dayContainer}>
            <Ionicons name="calendar-outline" size={16} color="#666" style={styles.calendarIcon} />
            <Text style={styles.dayText}>{day}</Text>
          </View>
        </View>
        <View style={styles.dateDivider} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dateHeader: {
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  dateInfo: {
    flexDirection: 'column',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  dateText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  dayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  calendarIcon: {
    marginRight: 4,
  },
  dayText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  dateDivider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginTop: 8,
  },
}); 