import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Animated,
  Dimensions,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { useRouter, Link } from 'expo-router';
import DailyHabitsBox from '../components/DailyHabitsBox';
import WaterTracker from '../components/WaterTracker';
import WeightGraph from '../components/WeightGraph';
import StepsGraph from '../components/StepsGraph';

const { width } = Dimensions.get('window');

export default function ModernHomeScreen() {
  const router = useRouter();
  const scrollY = useRef(new Animated.Value(0)).current;

  // Native driver animations
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [1, 0.9],
    extrapolate: 'clamp',
  });

  const headerScale = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [1, 0.95],
    extrapolate: 'clamp',
  });

  // JavaScript driver animation
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [100, 80],
    extrapolate: 'clamp',
  });

  return (
    <>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <Animated.View 
          style={[
            styles.header, 
            { 
              height: headerHeight, // This will use JS driver
              opacity: headerOpacity,
              transform: [{ scale: headerScale }]
            }
          ]}
        >
          <View style={styles.headerContent}>
            <View style={styles.profileSection}>
              <Link href="/(tabs)/profile" asChild>
                <TouchableOpacity style={styles.profileLink}>
                  <Image
                    source={require('../../assets/images/image.png')}
                    style={styles.profileImage}
                  />
                  <View style={styles.profileInfo}>
                    <View style={styles.nameContainer}>
                      <Text style={styles.greeting}>Hello, Moh</Text>
                      <Ionicons name="chevron-forward" size={20} color="#fff" />
                    </View>
                    <Text style={styles.subtitle}>Let's check your progress</Text>
                  </View>
                </TouchableOpacity>
              </Link>
            </View>
            <TouchableOpacity 
              style={styles.notificationButton}
              onPress={() => router.push('/notifications')}
            >
              <Ionicons name="notifications-outline" size={25} color="#333" />
              <View style={styles.notificationBadge} />
            </TouchableOpacity>
          </View>
           
        </Animated.View>

        <Animated.ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
        >
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Daily Check-in</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.habitsScrollContainer}
            >
              <DailyHabitsBox 
                label="Sun"
                day="11"
                isChecked={true}
                isLast={true}
                onPress={() => router.push('/daily-checkin')}
              />
              <DailyHabitsBox 
                label="Sat"
                day="10"
                isChecked={false}
                onPress={() => router.push('/daily-checkin')}
              />
              <DailyHabitsBox 
                label="Fri"
                day="09"
                isChecked={true}
                onPress={() => router.push('/daily-checkin')}
              />
              <DailyHabitsBox 
                label="Thu"
                day="08"
                isChecked={false}
                onPress={() => router.push('/daily-checkin')}
              />
              <DailyHabitsBox 
                label="Wed"
                day="07"
                isChecked={true}
                onPress={() => router.push('/daily-checkin')}
              />
              <DailyHabitsBox 
                label="Tue"
                day="06"
                isChecked={false}
                onPress={() => router.push('/daily-checkin')}
              />
              <DailyHabitsBox 
                label="Mon"
                day="05"
                isChecked={true}
                onPress={() => router.push('/daily-checkin')}
              />
            </ScrollView>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Quick Actions</Text>
            </View>
            <View style={styles.quickActions}>
              <TouchableOpacity 
                style={styles.quickActionButton}
                onPress={() => router.push('/checkin')}
              >
                <View style={[styles.quickActionIcon, { backgroundColor: '#29B6F6' }]}>
                  <Ionicons name="checkmark-circle" size={24} color="#fff" />
                </View>
                <Text style={styles.quickActionText}>Check-in</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.quickActionButton}
                onPress={() => router.push('/workout')}
              >
                <View style={[styles.quickActionIcon, { backgroundColor: Colors.primary }]}>
                  <Ionicons name="barbell" size={24} color="#fff" />
                </View>
                <Text style={styles.quickActionText}>Workout</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.quickActionButton}
                onPress={() => router.push('/nutrition')}
              >
                <Ionicons name="nutrition-outline" size={24} color={Colors.primary} />
                <Text style={styles.quickActionText}>Log Nutrition</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.progressContainer}>
            <View style={styles.progressColumn}>
              <View style={styles.trackingCard}>
                <WeightGraph />
              </View>
              <View style={styles.trackingCard}>
                <StepsGraph />
              </View>
            </View>
            <View style={styles.waterTrackerContainer}>
              <WaterTracker />
            </View>
          </View>
        </Animated.ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 40,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#fff',
  },
  profileInfo: {
    flexDirection: 'column',
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
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
    backgroundColor: '#FF3B30',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  statCard: {
    backgroundColor: '#FAFAFA',
    padding: 6,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 6,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  statNumber: {
    fontSize: 18,
    color: Colors.primary,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.primary,
    marginTop: 2,
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 8,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 12,
    marginTop: 8,
    borderRadius: 16,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  seeAllText: {
    fontSize: 13,
    color: Colors.primary,
    fontWeight: '400',
  },
  habitsScrollContainer: {
    paddingVertical: 8,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  quickActionButton: {
    alignItems: 'center',
    flex: 1,
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  profileLink: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  progressContainer: {
    flexDirection: 'row',
    marginTop: 8,
    marginHorizontal: 12,
    gap: 12,
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
  },
  trackingCard: {
    backgroundColor: '#FFFFFF',
    padding: 0,
    borderRadius: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  waterTrackerContainer: {
    flex: 0.5,
    backgroundColor: '#FFFFFF',
    padding: 8,
    borderRadius: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  progressColumn: {
    flex: 0.5,
    gap: 12,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Platform.OS === 'ios' ? 120 : 80, // Extra padding for iOS
  },
}); 