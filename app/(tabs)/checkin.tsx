import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { checkInFormFields, CheckInFormField } from '../interfaces/checkin-form';
import CustomTextAreaInput from '../components/ui/CustomTextAreaInput';
import CustomSelectInput from '../components/ui/CustomSelectInput';
import DateTimeInput from '../components/ui/DateTimeInput';

export default function CheckInScreen() {
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

  const renderField = (field: CheckInFormField) => {
    switch (field.type) {
      case 'textarea':
        return (
          <View key={field.name} style={styles.fieldContainer}>
            <CustomTextAreaInput
              label={field.label}
              value={formData[field.name] || ''}
              onChangeText={(text: string) => handleFieldChange(field.name, text)}
              required={field.required}
              labelStyle={styles.label}
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
      case 'dropdown':
      case 'checkbox':
        return (
          <View key={field.name} style={styles.fieldContainer}>
            <CustomSelectInput
              label={field.label}
              value={formData[field.name] || ''}
              options={Array.isArray(field.option) ? field.option : []}
              onSelect={(value) => handleFieldChange(field.name, value)}
              placeholder={`Select ${field.label.toLowerCase()}`}
              required={field.required}
              labelStyle={styles.label}
            />
          </View>
        );
      case 'video':
      case 'file':
        return (
          <View key={field.name} style={styles.uploadContainer}>
            <Text style={styles.label}>{field.label}</Text>
            <TouchableOpacity style={styles.uploadButton}>
              <Ionicons name="cloud-upload-outline" size={24} color={Colors.primary} />
              <Text style={styles.uploadText}>Upload {field.type}</Text>
            </TouchableOpacity>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Weekly Check-in</Text>
      </View>

      <View style={styles.formContainer}>
        <DateTimeInput
          date={date}
          time={time}
          onDateChange={setDate}
          onTimeChange={setTime}
        />
        {checkInFormFields.map(renderField)}
      </View>

      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Submit Check-in</Text>
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
  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginTop: 4,
  },
  formContainer: {
    padding: 20,
  },
  ratingContainer: {
    marginBottom: 20,
  },
  ratingLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
    marginBottom: 8,
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
    color: '#666666',
    fontWeight: '400',
  },
  ratingNumberTextSelected: {
    color: Colors.primary,
  },
  uploadContainer: {
    marginBottom: 20,
  },
  uploadLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
    marginBottom: 8,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
  },
  uploadText: {
    marginLeft: 8,
    color: Colors.primary,
    fontSize: 16,
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
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 12,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
  },
  dateTimeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dateTimeText: {
    fontSize: 14,
    color: '#666666',
  },
  content: {
    padding: 20,
  },
  fieldContainer: {
    marginBottom: 10
  },
  label: {
    fontSize: 14,
    fontWeight: '400',
    color: '#333333',
    marginBottom: 5,
  },
}); 