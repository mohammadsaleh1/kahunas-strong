import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, StatusBar, TouchableOpacity, Platform } from 'react-native';
import { Calendar as RNCalendar } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { useRouter } from 'expo-router';
import CalendarEventItem from '../components/CalendarEventItem';
import CalendarDateHeader from '../components/CalendarDateHeader';

export default function Calendar() {
  const router = useRouter();
  const [selectedView, setSelectedView] = useState<'month' | 'list'>('month');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(currentDate.toLocaleString('default', { month: 'long' }));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  
  const handleRequestEvent = () => {
    router.push('/(tabs)/new-event');
  };

  const handleMonthChange = (increment: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + increment);
    setCurrentDate(newDate);
    setCurrentMonth(newDate.toLocaleString('default', { month: 'long' }));
  };

  return (
    <>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.whiteBackground}>
          <View style={styles.container}>
            <View style={styles.header}>
              <View style={styles.headerContent}>
                <Text style={styles.title}>Calendar</Text>
                <View style={styles.headerButtons}>
                  <TouchableOpacity style={styles.filterButton}>
                    <Ionicons name="funnel-outline" size={20} color={Colors.primary} />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.requestButton}
                    onPress={handleRequestEvent}
                  >
                    <Text style={styles.requestButtonText}>Request Event</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={styles.calendarHeader}>
              <View style={styles.monthSelector}>
                <TouchableOpacity 
                  style={styles.arrowButton}
                  onPress={() => handleMonthChange(-1)}
                >
                  <Ionicons name="chevron-back" size={24} color="#333333" />
                </TouchableOpacity>
                <Text style={styles.monthText}>{currentMonth}</Text>
                <TouchableOpacity 
                  style={styles.arrowButton}
                  onPress={() => handleMonthChange(1)}
                >
                  <Ionicons name="chevron-forward" size={24} color="#333333" />
                </TouchableOpacity>
              </View>
              <View style={styles.viewToggle}>
                <TouchableOpacity 
                  style={[styles.toggleButton, selectedView === 'month' && styles.toggleButtonActive]}
                  onPress={() => setSelectedView('month')}
                >
                  <Text style={[styles.toggleText, selectedView === 'month' && styles.toggleTextActive]}>Month</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.toggleButton, selectedView === 'list' && styles.toggleButtonActive]}
                  onPress={() => setSelectedView('list')}
                >
                  <Text style={[styles.toggleText, selectedView === 'list' && styles.toggleTextActive]}>List</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.content}>
              {selectedView === 'month' ? (
                <RNCalendar
                  key={`${currentDate.getFullYear()}-${currentDate.getMonth()}`}
                  style={styles.calendar}
                  current={`${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-01`}
                  theme={{
                    backgroundColor: '#FFFFFF',
                    calendarBackground: '#FFFFFF',
                    textSectionTitleColor: '#666666',
                    selectedDayBackgroundColor: Colors.primary,
                    selectedDayTextColor: '#FFFFFF',
                    todayTextColor: Colors.primary,
                    dayTextColor: '#333333',
                    textDisabledColor: '#D9D9D9',
                    dotColor: Colors.primary,
                    selectedDotColor: '#FFFFFF',
                    arrowColor: Colors.primary,
                    monthTextColor: '#333333',
                    textDayFontSize: 14,
                    textMonthFontSize: 16,
                    textDayHeaderFontSize: 14
                  }}
                  onMonthChange={(month: { timestamp: number }) => {
                    const newDate = new Date(month.timestamp);
                    setCurrentDate(newDate);
                    setCurrentMonth(newDate.toLocaleString('default', { month: 'long' }));
                  }}
                  enableSwipeMonths={true}
                  markingType={'dot'}
                  markedDates={{
                    '2024-04-10': { marked: true }
                  }}
                />
              ) : (
                <View style={styles.listContainer}>
                  <CalendarDateHeader 
                    date="April 11"
                    day="Friday"
                  />
                  <CalendarEventItem 
                    time="11:10 AM"
                    title="Morning Workout"
                    type="Logged Workout"
                  />
                  <CalendarEventItem 
                    time="2:30 PM"
                    title="Afternoon Session"
                    type="Logged Workout"
                  />
                  <CalendarDateHeader 
                    date="April 12"
                    day="Saturday"
                  />
                  <CalendarEventItem 
                    time="10:00 AM"
                    title="Weekend Training"
                    type="Logged Workout"
                  />
                </View>
              )}
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  whiteBackground: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    paddingTop: 15,
    paddingHorizontal: 20,
    paddingBottom: 15,
    backgroundColor: '#FFFFFF',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  filterButton: {
    padding: 8,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
  },
  requestButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  requestButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  calendarHeader: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  monthSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  arrowButton: {
    padding: 8,
  },
  monthText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginHorizontal: 20,
  },
  viewToggle: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    padding: 4,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  toggleButtonActive: {
    backgroundColor: '#FFFFFF',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  toggleText: {
    textAlign: 'center',
    color: '#666666',
    fontSize: 14,
    fontWeight: '500',
  },
  toggleTextActive: {
    color: '#333333',
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  calendar: {
    backgroundColor: '#FFFFFF',
  },
  listContainer: {
    flex: 1,
    paddingTop: 16,
  },
  dateHeader: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  dateInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  dayText: {
    fontSize: 16,
    color: '#666666',
  },
  eventItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  eventTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  eventTime: {
    fontSize: 14,
    color: '#333333',
    marginRight: 8,
  },
  eventDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
  },
  eventDetails: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 14,
    color: '#333333',
    marginBottom: 4,
  },
  eventType: {
    fontSize: 14,
    color: '#666666',
  },
}); 