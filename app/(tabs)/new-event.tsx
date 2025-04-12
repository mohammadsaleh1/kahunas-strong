import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, SafeAreaView, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import EventRequestForm from '../components/EventRequestForm';

export default function NewEvent() {
  const router = useRouter();

  const handleSubmit = (eventData: any) => {
    // Store the event data (you might want to use a state management solution or API call here)
    console.log(eventData);
    // Navigate to the event request page with the event data
    router.push({
      pathname: "/(tabs)/event-request",
      params: { eventData: JSON.stringify(eventData) }
    });
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={handleCancel} style={styles.backButton}>
              <Ionicons name="chevron-back" size={24} color="#333333" />
            </TouchableOpacity>
            <Text style={styles.title}>New Request</Text>
            <View style={styles.placeholder} />
          </View>
          <EventRequestForm onSubmit={handleSubmit} onCancel={handleCancel} />
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
    paddingTop: 20,
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
}); 