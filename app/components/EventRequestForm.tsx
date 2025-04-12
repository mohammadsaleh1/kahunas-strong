import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput, Switch, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Colors } from '../../constants/Colors';

interface EventRequestFormProps {
  onSubmit: (eventData: any) => void;
  onCancel: () => void;
}

export default function EventRequestForm({ onSubmit, onCancel }: EventRequestFormProps) {
  const [eventData, setEventData] = useState({
    name: '',
    type: '',
    description: '',
    location: '',
    color: '#4F46E5',
    notifyMe: true,
    allDay: false,
    startDate: new Date(),
    endDate: new Date(),
  });

  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [pickerMode, setPickerMode] = useState<'date' | 'time'>('date');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!eventData.name.trim()) {
      newErrors.name = 'Event name is required';
    }
    if (!eventData.type.trim()) {
      newErrors.type = 'Event type is required';
    }
    if (!eventData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!eventData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(eventData);
    }
  };

  const handleDateChange = (type: 'start' | 'end', event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      if (event.type === 'set' && selectedDate) {
        if (pickerMode === 'date') {
          // After date is selected, show time picker
          setPickerMode('time');
        } else {
          // After time is selected, hide picker
          setPickerMode('date');
          if (type === 'start') {
            setShowStartDatePicker(false);
          } else {
            setShowEndDatePicker(false);
          }
        }
        setEventData(prev => ({
          ...prev,
          [type === 'start' ? 'startDate' : 'endDate']: selectedDate,
        }));
      } else if (event.type === 'dismissed') {
        // If picker is dismissed, reset mode and hide picker
        setPickerMode('date');
        if (type === 'start') {
          setShowStartDatePicker(false);
        } else {
          setShowEndDatePicker(false);
        }
      }
    } else {
      if (selectedDate) {
        setEventData(prev => ({
          ...prev,
          [type === 'start' ? 'startDate' : 'endDate']: selectedDate,
        }));
      }
      if (type === 'start') {
        setShowStartDatePicker(false);
      } else {
        setShowEndDatePicker(false);
      }
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.formGroup}>
        <Text style={styles.label}>
          Event Name <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={[styles.input, errors.name && styles.inputError]}
          value={eventData.name}
          onChangeText={(text) => setEventData(prev => ({ ...prev, name: text }))}
          placeholder="Enter event name"
          placeholderTextColor="#999"
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>
          Event Type <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={[styles.input, errors.type && styles.inputError]}
          value={eventData.type}
          onChangeText={(text) => setEventData(prev => ({ ...prev, type: text }))}
          placeholder="Enter event type"
          placeholderTextColor="#999"
        />
        {errors.type && <Text style={styles.errorText}>{errors.type}</Text>}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>
          Description <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={[styles.textArea, errors.description && styles.inputError]}
          value={eventData.description}
          onChangeText={(text) => setEventData(prev => ({ ...prev, description: text }))}
          placeholder="Enter event description"
          placeholderTextColor="#999"
          multiline
          numberOfLines={4}
        />
        {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>
          Location <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={[styles.input, errors.location && styles.inputError]}
          value={eventData.location}
          onChangeText={(text) => setEventData(prev => ({ ...prev, location: text }))}
          placeholder="Enter location"
          placeholderTextColor="#999"
        />
        {errors.location && <Text style={styles.errorText}>{errors.location}</Text>}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Event Color</Text>
        <View style={styles.colorPickerContainer}>
          <TouchableOpacity
            style={[styles.colorPreview, { backgroundColor: eventData.color }]}
            onPress={() => {
              // Here you can implement a color picker modal
              // For now, we'll just cycle through some predefined colors
              const colors = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];
              const currentIndex = colors.indexOf(eventData.color);
              const nextIndex = (currentIndex + 1) % colors.length;
              setEventData(prev => ({ ...prev, color: colors[nextIndex] }));
            }}
          />
          <Text style={styles.colorText}>{eventData.color}</Text>
        </View>
      </View>

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Notify Me</Text>
        <Switch
          value={eventData.notifyMe}
          onValueChange={(value) => setEventData(prev => ({ ...prev, notifyMe: value }))}
          trackColor={{ false: '#D1D5DB', true: Colors.primary }}
          thumbColor={eventData.notifyMe ? '#FFFFFF' : '#FFFFFF'}
        />
      </View>

      <View style={styles.switchContainer}>
        <Text style={styles.label}>All Day</Text>
        <Switch
          value={eventData.allDay}
          onValueChange={(value) => setEventData(prev => ({ ...prev, allDay: value }))}
          trackColor={{ false: '#D1D5DB', true: Colors.primary }}
          thumbColor={eventData.allDay ? '#FFFFFF' : '#FFFFFF'}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Start Date & Time</Text>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowStartDatePicker(true)}
        >
          <Text style={styles.dateButtonText}>
            {formatDate(eventData.startDate)}
          </Text>
          <Ionicons name="calendar-outline" size={20} color="#666" />
        </TouchableOpacity>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>End Date & Time</Text>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowEndDatePicker(true)}
        >
          <Text style={styles.dateButtonText}>
            {formatDate(eventData.endDate)}
          </Text>
          <Ionicons name="calendar-outline" size={20} color="#666" />
        </TouchableOpacity>
      </View>

      {showStartDatePicker && (
        <DateTimePicker
          value={eventData.startDate}
          mode={Platform.OS === 'ios' ? 'datetime' : pickerMode}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, date) => handleDateChange('start', event, date)}
        />
      )}

      {showEndDatePicker && (
        <DateTimePicker
          value={eventData.endDate}
          mode={Platform.OS === 'ios' ? 'datetime' : pickerMode}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, date) => handleDateChange('end', event, date)}
        />
      )}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit Request</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  required: {
    color: '#EF4444',
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333333',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  textArea: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333333',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    height: 100,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: '#EF4444',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 4,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dateButton: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  dateButtonText: {
    fontSize: 16,
    color: Colors.primary,
  },
  submitButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  colorPickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  colorPreview: {
    width: 40,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  colorText: {
    fontSize: 16,
    color: '#333333',
  },
}); 