import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Alert, TextInput, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { dailyCheckInFormFields, DailyCheckInFormField } from './interfaces/daily-checkin-form';
import CustomTextAreaInput from './components/ui/CustomTextAreaInput';
import CustomSelectInput from './components/ui/CustomSelectInput';
import DateTimeInput from './components/ui/DateTimeInput';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function DailyCheckInScreen() {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const currentDate = new Date();
  const [date, setDate] = useState(currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }));
  const [time, setTime] = useState(currentDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  }));

  const handleFieldChange = (fieldName: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      // Prepare data for export
      const exportData = {
        date,
        time,
        ...formData
      };

      // Convert to CSV
      const csvContent = convertToCSV(exportData);
      
      // Save to file
      const fileUri = FileSystem.documentDirectory + 'daily_checkin.csv';
      await FileSystem.writeAsStringAsync(fileUri, csvContent, {
        encoding: FileSystem.EncodingType.UTF8
      });

      // Share the file
      await Sharing.shareAsync(fileUri, {
        mimeType: 'text/csv',
        dialogTitle: 'Share Daily Check-in Data'
      });

      Alert.alert('Success', 'Check-in data exported successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to export check-in data');
      console.error(error);
    }
  };

  const convertToCSV = (data: Record<string, any>) => {
    const headers = Object.keys(data);
    const values = headers.map(header => data[header]);
    return [headers.join(','), values.join(',')].join('\n');
  };

  const renderField = (field: DailyCheckInFormField) => {
    switch (field.type) {
      case 'habit_radio':
        return (
          <View key={field.name} style={styles.fieldContainer}>
            <View style={styles.habitRow}>
              <Text style={[styles.label, styles.habitLabel]}>{field.label}</Text>
              <View style={styles.habitRadioContainer}>
                <TouchableOpacity
                  style={[
                    styles.habitRadioButton,
                    formData[field.name] === 'yes' && styles.habitRadioButtonSelected,
                    styles.yesButton
                  ]}
                  onPress={() => handleFieldChange(field.name, 'yes')}
                >
                  <Ionicons 
                    name="checkmark-sharp" 
                    size={24} 
                    color={formData[field.name] === 'yes' ? '#22C55E' : '#666666'} 
                    style={styles.yesIcon}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.habitRadioButton,
                    formData[field.name] === 'no' && styles.habitRadioButtonSelected,
                    styles.noButton
                  ]}
                  onPress={() => handleFieldChange(field.name, 'no')}
                >
                  <Ionicons 
                    name="close" 
                    size={20} 
                    color={formData[field.name] === 'no' ? '#EF4444' : '#666666'} 
                    style={styles.noIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
      case 'number':
        return (
          <View key={field.name} style={styles.fieldContainer}>
            <Text style={styles.label}>{field.label}</Text>
            <TextInput
              style={styles.numberInput}
              value={formData[field.name]?.toString() || ''}
              onChangeText={(text) => handleFieldChange(field.name, text)}
              keyboardType="numeric"
              placeholder="Enter number"
            />
          </View>
        );
      case 'rating':
        return (
          <View key={field.name} style={styles.ratingContainer}>
            <Text style={styles.label}>{field.label}</Text>
            <View style={styles.ratingNumbers}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => {
                const isSelected = number <= (formData[field.name] || 0);
                return (
                  <TouchableOpacity
                    key={number}
                    onPress={() => handleFieldChange(field.name, number)}
                    style={[
                      styles.ratingNumber,
                      isSelected && styles.ratingNumberSelected
                    ]}
                  >
                    <Text style={[
                      styles.ratingNumberText,
                      isSelected && styles.ratingNumberTextSelected
                    ]}>
                      {number}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        );
      case 'time':
        return (
          <View key={field.name} style={styles.fieldContainer}>
            <Text style={styles.label}>{field.label}</Text>
            <TouchableOpacity
              style={styles.timeInput}
              onPress={() => handleFieldChange(field.name + '_showPicker', true)}
            >
              <Text style={styles.timeText}>
                {formData[field.name] || 'Select time'}
              </Text>
              <Ionicons name="time-outline" size={20} color="#666666" />
            </TouchableOpacity>
            {formData[field.name + '_showPicker'] && (
              <DateTimePicker
                value={formData[field.name] ? new Date(`2000-01-01T${formData[field.name]}`) : new Date()}
                mode="time"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                is24Hour={true}
                onChange={(event, selectedTime) => {
                  handleFieldChange(field.name + '_showPicker', false);
                  if (selectedTime) {
                    const hours = selectedTime.getHours().toString().padStart(2, '0');
                    const minutes = selectedTime.getMinutes().toString().padStart(2, '0');
                    handleFieldChange(field.name, `${hours}:${minutes}`);
                  }
                }}
              />
            )}
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
   

      <View style={styles.formContainer}>
        <DateTimeInput
          date={date}
          time={time}
          onDateChange={setDate}
          onTimeChange={setTime}
        />
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Habits</Text>
          {dailyCheckInFormFields
            .filter(field => field.identified === 'Habit')
            .map(renderField)}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Progress</Text>
          {dailyCheckInFormFields
            .filter(field => field.identified === 'Progress')
            .map(renderField)}
        </View>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit & Export</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    marginTop: 26,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333333',
  },
  formContainer: {
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 16,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
    marginBottom: 8,
  },
  habitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 8,
  },
  habitLabel: {
    flex: 1,
    marginBottom: 0,
    marginRight: 8,
  },
  habitRadioContainer: {
    flexDirection: 'row',
    gap: 8,
    minWidth: 120,
  },
  habitRadioButton: {
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  yesButton: {
    borderColor: '#E5E7EB',
  },
  noButton: {
    borderColor: '#E5E7EB',
  },
  yesIcon: {
    margin: 0,
  },
  noIcon: {
    margin: 0,
  },
  habitRadioButtonSelected: {
    borderColor: Colors.primary,
  },
  habitRadioText: {
    fontSize: 14,
    color: '#666666',
  },
  habitRadioTextSelected: {
    color: Colors.primary,
    fontWeight: '600',
  },
  ratingContainer: {
    marginBottom: 20,
  },
  ratingNumbers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
    gap: 4,
  },
  ratingNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingNumberSelected: {
    borderColor: Colors.primary,
  },
  ratingNumberText: {
    fontSize: 14,
    fontWeight: '400',
  },
  ratingNumberTextSelected: {
    color: Colors.primary,
  },
  submitButton: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 8,
    margin: 20,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  numberInput: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  timeInput: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  timeText: {
    fontSize: 16,
    color: '#333333',
  },
});