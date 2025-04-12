import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { useRouter } from 'expo-router';
import DailyHabitsBox from '../../components/DailyHabitsBox';
import WaterTracker from '../../components/WaterTracker';
import WeightGraph from '../../components/WeightGraph';
import StepsGraph from '../../components/StepsGraph';

export default function home() {
  const router = useRouter();

  return (
    <>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.whiteBackground}>
          <View style={styles.container}>
            <View style={styles.header}>
              <View style={styles.headerContent}>
                <View style={styles.profileSection}>
                  <Image 
                    source={require('../../assets/images/image.png')}
                    style={styles.profileImage}
                    resizeMode="cover"
                  />
                  <View style={styles.profileInfo}>
                    <Text style={styles.greeting}>Hello, Moh</Text>
                    <Text style={styles.subtitle}>Let's check your athletes</Text>
                  </View>
                </View>
                <TouchableOpacity 
                  style={styles.notificationButton}
                  onPress={() => router.push('/notifications')}
                >
                  <Ionicons name="notifications-outline" size={25} color={Colors.primary} />
                  <View style={styles.notificationBadge} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.content}>
              <View>
                <View style={styles.sectionTitleContainer}>
                  <Text style={styles.sectionTitle}>Daily Checkin</Text>
                </View>
                <ScrollView 
                  horizontal 
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={[styles.habitsScrollContainer, { flexDirection: 'row-reverse' }]}
                >
                  <DailyHabitsBox 
                    label="Sun"
                    day="11"
                    isChecked={true}
                    isLast={true}
                  />
                  <DailyHabitsBox 
                    label="Sat"
                    day="10"
                    isChecked={false}
                  />
                  <DailyHabitsBox 
                    label="Fri"
                    day="09"
                    isChecked={true}
                  />
                  <DailyHabitsBox 
                    label="Thu"
                    day="08"
                    isChecked={false}
                  />
                  <DailyHabitsBox 
                    label="Wed"
                    day="07"
                    isChecked={true}
                  />
                  <DailyHabitsBox 
                    label="Tue"
                    day="06"
                    isChecked={false}
                  />
                  <DailyHabitsBox 
                    label="Mon"
                    day="05"
                    isChecked={true}
                  />
                </ScrollView>
                <View style={styles.sectionTitleContainer}>
                  <Text style={styles.sectionTitle}>Check-In</Text>
                </View>
                <TouchableOpacity 
                  style={styles.checkInButton}
                  onPress={() => {}}
                >
                  <View style={styles.checkInContent}>
                    <Text style={styles.checkInText}>You can check-in now</Text>
                    <Ionicons name="chevron-forward" size={24} color="#FFFFFF" />
                  </View>
                </TouchableOpacity>
                <View style={styles.sectionTitleContainer}>
                  <Text style={styles.sectionTitle}>Progress</Text>
                </View>
                <View style={styles.statsRow}>
                  <View style={styles.statsColumn}>
                    <WeightGraph />
                    <StepsGraph />
                  </View>
                  <View style={styles.waterTrackerContainer}>
                    <WaterTracker />
                  </View>
                </View>
              </View>
           
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
    paddingTop: 30,
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
    paddingTop: 25,
    paddingHorizontal: 20,
 
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: 12,
  },
  profileInfo: {
    flexDirection: 'column',
  },
  greeting: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
  exploreButton: {
   
  },    
  content: {
    flex: 1,
    padding: 10,
  },
  habitsScrollContainer: {
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  loginButton: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  streakContainer: {
    marginTop: 18,
    marginHorizontal: 6,
  },
  streakCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 4,
  },
  streakIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FF6B00',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  streakTextContainer: {
    flex: 1,
  },
  streakTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  streakTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
  },
  streakCountContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  streakCount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginRight: 4,
  },
  streakDays: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666666',
  },
  buttonContainer: {
    marginTop: 'auto',
  },
  sectionTitleContainer: {
    paddingHorizontal: 20,
    marginTop: 8,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
  },
  statsRow: {
    flexDirection: 'row',
    marginHorizontal: 10,
    gap: 12,
  },
  statsColumn: {
    flex: 0.5,
  },
  waterTrackerContainer: {
    flex: 0.5,
  },
  checkInButton: {
    backgroundColor: '#29B6F6',
    marginHorizontal: 10,
    borderRadius: 16,
    marginBottom: 7,
  },
  checkInContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  checkInText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },
}); 