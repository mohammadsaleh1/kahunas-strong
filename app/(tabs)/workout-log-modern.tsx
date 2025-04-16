import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Platform,
  Animated,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import DateTimePicker from '@react-native-community/datetimepicker';

const { width } = Dimensions.get('window');

type Set = {
  weight: string;
  reps: string;
  isCompleted: boolean;
  rpe?: string;
};

type Exercise = {
  id: string;
  name: string;
  sets: Set[];
  targetReps?: string;
  restTime?: string;
  notes?: string;
  type: 'weighted' | 'bodyweight' | 'timed';
};

export default function ModernWorkoutLog() {
  const [exercises, setExercises] = useState<Exercise[]>([
    {
      id: '1',
      name: '3-4 Sit-up',
      type: 'bodyweight',
      sets: [
        { weight: '', reps: '', isCompleted: false, rpe: '' },
        { weight: '', reps: '', isCompleted: false, rpe: '' },
        { weight: '', reps: '', isCompleted: false, rpe: '' }
      ],
      targetReps: '12',
      restTime: '90',
      notes: 'Focus on form'
    },
    {
      id: '2',
      name: '4 Corners Curtsy',
      type: 'timed',
      sets: [
        { weight: '', reps: '60', isCompleted: false, rpe: '' }
      ],
      restTime: '60',
      notes: 'Keep heart rate elevated'
    }
  ]);

  const [workoutDate, setWorkoutDate] = useState(new Date());
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [activeExerciseId, setActiveExerciseId] = useState<string | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [restTimer, setRestTimer] = useState<number | null>(null);

  // Animation values
  const fadeAnim = useState(new Animated.Value(1))[0];
  const slideAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  useEffect(() => {
    let restInterval: NodeJS.Timeout;
    if (restTimer !== null && restTimer > 0) {
      restInterval = setInterval(() => {
        setRestTimer(prev => (prev !== null ? prev - 1 : null));
      }, 1000);
    }
    return () => clearInterval(restInterval);
  }, [restTimer]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleSetComplete = (exerciseId: string, setIndex: number) => {
    setExercises(prev => prev.map(ex => {
      if (ex.id === exerciseId) {
        const newSets = [...ex.sets];
        newSets[setIndex] = {
          ...newSets[setIndex],
          isCompleted: !newSets[setIndex].isCompleted
        };
        return { ...ex, sets: newSets };
      }
      return ex;
    }));

    // Start rest timer if set is completed
    const exercise = exercises.find(ex => ex.id === exerciseId);
    if (exercise?.restTime) {
      setRestTimer(parseInt(exercise.restTime));
    }

    // Animate completion
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0.5,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      })
    ]).start();
  };

  const handleInputChange = (
    exerciseId: string,
    setIndex: number,
    field: keyof Set,
    value: string
  ) => {
    setExercises(prev => prev.map(ex => {
      if (ex.id === exerciseId) {
        const newSets = [...ex.sets];
        newSets[setIndex] = { ...newSets[setIndex], [field]: value };
        return { ...ex, sets: newSets };
      }
      return ex;
    }));
  };

  const handleAddSet = (exerciseId: string) => {
    setExercises(prev => prev.map(ex => {
      if (ex.id === exerciseId) {
        return {
          ...ex,
          sets: [...ex.sets, { weight: '', reps: '', isCompleted: false, rpe: '' }]
        };
      }
      return ex;
    }));

    // Animate new set addition
    Animated.spring(slideAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 20,
      friction: 7
    }).start(() => {
      slideAnim.setValue(0);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Modern Header with Workout Timer */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.timerCard}>
          <Text style={styles.timerLabel}>Workout Duration</Text>
          <Text style={styles.timerValue}>{formatTime(elapsedTime)}</Text>
          <TouchableOpacity 
            style={styles.timerButton}
            onPress={() => setIsTimerRunning(!isTimerRunning)}
          >
            <Ionicons 
              name={isTimerRunning ? "pause" : "play"} 
              size={20} 
              color="#fff" 
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Rest Timer Overlay (if active) */}
      {restTimer !== null && restTimer > 0 && (
        <View style={styles.restTimerOverlay}>
          <Text style={styles.restTimerText}>Rest Time</Text>
          <Text style={styles.restTimerValue}>{restTimer}s</Text>
          <TouchableOpacity 
            style={styles.skipRestButton}
            onPress={() => setRestTimer(null)}
          >
            <Text style={styles.skipRestText}>Skip Rest</Text>
          </TouchableOpacity>
        </View>
      )}

      <ScrollView style={styles.content}>
        {exercises.map((exercise) => (
          <Animated.View 
            key={exercise.id}
            style={[
              styles.exerciseCard,
              { opacity: fadeAnim },
              exercise.id === activeExerciseId && styles.activeExerciseCard
            ]}
          >
            <TouchableOpacity 
              style={styles.exerciseHeader}
              onPress={() => setActiveExerciseId(
                activeExerciseId === exercise.id ? null : exercise.id
              )}
            >
              <View>
                <Text style={styles.exerciseName}>{exercise.name}</Text>
                <Text style={styles.exerciseType}>
                  {exercise.type.charAt(0).toUpperCase() + exercise.type.slice(1)}
                </Text>
              </View>
              <View style={styles.exerciseMetrics}>
                <Text style={styles.targetReps}>
                  Target: {exercise.targetReps || '-'} reps
                </Text>
                <Text style={styles.restTime}>
                  Rest: {exercise.restTime}s
                </Text>
              </View>
            </TouchableOpacity>

            {exercise.sets.map((set, index) => (
              <Animated.View 
                key={index}
                style={[
                  styles.setRow,
                  { transform: [{ translateX: slideAnim }] }
                ]}
              >
                <Text style={styles.setNumber}>Set {index + 1}</Text>
                {exercise.type !== 'timed' && (
                  <TextInput
                    style={styles.input}
                    placeholder={exercise.type === 'weighted' ? 'kg' : 'reps'}
                    value={exercise.type === 'weighted' ? set.weight : set.reps}
                    onChangeText={(value) => handleInputChange(
                      exercise.id,
                      index,
                      exercise.type === 'weighted' ? 'weight' : 'reps',
                      value
                    )}
                    keyboardType="numeric"
                  />
                )}
                <TextInput
                  style={styles.input}
                  placeholder="RPE"
                  value={set.rpe}
                  onChangeText={(value) => handleInputChange(
                    exercise.id,
                    index,
                    'rpe',
                    value
                  )}
                  keyboardType="numeric"
                />
                <TouchableOpacity 
                  style={[
                    styles.completeButton,
                    set.isCompleted && styles.completedButton
                  ]}
                  onPress={() => handleSetComplete(exercise.id, index)}
                >
                  <Ionicons 
                    name={set.isCompleted ? "checkmark" : "timer-outline"} 
                    size={24} 
                    color={set.isCompleted ? "#fff" : Colors.primary} 
                  />
                </TouchableOpacity>
              </Animated.View>
            ))}

            <TouchableOpacity 
              style={styles.addSetButton}
              onPress={() => handleAddSet(exercise.id)}
            >
              <Ionicons name="add-circle-outline" size={24} color={Colors.primary} />
              <Text style={styles.addSetText}>Add Set</Text>
            </TouchableOpacity>

            {exercise.notes && (
              <View style={styles.notesContainer}>
                <Text style={styles.notesLabel}>Notes</Text>
                <Text style={styles.notesText}>{exercise.notes}</Text>
              </View>
            )}
          </Animated.View>
        ))}
      </ScrollView>

      {/* Modern Footer */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.dateButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Ionicons name="calendar-outline" size={20} color={Colors.primary} />
          <Text style={styles.dateText}>
            {workoutDate.toLocaleDateString()}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={workoutDate}
            mode="date"
            onChange={(event, date) => {
              setShowDatePicker(false);
              if (date) setWorkoutDate(date);
            }}
          />
        )}

        <TouchableOpacity 
          style={styles.completeWorkoutButton}
          onPress={() => router.back()}
        >
          <Text style={styles.completeWorkoutText}>Complete Workout</Text>
          <Ionicons name="checkmark-circle" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  header: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    marginTop:90,
    paddingHorizontal: 90,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 1,
  },
  timerCard: {
    alignItems: 'center',
    marginTop: 20,
  },
  timerLabel: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.8,
  },
  timerValue: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '600',
    marginVertical: 8,
  },
  timerButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 8,
    borderRadius: 20,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  exerciseCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  activeExerciseCard: {
    borderColor: Colors.primary,
    borderWidth: 2,
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  exerciseType: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  exerciseMetrics: {
    alignItems: 'flex-end',
  },
  targetReps: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '500',
  },
  restTime: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  setRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  setNumber: {
    width: 60,
    fontSize: 14,
    color: '#666',
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#333',
  },
  completeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  completedButton: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  addSetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 8,
    marginTop: 8,
  },
  addSetText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: '500',
  },
  notesContainer: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  notesLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  notesText: {
    fontSize: 14,
    color: '#333',
  },
  restTimerOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [
      { translateX: -width * 0.4 },
      { translateY: -60 }
    ],
    width: width * 0.8,
    backgroundColor: 'rgba(0,0,0,0.9)',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    zIndex: 1000,
  },
  restTimerText: {
    color: '#fff',
    fontSize: 16,
    opacity: 0.8,
  },
  restTimerValue: {
    color: '#fff',
    fontSize: 48,
    fontWeight: '700',
    marginVertical: 8,
  },
  skipRestButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginTop: 8,
  },
  skipRestText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  footer: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 8,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  completeWorkoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  completeWorkoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 