import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface WaterTrackerProps {
  targetAmount?: number;
  incrementSize?: number;
}

export default function WaterTracker({ 
  targetAmount = 3, 
  incrementSize = 0.5 
}: WaterTrackerProps) {
  const [waterAmount, setWaterAmount] = React.useState(0);

  const handleIncrement = () => {
    if (waterAmount < targetAmount) {
      setWaterAmount(prev => Math.min(targetAmount, prev + incrementSize));
    }
  };

  const handleDecrement = () => {
    if (waterAmount > 0) {
      setWaterAmount(prev => Math.max(0, prev - incrementSize));
    }
  };

  const progressPercentage = (waterAmount / targetAmount) * 100;

  return (
    <View style={styles.waterTrackerContainer}>
      <View style={styles.waterTrackerCard}>
        <View style={styles.waterTrackerHeader}>
          <Text style={styles.waterTrackerTitle}>WATER TRACKER</Text>
          <Text style={styles.waterTrackerSubtitle}>{incrementSize}L | {targetAmount}L</Text>
        </View>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { height: `${progressPercentage}%` }]} />
          </View>
          <View style={styles.progressLabels}>
            <Text style={styles.progressLabel}>100%</Text>
            <Text style={styles.progressLabel}>50%</Text>
            <Text style={styles.progressLabel}>0%</Text>
          </View>
        </View>
        <View style={styles.waterControls}>
          <TouchableOpacity style={styles.waterButton} onPress={handleDecrement}>
            <Ionicons name="remove" size={16} color="#666666" />
          </TouchableOpacity>
          <View style={styles.waterAmount}>
            <Text style={styles.waterAmountText}>{waterAmount.toFixed(1)}</Text>
          </View>
          <TouchableOpacity style={styles.waterButton} onPress={handleIncrement}>
            <Ionicons name="add" size={16} color="#666666" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  waterTrackerContainer: {
    marginHorizontal:0,
    alignItems: 'flex-end',
  },
  waterTrackerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    width: '100%',
    minHeight: 200,
  },
  waterTrackerHeader: {
    marginBottom: 12,
    alignItems: 'center',
  },
  waterTrackerTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 2,
  },
  waterTrackerSubtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  progressContainer: {
    flexDirection: 'row',
    height: 220,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    paddingRight: '30%',
  },
  progressBar: {
    width: 24,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    overflow: 'hidden',
    height: '100%',
    marginRight: 8,
  },
  progressFill: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#2196F3',
    borderRadius: 12,
  },
  progressLabels: {
    height: '100%',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  progressLabel: {
    fontSize: 10,
    color: '#666666',
  },
  waterControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  waterButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  waterAmount: {
    marginHorizontal: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
  },
  waterAmountText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
}); 