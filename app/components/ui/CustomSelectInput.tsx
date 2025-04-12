import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, ViewStyle, TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

interface CustomSelectInputProps {
  label?: string;
  value: string;
  options: string[];
  onSelect: (value: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  style?: ViewStyle;
  labelStyle?: TextStyle;
  containerStyle?: ViewStyle;
}

export default function CustomSelectInput({
  label,
  value,
  options,
  onSelect,
  placeholder = 'Select an option',
  error,
  required = false,
  style,
  labelStyle,
  containerStyle,
}: CustomSelectInputProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <View style={styles.labelContainer}>
          <Text style={[styles.label, labelStyle]}>{label}</Text>
          {required && <Text style={styles.required}>*</Text>}
        </View>
      )}
      <TouchableOpacity
        style={[styles.selectInput, error && styles.inputError, style]}
        onPress={() => setShowDropdown(true)}
      >
        <Text style={[styles.selectText, !value && styles.placeholderText]}>
          {value || placeholder}
        </Text>
        <Ionicons name="chevron-down" size={20} color="#666" />
      </TouchableOpacity>
      {error && <Text style={styles.errorText}>{error}</Text>}

      <Modal
        visible={showDropdown}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDropdown(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowDropdown(false)}
        >
          <View style={styles.dropdownContainer}>
            {options.map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.dropdownItem,
                  value === option && styles.selectedItem
                ]}
                onPress={() => {
                  onSelect(option);
                  setShowDropdown(false);
                }}
              >
                <Text style={[
                  styles.dropdownItemText,
                  value === option && styles.selectedItemText
                ]}>
                  {option}
                </Text>
                {value === option && (
                  <Ionicons name="checkmark" size={20} color={Colors.primary} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    color: '#000000',
    fontSize: 13,
    marginBottom: 3,
    fontWeight: '400',
    marginLeft: 4,
    paddingBottom: 3,
  },
  required: {
    color: '#EF4444',
    marginLeft: 4,
  },
  selectInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    height: 48,
  },
  selectText: {
    fontSize: 15,
    color: '#333333',
  },
  placeholderText: {
    color: '#C0C0C0',
  },
  inputError: {
    borderColor: '#EF4444',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 8,
    width: '80%',
    maxHeight: '60%',
  },
  dropdownItem: {
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  selectedItem: {
    backgroundColor: '#F3F4F6',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#333333',
  },
  selectedItemText: {
    color: Colors.primary,
    fontWeight: '500',
  },
}); 