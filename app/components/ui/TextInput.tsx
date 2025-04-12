import React from 'react';
import { StyleSheet, Text, TextInput as RNTextInput, View, TextInputProps, ViewStyle } from 'react-native';
import { Colors } from '@/constants/Colors';

interface Props extends TextInputProps {
  label?: string;
  containerStyle?: ViewStyle;
}

export function TextInput({ label, containerStyle, ...props }: Props) {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <RNTextInput
        style={[
          styles.input,
          props.multiline && styles.multilineInput
        ]}
        placeholderTextColor="#999"
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
}); 