import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, Platform, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Colors } from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

export default function CheckIns() {
  // Sample data - in a real app, this would come from your backend
  const checkIns = [
    {
      id: 1,
      date: '2024-03-20',
      time: '08:30 AM',
      location: 'Main Gym',
      status: 'Completed',
    },
    {
      id: 2,
      date: '2024-03-19',
      time: '07:45 AM',
      location: 'Main Gym',
      status: 'Completed',
    },
    {
      id: 3,
      date: '2024-03-18',
      time: '09:15 AM',
      location: 'Main Gym',
      status: 'Completed',
    },
    {
      id: 4,
      date: '2024-03-17',
      time: '10:00 AM',
      location: 'Main Gym',
      status: 'Not Completed',
    },
  ];

  const handleNewCheckIn = () => {
    router.push('/checkin');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Total Check-ins</Text>
          <Text style={styles.summaryNumber}>{checkIns.length}</Text>
        </View>

        <View style={styles.checkInsList}>
          {checkIns.map((checkIn) => (
            <View key={checkIn.id} style={styles.checkInCard}>
              <View style={styles.checkInHeader}>
                <View style={styles.checkInDate}>
                  <Text style={styles.dateText}>{checkIn.date}</Text>
                  <Text style={styles.timeText}>{checkIn.time}</Text>
                </View>
                <View style={[
                  styles.statusBadge,
                  { backgroundColor: checkIn.status === 'Completed' ? '#10B981' : '#EF4444' }
                ]}>
                  <Text style={styles.statusText}>{checkIn.status}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity 
        style={styles.fab}
        onPress={handleNewCheckIn}
      >
        <Ionicons name="add" size={24} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingTop: Platform.OS === 'android' ? 5 : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    backgroundColor: '#fff',
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#212529',
    letterSpacing: 0.5,
  },
  scrollView: {
    flex: 1,
  },
  summaryCard: {
    backgroundColor: '#fff',
    margin: 12,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  summaryTitle: {
    color: '#6c757d',
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  summaryNumber: {
    color: '#212529',
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  checkInsList: {
    padding: 12,
  },
  checkInCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  checkInHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkInDate: {
    flex: 1,
  },
  dateText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#212529',
    letterSpacing: 0.3,
  },
  timeText: {
    fontSize: 13,
    color: '#6c757d',
    marginTop: 4,
    letterSpacing: 0.3,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
}); 