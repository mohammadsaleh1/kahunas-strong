import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

interface CalendarEventItemProps {
  time: string;
  title: string;
  type: string;
}

export default function CalendarEventItem({ time, title, type }: CalendarEventItemProps) {
  return (
    <View style={styles.listContainer}>
      <View style={styles.eventItem}>
        <View style={styles.eventTimeContainer}>
          <Text style={styles.eventTime}>{time}</Text>
          <View style={styles.eventDot} />
        </View>
        <View style={styles.eventDetails}>
          <Text style={styles.eventTitle}>{title}</Text>
          <Text style={styles.eventType}>{type}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 4,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventTimeContainer: {
    alignItems: 'center',
    marginRight: 16,
  },
  eventTime: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  eventDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#29B6F6',
  },
  eventDetails: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  eventType: {
    fontSize: 14,
    color: '#666',
  },
}); 