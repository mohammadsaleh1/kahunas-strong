import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Colors } from '../../../constants/Colors';

interface RatingInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  maxRating?: number;
}

export default function RatingInput({ label, value, onChange, maxRating = 5 }: RatingInputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.ratingContainer}>
        {[...Array(maxRating)].map((_, index) => {
          const rating = index + 1;
          const isSelected = rating <= value;

          return (
            <TouchableOpacity
              key={rating}
              style={[
                styles.ratingButton,
                isSelected && styles.ratingButtonActive,
              ]}
              onPress={() => onChange(rating)}
            >
              <Text style={[
                styles.ratingText,
                isSelected ? styles.ratingTextActive : styles.ratingTextInactive
              ]}>
                {rating}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  ratingButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingButtonActive: {
    borderColor: Colors.primary,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '600',
  },
  ratingTextActive: {
    color: Colors.primary,
  },
  ratingTextInactive: {
    color: '#9CA3AF',
  },
}); 