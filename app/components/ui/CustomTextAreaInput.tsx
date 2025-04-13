import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TextInputProps, TextStyle } from 'react-native';
import { Colors } from '../../../constants/Colors';

interface CustomTextAreaInputProps extends TextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  required?: boolean;
  containerStyle?: any;
  labelStyle?: TextStyle;
}

export default function CustomTextAreaInput({
  label,
  value,
  onChangeText,
  placeholder,
  required = false,
  containerStyle,
  labelStyle,
  ...props
}: CustomTextAreaInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.labelContainer}>
        <Text style={[styles.label, labelStyle]}>{label}</Text>
        {required && <Text style={styles.required}>*</Text>}
      </View>
      <View style={[
        styles.inputContainer,
        isFocused && styles.inputContainerFocused
      ]}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#999999"
          multiline
          textAlignVertical="top"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  labelContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '500',
  },
  required: {
    color: '#FF0000',
    marginLeft: 4,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  inputContainerFocused: {
    borderColor: '#90CAF9',
  },
  input: {
    minHeight: 80,
    padding: 12,
    fontSize: 15,
    color: '#333333',
    textAlignVertical: 'top',
  },
}); 