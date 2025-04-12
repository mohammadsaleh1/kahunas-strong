import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, StatusBar, Platform, ScrollView, TouchableOpacity, Image, Modal } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Video, ResizeMode } from 'expo-av';

type Exercise = {
  name: string;
  time: string;
  letter: string;
  details?: string;
  heartRate?: number;
  video?: string;
  thumbnail?: string;
};

type WorkoutDay = {
  day: string;
  sections: {
    title: string;
    exercises: Exercise[];
  }[];
};

type Workout = {
  id: string;
  name: string;
  days: WorkoutDay[];
};

const workouts: Workout[] = [
  {
    id: '1',
    name: 'Morning Workout',
    days: [
      {
        day: 'Day 1',
        sections: [
          {
            title: 'Warmup',
            exercises: [
              {
                name: '3-4 Situp',
                details: '3 sets of 10 reps',
                time: '01 min',
                letter: 'A',
                video: 'https://video-previews.elements.envatousercontent.com/h264-video-previews/881349ce-fc8f-46c1-9e62-dfe664db717e/20750336.mp4',
                thumbnail: 'https://images.unsplash.com/photo-1544033527-b192daee1f5b?q=80&w=300&auto=format'
              },
              {
                name: 'Pushups',
                heartRate: 4,
                time: '01 min',
                letter: 'B'
              }
            ]
          },
          {
            title: 'Workout',
            exercises: [
              {
                name: 'Dumbbell Press',
                time: '01 min, 01 sec',
                letter: 'A'
              }
            ]
          }
        ]
      },
      {
        day: 'Day 2',
        sections: [
          {
            title: 'Warmup',
            exercises: [
              {
                name: 'Jumping Jacks',
                time: '02 min',
                letter: 'A',
                video: 'https://video-previews.elements.envatousercontent.com/h264-video-previews/881349ce-fc8f-46c1-9e62-dfe664db717e/20750336.mp4',
                thumbnail: 'https://images.unsplash.com/photo-1566241142559-40e1dab266c6?q=80&w=300&auto=format'
              }
            ]
          },
          {
            title: 'Workout',
            exercises: [
              {
                name: 'Squats',
                details: '4 sets of 12 reps',
                time: '02 min',
                letter: 'A'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'Full Body Workout',
    days: [
      {
        day: 'Day 1',
        sections: [
          {
            title: 'Warmup',
            exercises: [
              {
                name: 'Light Cardio',
                time: '05 min',
                letter: 'A'
              }
            ]
          }
        ]
      }
    ]
  }
];

export default function Workout() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [showWorkoutPicker, setShowWorkoutPicker] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState<Workout>(workouts[0]);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  const handleVideoPress = (videoUrl: string) => {
    setSelectedVideo(videoUrl);
  };

  const handleWorkoutSelect = (workout: Workout) => {
    setSelectedWorkout(workout);
    setSelectedDayIndex(0);
    setShowWorkoutPicker(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.workoutSelector}
            onPress={() => setShowWorkoutPicker(true)}
          >
            <Text style={styles.workoutName}>{selectedWorkout.name}</Text>
            <Ionicons name="chevron-down" size={20} color="#333333" style={styles.selectorIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareButton}>
            <Ionicons name="share-outline" size={24} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.tabBar}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {selectedWorkout.days.map((day, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.tab,
                  selectedDayIndex === index && styles.selectedTab
                ]}
                onPress={() => setSelectedDayIndex(index)}
              >
                <Text style={[
                  styles.tabText,
                  selectedDayIndex === index && styles.selectedTabText
                ]}>
                  {day.day}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <Modal
          visible={showWorkoutPicker}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowWorkoutPicker(false)}
        >
          <TouchableOpacity 
            style={styles.pickerOverlay}
            activeOpacity={1}
            onPress={() => setShowWorkoutPicker(false)}
          >
            <View style={styles.pickerContent}>
              {workouts.map((workout) => (
                <TouchableOpacity
                  key={workout.id}
                  style={[
                    styles.workoutOption,
                    selectedWorkout.id === workout.id && styles.workoutOptionSelected
                  ]}
                  onPress={() => handleWorkoutSelect(workout)}
                >
                  <Text style={[
                    styles.workoutOptionText,
                    selectedWorkout.id === workout.id && styles.workoutOptionTextSelected
                  ]}>
                    {workout.name}
                  </Text>
                  {selectedWorkout.id === workout.id && (
                    <Ionicons name="checkmark" size={20} color={Colors.primary} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </TouchableOpacity>
        </Modal>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {selectedWorkout.days[selectedDayIndex].sections.map((section, sectionIndex) => (
            <View key={sectionIndex} style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>{section.title}</Text>
                <View style={styles.sectionDivider} />
              </View>
              <View style={styles.exerciseGrid}>
                {section.exercises.map((exercise, exerciseIndex) => (
                  <View key={exerciseIndex} style={styles.exerciseCard}>
                    <TouchableOpacity 
                      style={styles.exerciseImageContainer}
                      onPress={() => exercise.video && handleVideoPress(exercise.video)}
                    >
                      {exercise.video ? (
                        <>
                          <Image
                            source={{ uri: exercise.thumbnail }}
                            style={styles.thumbnailImage}
                          />
                          <View style={styles.playOverlay}>
                            <Ionicons name="play" size={16} color="#FFFFFF" />
                          </View>
                        </>
                      ) : (
                        <Ionicons name="barbell-outline" size={30} color="#666666" />
                      )}
                    </TouchableOpacity>
                    <View style={styles.exerciseContent}>
                      <View style={styles.exerciseInfo}>
                        <Text style={styles.exerciseName}>{exercise.name}</Text>
                        {exercise.details && (
                          <Text style={styles.exerciseStats}>{exercise.details}</Text>
                        )}
                      </View>
                      <View style={styles.metricsRow}>
                        {exercise.heartRate && (
                          <View style={styles.detailItem}>
                            <Ionicons name="heart-outline" size={16} color={Colors.primary} />
                            <Text style={styles.detailText}>HR {exercise.heartRate}</Text>
                          </View>
                        )}
                        {exercise.time && (
                          <View style={styles.detailItem}>
                            <Ionicons name="time-outline" size={16} color={Colors.primary} />
                            <Text style={styles.detailText}>{exercise.time}</Text>
                          </View>
                        )}
                      </View>
                      <View style={styles.exerciseLetter}>
                        <Text style={styles.letterText}>{exercise.letter}</Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </ScrollView>

        <Modal
          visible={!!selectedVideo}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setSelectedVideo(null)}
        >
          <View style={styles.modalContainer}>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setSelectedVideo(null)}
            >
              <Ionicons name="close" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            {selectedVideo && (
              <Video
                source={{ uri: selectedVideo }}
                style={styles.videoPlayer}
                useNativeControls
                resizeMode={ResizeMode.COVER}
                shouldPlay
                isLooping={false}
              />
            )}
          </View>
        </Modal>

        <TouchableOpacity style={styles.logButton} activeOpacity={0.8}>
          <Text style={styles.logButtonText}>Log this workout</Text>
          <Ionicons name="checkmark-circle-outline" size={24} color="#FFFFFF" style={styles.logIcon} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  workoutSelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  workoutName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333333',
  },
  shareButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 0,
  },
  section: {
    marginTop: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginRight: 12,
  },
  sectionDivider: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E5E5',
  },
  exerciseGrid: {
    paddingHorizontal: 0,
  },
  exerciseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    width: '100%',
    flexDirection: 'row',
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  exerciseImageContainer: {
    width: 150,
    height: 100,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  exerciseContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
    position: 'relative',
  },
  exerciseInfo: {
    flex: 1,
    marginBottom: 12,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  exerciseStats: {
    fontSize: 14,
    color: '#666666',
  },
  metricsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 13,
    color: '#666666',
  },
  exerciseLetter: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
  },
  letterText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  logButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    margin: 16,
    padding: 16,
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  logButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  logIcon: {
    marginLeft: 4,
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  playOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoPlayer: {
    width: '100%',
    height: 300,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    padding: 10,
    zIndex: 1,
  },
  selectorIcon: {
    marginLeft: 4,
  },
  pickerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  pickerContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    width: '100%',
    padding: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  workoutOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 8,
  },
  workoutOptionSelected: {
    backgroundColor: `${Colors.primary}15`,
  },
  workoutOptionText: {
    fontSize: 16,
    color: '#333333',
  },
  workoutOptionTextSelected: {
    color: Colors.primary,
    fontWeight: '600',
  },
  tabBar: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
  },
  selectedTab: {
    backgroundColor: Colors.primary,
  },
  tabText: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  selectedTabText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
}); 