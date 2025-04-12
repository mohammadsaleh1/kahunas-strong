import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, StatusBar, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function EventRequest() {
  const router = useRouter();
  const { eventData } = useLocalSearchParams();
  const parsedEventData = eventData ? JSON.parse(eventData as string) : null;

  return (
    <>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Ionicons name="chevron-back" size={24} color="#333333" />
            </TouchableOpacity>
            <Text style={styles.title}>Event Request</Text>
            <View style={styles.placeholder} />
          </View>
          
          <ScrollView style={styles.content}>
            {parsedEventData && (
              <>
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Event Details</Text>
                  <View style={styles.detailRow}>
                    <Text style={styles.label}>Name:</Text>
                    <Text style={styles.value}>{parsedEventData.name}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.label}>Type:</Text>
                    <Text style={styles.value}>{parsedEventData.type}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.label}>Location:</Text>
                    <Text style={styles.value}>{parsedEventData.location}</Text>
                  </View>
                </View>

                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Description</Text>
                  <Text style={styles.description}>{parsedEventData.description}</Text>
                </View>

                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Date & Time</Text>
                  <View style={styles.detailRow}>
                    <Text style={styles.label}>Start:</Text>
                    <Text style={styles.value}>
                      {new Date(parsedEventData.startDate).toLocaleString()}
                    </Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.label}>End:</Text>
                    <Text style={styles.value}>
                      {new Date(parsedEventData.endDate).toLocaleString()}
                    </Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.label}>All Day:</Text>
                    <Text style={styles.value}>{parsedEventData.allDay ? 'Yes' : 'No'}</Text>
                  </View>
                </View>

                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Preferences</Text>
                  <View style={styles.detailRow}>
                    <Text style={styles.label}>Notifications:</Text>
                    <Text style={styles.value}>{parsedEventData.notifyMe ? 'Enabled' : 'Disabled'}</Text>
                  </View>
                </View>
              </>
            )}
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    padding: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  placeholder: {
    width: 32,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 24,
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  label: {
    width: 100,
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  value: {
    flex: 1,
    fontSize: 14,
    color: '#333333',
  },
  description: {
    fontSize: 14,
    color: '#333333',
    lineHeight: 20,
  },
}); 